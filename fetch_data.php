<?php
header('Content-Type: application/json');

// Connexion à la base de données
$servername = "localhost:3306";
$username = "User_sites";
$password = "Kh$6yt423";
$dbname = "Sites";

$conn = new mysqli($servername, $username, $password, $dbname);

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
