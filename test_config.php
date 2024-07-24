<?php
include 'config.php';

if ($pdo) {
    echo "Connexion réussie.";
} else {
    echo "Échec de la connexion.";
}
?>
