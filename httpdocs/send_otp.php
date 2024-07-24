<?php
session_start();

// Configuration pour envoyer des emails via SMTP
require 'vendor/autoload.php'; // Assurez-vous que PHPMailer est installé et configuré

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

    // Vérifiez que l'email est valide
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['error' => 'Email invalide']);
        exit;
    }

    // Générer un OTP aléatoire
    $otp = rand(100000, 999999);
    $_SESSION['otp'] = $otp;
    $_SESSION['otp_expiry'] = time() + 300; // Valable pour 5 minutes

    $mail = new PHPMailer(true);

    try {
        // Configurer les paramètres du serveur SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Remplacez par le serveur SMTP de votre fournisseur
        $mail->SMTPAuth = true;
        $mail->Username = 'joffrey.dornon@gmail.com'; // Votre adresse email
        $mail->Password = '2022Erorua!'; // Votre mot de passe d'email
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587; // Port SMTP

        // Destinataire et expéditeur
        $mail->setFrom('noreply@lagratuitheque.fr', 'Joffrey - De la gratuithèque');
        $mail->addAddress($email);

        // Contenu de l'email
        $mail->isHTML(true);
        $mail->Subject = 'Votre code OTP';
        $mail->Body    = "Votre code OTP est : <strong>$otp</strong>";

        $mail->send();
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        echo json_encode(['error' => "Erreur d'envoi d'email: {$mail->ErrorInfo}"]);
    }
}
?>
