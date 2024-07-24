<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['html-file'])) {
    $uploadDirectory = 'uploads/';
    $uploadedFile = $uploadDirectory . basename($_FILES['html-file']['name']);

    // Assurez-vous que le répertoire de téléchargement existe
    if (!is_dir($uploadDirectory)) {
        mkdir($uploadDirectory, 0755, true);
    }

    if (move_uploaded_file($_FILES['html-file']['tmp_name'], $uploadedFile)) {
        // Répondre avec l'URL du fichier
        echo json_encode(['url' => $uploadedFile]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Échec du téléchargement du fichier.']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Requête invalide.']);
}
?>
