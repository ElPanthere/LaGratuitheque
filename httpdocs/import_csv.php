<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifiez si le fichier CSV est présent et sans erreur
    if (isset($_FILES['csv-file']) && $_FILES['csv-file']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['csv-file']['tmp_name'];
        $fileName = $_FILES['csv-file']['name'];
        $fileSize = $_FILES['csv-file']['size'];
        $fileType = $_FILES['csv-file']['type'];
        $fileNameCmps = explode('.', $fileName);
        $fileExtension = strtolower(end($fileNameCmps));

        // Vérifiez que le fichier est bien un CSV
        if ($fileExtension === 'csv') {
            if (($handle = fopen($fileTmpPath, 'r')) !== false) {
                // Ignore l'entête du fichier CSV
                fgetcsv($handle);

                // Préparez la requête SQL pour l'insertion
                $stmt = $pdo->prepare('INSERT INTO site (categorie, lien, titre, texte, sous_cat, guide) VALUES (?, ?, ?, ?, ?, ?)');

                $rowCount = 0;
                while (($data = fgetcsv($handle)) !== false) {
                    // Assurez-vous que chaque ligne a 5 colonnes
                    if (count($data) === 6) {
                        $stmt->execute($data);
                        $rowCount++;
                    }
                }

                fclose($handle);
                echo "Succès : $rowCount ligne(s) ajoutée(s).";
            } else {
                echo 'Erreur : Impossible de lire le fichier.';
            }
        } else {
            echo 'Erreur : Le fichier téléchargé n\'est pas un fichier CSV.';
        }
    } else {
        echo 'Erreur : Le fichier CSV n\'a pas été téléchargé correctement.';
    }
} else {
    echo 'Erreur : Mauvaise méthode de requête.';
}
