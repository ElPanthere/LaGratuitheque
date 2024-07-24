<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $otp = filter_var($_POST['otp'], FILTER_SANITIZE_NUMBER_INT);

    if (isset($_SESSION['otp']) && $_SESSION['otp'] == $otp) {
        if (time() <= $_SESSION['otp_expiry']) {
            echo json_encode(['success' => true]);
            // Ici, vous pouvez définir une session ou un cookie pour indiquer que l'utilisateur est connecté
        } else {
            echo json_encode(['error' => 'Code expiré']);
        }
    } else {
        echo json_encode(['error' => 'Code incorrect']);
    }

    // Nettoyer les données de la session
    unset($_SESSION['otp']);
    unset($_SESSION['otp_expiry']);
}
?>
