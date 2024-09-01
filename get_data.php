<?php
// get_data.php

header('Content-Type: application/json');

// Connexion à la base de données
$servername = "localhost"; // Remplacez par votre serveur de base de données
$username = "User_sites";        // Remplacez par votre nom d'utilisateur
$password = "Kh$6yt423";            // Remplacez par votre mot de passe
$dbname = "Sites"; // Remplacez par le nom de votre base de données

// Créer une connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("La connexion a échoué: " . $conn->connect_error);
}

// Requête pour obtenir les données
$query = "SELECT id, categorie, lien, titre, texte, sous_cat, guide FROM site";
$result = $conn->query($query);

$entries = [];
while ($row = $result->fetch_assoc()) {
    $entries[] = $row;
}

// Retourner les données au format JSON
echo json_encode($entries);

// Fermer la connexion
$conn->close();
?>
