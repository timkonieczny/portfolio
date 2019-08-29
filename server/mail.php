<?php
include 'credentials.php';

$to = $email;
$subject = 'test';
$message = 'test';
$from = 'test@timkonieczny.com';

// TODO: Email header injection prevention
// TODO: Honeypot fields

if (mail($to, $subject, $message, "From: foo@example.com")) {
    echo 'Your mail has been sent successfully.';
} else {
    echo 'Unable to send email. Please try again.';
}