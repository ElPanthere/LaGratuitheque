<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test de Connexion SQL</title>
  <link rel="stylesheet" href="CSS/source.css">
</head>
<body class="night-mode">
  <header>
    <input type="text" id="search-bar" placeholder="Rechercher...">
    <button id="night-mode-toggle">Mode Jour</button>
  </header>
  <div class="container">
    <main class="main-panel" id="main-panel">
      <!-- Formulaire de test de connexion SQL -->
      <div class="sql-test">
        <h2>Test de Connexion SQL</h2>
        <form method="POST" action="">
          <label for="db_host">Hôte :</label>
          <input type="text" id="db_host" name="db_host" required>
          <label for="db_user">Utilisateur :</label>
          <input type="text" id="db_user" name="db_user" required>
          <label for="db_password">Mot de passe :</label>
          <input type="password" id="db_password" name="db_password" required>
          <label for="db_name">Nom de la base :</label>
          <input type="text" id="db_name" name="db_name" required>
          <button type="submit" name="test_connexion">Tester la connexion</button>
        </form>
        <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['test_connexion'])) {
          $db_host = $_POST['db_host'];
          $db_user = $_POST['db_user'];
          $db_password = $_POST['db_password'];
          $db_name = $_POST['db_name'];

          // Connexion à la base de données
          $conn = new mysqli($db_host, $db_user, $db_password, $db_name);

          // Vérifiez la connexion
          if ($conn->connect_error) {
            echo "<p style='color: red;'>La connexion a échoué : " . $conn->connect_error . "</p>";
          } else {
            echo "<p style='color: green;'>La connexion a réussi</p>";
          }

          $conn->close();
        }
        ?>
      </div>
    </main>
    <aside class="right-panel">
      <h2>Navigation</h2>
      <ul>
        <li><a href="index.html">Retour à l'accueil</a></li>
      </ul>
    </aside>
  </div>
  <footer id="footer">
    <p>&copy; 2024 Répertoire de Sites Gratuits</p>
  </footer>
  <script src="./Javascript/source.js"></script>
</body>
</html>
