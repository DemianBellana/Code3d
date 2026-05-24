<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'php/Env.php';

// Cargar variables de entorno
Env::load(__DIR__ . '/.env');

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener datos JSON
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!$data) {
        echo json_encode(['success' => false, 'message' => 'Datos inválidos.']);
        exit;
    }

    // Sanitización y Validación
    $nombre = filter_var(trim($data['nombre'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);
    $email = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $mensaje = filter_var(trim($data['mensaje'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);

    if (empty($nombre) || empty($email) || empty($mensaje)) {
        echo json_encode(['success' => false, 'message' => 'Por favor, completa todos los campos obligatorios.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Formato de email no válido.']);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Configuración SMTP desde .env
        $mail->isSMTP();
        $mail->Host       = Env::get('SMTP_HOST');
        $mail->SMTPAuth   = (bool)Env::get('SMTP_AUTH', true);
        $mail->Username   = Env::get('SMTP_USER');
        $mail->Password   = Env::get('SMTP_PASS');
        $mail->SMTPSecure = Env::get('SMTP_SECURE') === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = (int)Env::get('SMTP_PORT', 587);
        $mail->CharSet    = 'UTF-8';

        // Destinatarios
        $mail->setFrom(Env::get('SMTP_FROM_EMAIL'), Env::get('SMTP_FROM_NAME'));
        $mail->addAddress(Env::get('SMTP_RECIPIENT'));
        $mail->addReplyTo($email, $nombre);

        // Contenido
        $mail->isHTML(true);
        $mail->Subject = 'Nuevo mensaje de contacto: ' . $nombre;
        $mail->Body    = "
            <h2>Nuevo mensaje desde la web</h2>
            <p><strong>Nombre:</strong> " . htmlspecialchars($nombre) . "</p>
            <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
            <p><strong>Mensaje:</strong><br>" . nl2br(htmlspecialchars($mensaje)) . "</p>
        ";

        $mail->send();
        echo json_encode(['success' => true, 'message' => '¡Mensaje enviado con éxito!']);
    } catch (Exception $e) {
        // Ocultar error detallado en producción, registrar log si fuera necesario
        echo json_encode(['success' => false, 'message' => 'El mensaje no pudo ser enviado. Por favor, inténtelo más tarde.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
