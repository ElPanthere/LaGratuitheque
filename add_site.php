<?php
// Connection à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "votre_base_de_donnees";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifiez la connexion
if ($conn->connect_error) {
    die("La connexion a échoué : " . $conn->connect_error);
}

// Préparez et liez
$stmt = $conn->prepare("INSERT INTO Sites (categorie, lien, titre, texte) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $categorie, $lien, $titre, $texte);

// Récupérez les données du formulaire
$categorie = $_POST['categorie'];
$lien = $_POST['lien'];
$titre = $_POST['titre'];
$texte = $_POST['texte'];

// Exécutez la requête
if ($stmt->execute()) {
    echo "Site ajouté avec succès.";
} else {
    echo "Erreur : " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
