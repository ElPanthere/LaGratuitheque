<?php
// Activer les erreurs pour le débogage
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

$directory = 'uploads/';
$files = [];

if (is_dir($directory)) {
    $files = array_diff(scandir($directory), array('..', '.'));
    echo json_encode(array_values($files)); // Assurez-vous que le JSON est bien formaté
} else {
    echo json_encode(['error' => 'Le répertoire spécifié n\'existe pas ou ne peut pas être ouvert.']);
}
?>
