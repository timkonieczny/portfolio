<?php
include 'credentials.php';

$to = $email;
$subject = $_POST["subject"];
$body = $_POST["message"];
$email = $_POST["email"];
$name = $_POST["name"];
// TODO: Honeypot fields

// sanitize email
$email = str_replace(array("\r", "\n"), '', $email);
$email = filter_var($email, FILTER_VALIDATE_EMAIL);

if ($email) {

    // sanitize name
    $name = str_replace(array("\r", "\n"), '', $name);

    // sanitize subject
    $subject = str_ireplace(array("\r", "\n", '%0A', '%0D'), '', $subject);

    // sanitize body
    $body = str_replace("\n.", "\n..", $body);

    if (mail($to, $subject, $body, "From: $name <$email>")) {
        echo "true";
    } else {
        echo "false";
    }
} else {
    echo "false";
}
