<?php
header('Content-Type: application/json');

include 'config.php';

$conn = new mysqli($host, $user, $pass, $db);

// Vérifier la connexion
if ($conn->connect_error) {
  die("Connexion échouée: " . $conn->connect_error);
}

// Requête SQL pour récupérer les données
$sql = "SELECT * FROM site"; // Remplacez 'your_table' par le nom de votre table
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
  // Récupérer les données de chaque ligne
  while($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
}

$conn->close();

// Retourner les données au format JSON
echo json_encode($data);
?>
