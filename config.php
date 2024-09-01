<?php
// config.php
$host = "localhost:3306";
$user = "User_sites"; // Remplacez par votre nom d'utilisateur MySQL
$pass = "Kh$6yt423"; // Remplacez par votre mot de passe MySQL
$db = "Sites"; // Remplacez par le nom de votre base de données

try {
    // Création d'une nouvelle instance PDO pour la connexion à la base de données
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    // Configuration des attributs pour gérer les erreurs
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Affichage d'une erreur en cas de problème de connexion
    echo 'Connexion échouée : ' . $e->getMessage();
    exit;
}
?>
