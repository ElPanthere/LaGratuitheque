<?php
require 'config.php';

// Vérifiez que la méthode de la requête est POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifiez que les identifiants sont fournis et non vides
    if (isset($_POST['ids']) && !empty($_POST['ids'])) {
        // Affichez les données reçues pour débogage
        file_put_contents('debug.txt', print_r($_POST['ids'], true));

        // Récupérez les identifiants envoyés via POST
        $ids = json_decode($_POST['ids']);

        // Assurez-vous que $ids est un tableau
        if (is_array($ids)) {
            // Préparez une requête SQL pour supprimer les entrées
            $placeholders = implode(',', array_fill(0, count($ids), '?'));
            $sql = "DELETE FROM site WHERE id IN ($placeholders)";
            $stmt = $pdo->prepare($sql);

            // Exécutez la requête avec les identifiants
            if ($stmt->execute($ids)) {
                echo 'Succès : Les entrées ont été supprimées.';
            } else {
                echo 'Erreur : Impossible de supprimer les entrées.';
            }
        } else {
            echo 'Erreur : Les identifiants ne sont pas valides.';
        }
    } else {
        echo 'Erreur : Aucun identifiant fourni.';
    }
} else {
    echo 'Erreur : Mauvaise méthode de requête.';
}
