document.addEventListener('DOMContentLoaded', function() {
  const accessLibraryButton = document.getElementById('access-library');
  const homepage = document.getElementById('homepage');
  const mainContent = document.getElementById('main-content');

  accessLibraryButton.addEventListener('click', function() {
    homepage.style.display = 'none'; // Masquer la page d'accueil
    mainContent.style.display = 'flex'; // Afficher le contenu principal
  });
});


// Fonction pour afficher le message pour la catégorie Jeux
function showCategory(category) {
  // Masquer tous les messages au départ
  document.getElementById('jeux-message').style.display = 'none';
  
  // Vérifier si la catégorie sélectionnée est "Jeux"
  if (category === 'play') {
    document.getElementById('jeux-message').style.display = 'block';
  }

  // Afficher le contenu de la catégorie sélectionnée (vous pouvez adapter cela à votre logique existante)
  document.querySelectorAll('.category-section').forEach(function(section) {
    section.style.display = 'none'; // Masquer toutes les sections
  });

  const selectedSection = document.getElementById(category);
  if (selectedSection) {
    selectedSection.style.display = 'block'; // Afficher la section sélectionnée
  }
}
