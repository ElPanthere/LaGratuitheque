document.addEventListener('DOMContentLoaded', function() {
  const accessLibraryButton = document.getElementById('access-library');
  const homepage = document.getElementById('homepage');
  const mainContent = document.getElementById('main-content');

  accessLibraryButton.addEventListener('click', function() {
    homepage.style.display = 'none'; // Masquer la page d'accueil
    mainContent.style.display = 'flex'; // Afficher le contenu principal
  });
});
