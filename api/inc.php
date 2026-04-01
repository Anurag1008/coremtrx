<?php
declare(strict_types=1);

/**
 * Log and return JSON for DB failures. Set APP_DEBUG true in config.php only on localhost.
 */
function json_exit_db_error(Throwable $e, string $context): void
{
    $msg = $e->getMessage();
    error_log($context . ': ' . $msg);
    http_response_code(500);

    $hint = 'Fix the issue shown in `detail` below.';
    if (str_contains($msg, "doesn't exist") || str_contains($msg, 'Base table') || str_contains($msg, '1146')) {
        $hint = 'Table missing: open phpMyAdmin → select your database → SQL tab → paste and run the full contents of api/schema.sql.';
    } elseif (str_contains($msg, '2002') || str_contains($msg, 'Connection refused') || str_contains($msg, 'timed out')) {
        $hint = 'Cannot reach MySQL: check DB_HOST. On your PC, localhost is not Hostinger — use hPanel MySQL hostname + Remote MySQL for your IP, or use local MariaDB.';
    } elseif (str_contains($msg, '1045') || str_contains($msg, 'Access denied')) {
        $hint = 'Wrong DB_USER / DB_PASS, or user not allowed from this host.';
    } elseif (str_contains($msg, '1049') || str_contains($msg, 'Unknown database')) {
        $hint = 'Wrong DB_NAME — must match hPanel exactly.';
    }

    echo json_encode([
        'ok' => false,
        'message' => 'Database error',
        'detail' => $msg,
        'hint' => $hint,
    ]);
    exit;
}
