<?php
session_start();
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = $_POST['password'] ?? '';

    $now = new DateTime();
    $expectedPassword = $now->format('H') . $now->format('i') . $now->format('d') . $now->format('m');

    if ($password === $expectedPassword) {
        $_SESSION['authenticated'] = true;
        $_SESSION['last_activity'] = time();
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Mot de passe incorrect.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Requête invalide.']);
}
?>
