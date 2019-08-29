<?php
include 'credentials.php';

$to = $email;
$subject = 'test';
$body = 'test';
$from = 'test@timkonieczny.com';

// sanitize email
$from = str_replace(array("\r", "\n"), '', $from);
$from = filter_var($from, FILTER_VALIDATE_EMAIL);

// sanitize subject
$subject = str_ireplace(array("\r", "\n", '%0A', '%0D'), '', $subject);

// sanitize body
$body = str_replace("\n.", "\n..", $body);

// TODO: Honeypot fields

if ($from) {
    if (mail($to, $subject, $body, "From: $from")) {
        echo 'Your mail has been sent successfully.';
    } else {
        echo false;
    }
}else{
    echo false;
}