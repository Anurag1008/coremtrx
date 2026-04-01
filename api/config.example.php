<?php
// Copy to config.php and fill values (do NOT commit config.php).

declare(strict_types=1);

define('DB_HOST', 'localhost');
define('DB_NAME', 'your_database_name');
define('DB_USER', 'your_database_user');
define('DB_PASS', 'your_database_password');

// Set true only on your machine while debugging; never on production.
define('APP_DEBUG', false);

// Razorpay credentials (Dashboard -> Settings -> API Keys)
define('RZP_KEY_ID', 'rzp_test_xxxxxxxxxxxxxx');
define('RZP_KEY_SECRET', 'xxxxxxxxxxxxxxxxxxxxxx');
