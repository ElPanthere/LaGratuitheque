<?php
// Inclure la configuration de la base de données
include 'config.php';

// Vérifiez si l'ID de l'entrée a été fourni
if (isset($_POST['id'])) {
    $id = intval($_POST['id']); // Assurez-vous que l'ID est un entier

    try {
        // Préparer la requête de suppression
        $stmt = $pdo->prepare('DELETE FROM site WHERE id = :id');
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        // Exécuter la requête
        $stmt->execute();

        // Retourner une réponse JSON
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        // Retourner une réponse JSON en cas d'erreur
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    // Retourner une réponse JSON si l'ID n'est pas fourni
    echo json_encode(['success' => false, 'error' => 'ID manquant']);
}
?>
