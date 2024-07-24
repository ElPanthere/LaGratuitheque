<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

$servername = "localhost:3306";
$username = "User_sites";
$password = "Kh$6yt423";
$dbname = "Sites"; // Changez le nom de la base de données ici
// Connexion à la base de données
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifiez la connexion
if ($conn->connect_error) {
    echo json_encode(["error" => "La connexion a échoué : " . $conn->connect_error]);
    exit();
}

// Récupération de la catégorie
$categorie = isset($_GET['categorie']) ? $_GET['categorie'] : '';
$categorie = $conn->real_escape_string($categorie);

// Requête SQL
$sql = "SELECT sous_cat, lien, titre, texte, guide FROM site WHERE categorie = '$categorie'";
$result = $conn->query($sql);

$data = [];

if ($result === false) {
    echo json_encode(["error" => "Erreur dans la requête : " . $conn->error]);
    $conn->close();
    exit();
}

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    $data[] = ["message" => "Aucun résultat trouvé pour cette catégorie."];
}

echo json_encode($data);

$conn->close();
?>