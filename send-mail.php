<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON data
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $nombre = strip_tags(trim($data['nombre']));
    $email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
    $mensaje = strip_tags(trim($data['mensaje']));

    if (empty($nombre) || empty($email) || empty($mensaje)) {
        echo json_encode(['status' => 'error', 'message' => 'Por favor, completa todos los campos.']);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // SMTP Settings (using your Gmail credentials)
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'codenofrontier@gmail.com';
        $mail->Password   = 'anxmwytlzxwajrub';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        $mail->CharSet    = 'UTF-8';

        // Recipients
        $mail->setFrom('codenofrontier@gmail.com', 'CodeNoFrontier Contacto');
        $mail->addAddress('codenofrontier@gmail.com');
        $mail->addReplyTo($email, $nombre);

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Nuevo mensaje de contacto: ' . $nombre;
        $mail->Body    = "
            <h2>Nuevo mensaje desde la web</h2>
            <p><strong>Nombre:</strong> {$nombre}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Mensaje:</strong><br>{$mensaje}</p>
        ";

        $mail->send();
        echo json_encode(['status' => 'success', 'message' => '¡Mensaje enviado con éxito!']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => "El mensaje no pudo ser enviado. Mailer Error: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
}
