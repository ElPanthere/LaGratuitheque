<?php
$to = 'joffrey.dornon@gmail.com'; // Remplacez par votre adresse email
$subject = 'Test de Fonctionnement du Serveur de Mail';
$message = 'Ce message est un test pour vérifier l\'envoi d\'email.';
$headers = 'From: joffrey.dornon@gmail.com' . phpversion();

if (mail($to, $subject, $message, $headers)) {
    echo 'Email envoyé avec succès.';
} else {
    echo 'Échec de l\'envoi de l\'email.';
}
?>