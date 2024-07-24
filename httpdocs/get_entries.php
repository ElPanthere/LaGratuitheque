<?php
// get_entries.php

header('Content-Type: application/json');

// Connexion à la base de données
require 'config.php';

// Requête pour obtenir les données
$query = "SELECT id, categorie, lien, titre, texte, sous_cat, guide FROM site";
$result = $conn->query($query);

$entries = [];
while ($row = $result->fetch_assoc()) {
    $entries[] = $row;
}

echo json_encode($entries);

$conn->close();
?>
