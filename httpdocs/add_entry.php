<?php
require 'config.php'; // Inclut la configuration de la base de données

// Vérifiez que la méthode de la requête est POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifiez que les données nécessaires sont fournies
    if (isset($_POST['categorie']) && isset($_POST['lien']) && isset($_POST['titre']) && isset($_POST['texte']) && isset($_POST['sous_cat']) && isset($_POST['guide'])) {
        
        // Récupérez les données envoyées via POST
		$id = $_POST['id'];
        $categorie = $_POST['categorie'];
        $lien = $_POST['lien'];
        $titre = $_POST['titre'];
        $texte = $_POST['texte'];
        $sous_cat = $_POST['sous_cat'];
        $guide = $_POST['guide'];
        
        // Préparez une requête SQL pour insérer une nouvelle entrée
        $sql = "UPDATE site SET categorie = :categorie, lien = :lien, titre = :titre, texte = :texte, sous_cat = :sous_cat, guide = :guide WHERE id = :id";
        $stmt = $pdo->prepare($sql);

        // Exécutez la requête avec les données fournies
        try {
            $stmt->execute([
				'id' => $id,
                ':categorie' => $categorie,
                ':lien' => $lien,
                ':titre' => $titre,
                ':texte' => $texte,
                ':sous_cat' => $sous_cat,
                ':guide' => $guide
            ]);
            echo 'Succès : Entrée modifié.';
        } catch (PDOException $e) {
            echo 'Erreur : ' . $e->getMessage();
        }
    } else {
        echo 'Erreur : Données incomplètes.';
    }
} else {
    echo 'Erreur : Mauvaise méthode de requête.';
}
