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
$razorpayPaymentId = trim((string)($data['razorpay_payment_id'] ?? ''));
$razorpayOrderId = trim((string)($data['razorpay_order_id'] ?? ''));
$razorpaySignature = trim((string)($data['razorpay_signature'] ?? ''));

if ($leadId <= 0 || $razorpayPaymentId === '' || $razorpayOrderId === '' || $razorpaySignature === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'message' => 'Missing required fields']);
  exit;
}

$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'message' => 'Server not configured (missing config.php)']);
  exit;
}
require $configPath;
require __DIR__ . '/inc.php';

// Verify signature: HMAC_SHA256(order_id|payment_id, key_secret)
$payload = $razorpayOrderId . '|' . $razorpayPaymentId;
$expected = hash_hmac('sha256', $payload, RZP_KEY_SECRET);
if (!hash_equals($expected, $razorpaySignature)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'message' => 'Signature verification failed']);
  exit;
}

try {
  $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
  $pdo = new PDO($dsn, DB_USER, DB_PASS, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ]);

  $stmt = $pdo->prepare(
    'UPDATE leads
     SET payment_status = :status,
         razorpay_order_id = :oid,
         razorpay_payment_id = :pid,
         razorpay_signature = :sig,
         paid_at = CURRENT_TIMESTAMP
     WHERE id = :id'
  );
  $stmt->execute([
    ':status' => 'paid',
    ':oid' => $razorpayOrderId,
    ':pid' => $razorpayPaymentId,
    ':sig' => $razorpaySignature,
    ':id' => $leadId,
  ]);

  echo json_encode(['ok' => true, 'message' => 'Payment verified']);
} catch (Throwable $e) {
  json_exit_db_error($e, 'razorpay_verify.php');
}

