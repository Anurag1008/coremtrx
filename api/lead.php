<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'message' => 'Method not allowed']);
  exit;
}

// Expect JSON body
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'message' => 'Invalid JSON']);
  exit;
}

$courseId = trim((string)($data['courseId'] ?? ''));
$courseTitle = trim((string)($data['courseTitle'] ?? ''));
$priceId = trim((string)($data['priceId'] ?? ''));
$amountInINR = $data['amountInINR'] ?? null;
$name = trim((string)($data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$phone = trim((string)($data['phone'] ?? ''));

if ($courseId === '' || $courseTitle === '' || $name === '' || $email === '' || $phone === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'message' => 'Missing required fields']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'message' => 'Invalid email']);
  exit;
}

// Basic phone normalization: keep digits, +, and spaces
$phoneClean = preg_replace('/[^0-9+ ]+/', '', $phone);
if ($phoneClean === null || strlen(str_replace(' ', '', $phoneClean)) < 8) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'message' => 'Invalid phone']);
  exit;
}

if ($amountInINR !== null && !is_int($amountInINR) && !ctype_digit((string)$amountInINR)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'message' => 'Invalid amount']);
  exit;
}

$amount = $amountInINR === null ? null : (int)$amountInINR;
$ip = $_SERVER['REMOTE_ADDR'] ?? null;
$ua = $_SERVER['HTTP_USER_AGENT'] ?? null;

// Load DB config (create api/config.php from config.example.php)
$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'message' => 'Server not configured (missing config.php)']);
  exit;
}
require $configPath;
require __DIR__ . '/inc.php';

try {
  $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
  $pdo = new PDO($dsn, DB_USER, DB_PASS, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ]);

  // Enforce unique email (pre-check for clearer error)
  $check = $pdo->prepare('SELECT id FROM leads WHERE email = :email LIMIT 1');
  $check->execute([
    ':email' => $email,
  ]);
  $existing = $check->fetch();
  if ($existing) {
    http_response_code(409);
    echo json_encode(['ok' => false, 'message' => 'Email is already registered']);
    exit;
  }

  $stmt = $pdo->prepare(
    'INSERT INTO leads (course_id, course_title, price_id, amount_in_inr, name, email, phone, ip, user_agent)
     VALUES (:course_id, :course_title, :price_id, :amount_in_inr, :name, :email, :phone, :ip, :user_agent)'
  );
  $stmt->execute([
    ':course_id' => $courseId,
    ':course_title' => $courseTitle,
    ':price_id' => $priceId !== '' ? $priceId : null,
    ':amount_in_inr' => $amount,
    ':name' => $name,
    ':email' => $email,
    ':phone' => $phoneClean,
    ':ip' => $ip,
    ':user_agent' => $ua,
  ]);

  $leadId = (int)$pdo->lastInsertId();
  echo json_encode(['ok' => true, 'message' => 'Details saved. Continue to payment.', 'leadId' => $leadId]);
} catch (PDOException $e) {
  // In case DB has a unique constraint (uq_email) and we hit it, return a friendly message.
  if (($e->getCode() ?? '') === '23000') {
    http_response_code(409);
    echo json_encode(['ok' => false, 'message' => 'Email is already registered']);
    exit;
  }
  json_exit_db_error($e, 'lead.php');
} catch (Throwable $e) {
  json_exit_db_error($e, 'lead.php');
}

