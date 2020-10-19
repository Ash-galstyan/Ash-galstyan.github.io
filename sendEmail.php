<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = 'ash.galstyan@gmail.com';
    $subject = 'Portfolio message';
    $body = '';
    $body .= 'From: '.$name. '\r\n';
    $body .= 'Email: '.$email. '\r\n';
    $body .= 'Message: '.$message. '\r\n';

    mail($to, $subject, $body);
?>
