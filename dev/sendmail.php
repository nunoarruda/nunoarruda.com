<?php

// this file includes the email password, like so
/* <?php $pass = 'xxx'; ?> */
require 'mail_pass.php';

if (!empty($_POST)) {
    //SMTP needs accurate times, and the PHP time zone MUST be set
    //This should be done in your php.ini, but this is how to do it if you don't have access to that
    date_default_timezone_set('Atlantic/Azores');

    require 'PHPMailer/PHPMailerAutoload.php';

    //Create a new PHPMailer instance
    $mail = new PHPMailer();

    //Tell PHPMailer to use SMTP
    $mail->isSMTP();

    //Enable SMTP debugging
    // 0 = off (for production use)
    // 1 = client messages
    // 2 = client and server messages
    $mail->SMTPDebug = 2;

    //Ask for HTML-friendly debug output
    $mail->Debugoutput = 'html';

    //Set the hostname of the mail server
    $mail->Host = 'smtp.gmail.com';

    //Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
    $mail->Port = 587;

    //Set the encryption system to use - ssl (deprecated) or tls
    $mail->SMTPSecure = 'tls';

    //Whether to use SMTP authentication
    $mail->SMTPAuth = true;

    //Username to use for SMTP authentication - use full email address for gmail
    $mail->Username = "noreply@nunoarruda.com";

    //Password to use for SMTP authentication
    $mail->Password = $pass;

    //Set who the message is to be sent from
    $mail->FromName = 'Nuno Mailer';

    //Set an alternative reply-to address
    $mail->addReplyTo($_POST['email'], $_POST['name']);

    //Set who the message is to be sent to
    $mail->addAddress('nuno@nunoarruda.com', 'Nuno Arruda');

    //Set the encoding
    $mail->CharSet = 'UTF-8';

    //Set the subject line
    $mail->Subject = '[via nunoarruda.com] '.$_POST['subject'];

    //Set the message
    $mail->Body = $_POST['message'];

    //send the message, check for errors
    if (!$mail->send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
        echo "Message sent!";
    }
}
?>
