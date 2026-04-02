<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'message' => 'Method not allowed']);
  exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'message' => 'Invalid JSON']);
  exit;
}

$leadId = (int)($data['leadId'] ?? 0);
$courseId = trim((string)($data['courseId'] ?? ''));

if ($leadId <= 0 || $courseId === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'message' => 'Missing leadId/courseId']);
  exit;
}

// Server-side pricing guard (prevents client tampering)
$COURSE_PRICING = [
  'core-access' => ['amount_inr' => 2999, 'name' => 'Core Access'],
  'systems-intern' => ['name' => 'Systems Intern Program'],
];

if (!isset($COURSE_PRICING[$courseId])) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'message' => 'Unknown course']);
  exit;
}

if ($courseId === 'systems-intern') {
  $amountINR = 4999;
} else {
  $amountINR = (int)$COURSE_PRICING[$courseId]['amount_inr'];
}
$amountPaise = $amountINR * 100;
$receipt = 'lead_' . $leadId . '_' . $courseId;

$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'message' => 'Server not configured (missing config.php)']);
  exit;
}
require $configPath;

// Create Razorpay order via REST API (no SDK needed)
$payload = json_encode([
  'amount' => $amountPaise,
  'currency' => 'INR',
  'receipt' => $receipt,
  'payment_capture' => 1,
  'notes' => [
    'lead_id' => (string)$leadId,
    'course_id' => $courseId,
  ],
]);

$ch = curl_init('https://api.razorpay.com/v1/orders');
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
  CURLOPT_POSTFIELDS => $payload,
  CURLOPT_USERPWD => RZP_KEY_ID . ':' . RZP_KEY_SECRET,
  CURLOPT_TIMEOUT => 15,
]);

$resp = curl_exec($ch);
$httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr = curl_error($ch);
curl_close($ch);

if ($resp === false) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'message' => 'Razorpay connection failed', 'detail' => $curlErr]);
  exit;
}

$order = json_decode($resp, true);
if ($httpCode < 200 || $httpCode >= 300 || !is_array($order) || empty($order['id'])) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'message' => 'Failed to create order']);
  exit;
}

// Save order id on lead
try {
  $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
  $pdo = new PDO($dsn, DB_USER, DB_PASS, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ]);

  $stmt = $pdo->prepare(
    'UPDATE leads SET razorpay_order_id = :oid, payment_status = :status WHERE id = :id'
  );
  $stmt->execute([
    ':oid' => (string)$order['id'],
    ':status' => 'order_created',
    ':id' => $leadId,
  ]);
} catch (Throwable $e) {
  error_log('razorpay_order.php UPDATE leads: ' . $e->getMessage());
}

echo json_encode([
  'ok' => true,
  'keyId' => RZP_KEY_ID,
  'orderId' => (string)$order['id'],
  'amountPaise' => (int)$order['amount'],
  'currency' => (string)$order['currency'],
  'courseName' => $COURSE_PRICING[$courseId]['name'],
]);

