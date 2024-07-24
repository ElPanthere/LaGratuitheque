<?php
// login.php
session_start();
header('Content-Type: application/json');

// Vérifiez si une session est active
if (isset($_SESSION['valid'])) {
    echo json_encode(['status' => 'success']);
    exit();
}

$now = new DateTime();
$currentPassword = $now->format('Hi') . $now->format('d') . $now->format('m');

$data = json_decode(file_get_contents('php://input'), true);
$password = $data['password'] ?? '';

if ($password === $currentPassword) {
    $_SESSION['valid'] = true;
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Mot de passe incorrect.']);
}
