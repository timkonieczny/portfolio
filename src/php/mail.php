<?php
include 'credentials.php';

$to = $email;
$subject = $_POST["subject"];
$body = $_POST["message"];
$email = $_POST["emailaddress"];
$name = $_POST["name"];

// Check honeypot fields
$isSpam = !empty($_POST["phone"]) || !empty($_POST["website"]) || !empty($_POST["email"]);
if($isSpam){
    http_response_code(400);
    die();
}

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

    if (@mail($to, $subject, $body, "From: $name <$email>")) {
        http_response_code (200); 
    } else {
        http_response_code (500);
    }
} else {
    http_response_code (400); 
}
