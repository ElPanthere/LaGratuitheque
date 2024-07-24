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
$stmt = $conn->prepare("DELETE FROM Sites WHERE id = ?");
$stmt->bind_param("i", $id);

// Récupérez les données du formulaire
$id = $_POST['id'];

// Exécutez la requête
if ($stmt->execute()) {
    echo "Site supprimé avec succès.";
} else {
    echo "Erreur : " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
