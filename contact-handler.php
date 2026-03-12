<?php
// contact-handler.php
// Simple server-side handler: validates honeypot and timestamp anti-spam checks,
// sanitizes input and attempts to send an email. Returns JSON responses.

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Only POST allowed']);
    exit;
}

// Honeypot fields to check (bots often fill them)
$honeypot_names = ['middle_name', 'website', 'company', 'address'];
foreach ($honeypot_names as $hp) {
    if (!empty($_POST[$hp])) {
        http_response_code(403);
        echo json_encode(['ok' => false, 'message' => 'Spam detected']);
        exit;
    }
}

// Timestamp validation (milliseconds since epoch)
$timestamp = isset($_POST['form_timestamp']) ? preg_replace('/[^0-9]/', '', $_POST['form_timestamp']) : '';
if ($timestamp === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Missing timestamp']);
    exit;
}

$ts = (int) $timestamp;
$now = (int) round(microtime(true) * 1000);
$delta = $now - $ts;

if ($delta < 3000) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Form submitted too quickly']);
    exit;
}

// Minimal sanitization for expected fields
$get = function($key) {
    return isset($_POST[$key]) ? trim(strip_tags($_POST[$key])) : '';
};

$name = $get('name');
$contact = $get('contact');
$location = $get('location');
$service = $get('service');
$area = $get('area');
$message = $get('message');

// Basic required validation
if ($name === '' || $contact === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'message' => 'Name and contact are required']);
    exit;
}

// Build email
$to = 'info@sanacesf.cz';
$subject = 'Nová poptávka z webu — ' . ($service ?: 'Obecná poptávka');

$body = "Nová poptávka z webu\n\n";
$body .= "Jméno: $name\n";
$body .= "Kontakt: $contact\n";
if ($location !== '') $body .= "Lokalita: $location\n";
if ($area !== '') $body .= "Plocha (m2): $area\n";
if ($service !== '') $body .= "Služba: $service\n";
$body .= "Zpráva:\n$message\n\n";
$body .= "Odesláno: " . date('c') . "\n";

$headers = [];
$headers[] = 'From: no-reply@' . ($_SERVER['HTTP_HOST'] ?? 'localhost');
if (filter_var($contact, FILTER_VALIDATE_EMAIL)) {
    $headers[] = 'Reply-To: ' . $contact;
}
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

$headers_str = implode("\r\n", $headers);

$mail_sent = false;
try {
    // Use mail(); on many local dev setups this may not be configured. We'll
    // attempt to send, and if it fails, log the submission to a file for later retrieval.
    $mail_sent = mail($to, $subject, $body, $headers_str);
} catch (Exception $e) {
    $mail_sent = false;
}

if ($mail_sent) {
    echo json_encode(['ok' => true, 'message' => 'Odesláno']);
    exit;
}

// Mail failed — save to a local log as fallback
$log_file = __DIR__ . '/submissions.log';
$entry = "----\n" . date('c') . "\n" . $body . "\n";
file_put_contents($log_file, $entry, FILE_APPEND | LOCK_EX);

echo json_encode(['ok' => true, 'message' => 'Uloženo (mail selhal)']);
exit;

?>
