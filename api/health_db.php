<?php
declare(strict_types=1);

/**
 * GET only — tests MySQL connection + whether `leads` table exists.
 * Open in browser: http://127.0.0.1:8081/health_db.php (with npm run dev:api)
 * Or via Vite: http://localhost:5173/api/health_db.php
 */
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Use GET']);
    exit;
}

$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Missing api/config.php']);
    exit;
}

require $configPath;

try {
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $pdo->query('SELECT 1');

    $st = $pdo->query("SHOW TABLES LIKE 'leads'");
    $hasLeads = $st && $st->rowCount() > 0;

    echo json_encode([
        'ok' => true,
        'mysql' => 'connected',
        'host' => DB_HOST,
        'database' => DB_NAME,
        'leads_table_exists' => $hasLeads,
        'next_step' => $hasLeads
            ? 'DB looks good. Try checkout again.'
            : 'Run api/schema.sql in phpMyAdmin (or mysql CLI) to create table `leads`.',
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    $msg = $e->getMessage();
    $hint =
        'If PHP runs on your PC: DB_HOST=localhost only talks to MySQL on THIS machine — not Hostinger. Either (1) install MariaDB locally and import api/schema.sql, or (2) in hPanel use the MySQL hostname (not localhost), enable Remote MySQL, add your public IP, then put that hostname in DB_HOST.';
    if (str_contains($msg, '2002') || str_contains($msg, 'Connection refused') || str_contains($msg, 'timed out')) {
        $hint .= ' This error often means wrong host/port or firewall (enable Remote MySQL + correct hostname).';
    }
    if (str_contains($msg, '1045') || str_contains($msg, 'Access denied')) {
        $hint = 'Wrong DB_USER or DB_PASS, or user not allowed from this host. Recreate DB user password in hPanel.';
    }
    if (str_contains($msg, '1049') || str_contains($msg, 'Unknown database')) {
        $hint = 'Wrong DB_NAME — copy the exact database name from hPanel → Databases.';
    }
    echo json_encode([
        'ok' => false,
        'mysql' => 'failed',
        'message' => 'Connection failed',
        'detail' => $msg,
        'hint' => $hint,
    ]);
}
