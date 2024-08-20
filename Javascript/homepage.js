document.addEventListener('DOMContentLoaded', function() {
  const accessLibraryButton = document.getElementById('access-library');
  const homepage = document.getElementById('homepage');
  const mainContent = document.getElementById('main-content');

  accessLibraryButton.addEventListener('click', function() {
    homepage.style.display = 'none'; // Masquer la page d'accueil
    mainContent.style.display = 'flex'; // Afficher le contenu principal
  });
});

// Fonction pour afficher le contenu des catégories avec le message pour les "Jeux"
function showCategory(category) {
  const mainPanel = document.getElementById('main-panel');
  
  // Nettoyer le contenu actuel
  mainPanel.innerHTML = '';

  // Générer le contenu pour la catégorie sélectionnée
  if (category === 'play') {
    // Insérer le message en jaune spécifique aux Jeux
    const jeuxMessage = document.createElement('div');
    jeuxMessage.style.backgroundColor = 'yellow';
    jeuxMessage.style.color = 'black';
    jeuxMessage.style.padding = '10px';
    jeuxMessage.style.borderRadius = '5px';
    jeuxMessage.style.marginBottom = '20px';
    jeuxMessage.innerText = 'Veuillez noter que les jeux proposés sont pour un usage personnel uniquement.';
    
    // Ajouter le message au contenu principal
    mainPanel.appendChild(jeuxMessage);
  }

  // Insérer le reste du contenu de la catégorie sélectionnée
  const categoryContent = document.createElement('div');
  categoryContent.classList.add('category-section');
  
  // Remplir le contenu de la catégorie (exemple)
  categoryContent.innerHTML = `<h2>${getCategoryTitle(category)}</h2><p>Contenu pour la catégorie ${category}...</p>`;
  
  mainPanel.appendChild(categoryContent);
}

// Fonction pour récupérer le titre de la catégorie
function getCategoryTitle(category) {
  const titles = {
    'logiciels': '📊 Logiciels',
    'education': '🎓 Éducation',
    'design': '🎨 Design',
    'development': '💻 Développement Web',
    'tools': '🛠️ Outils',
    'medias': '🎬 Films / TV / Séries',
    'play': '🎮 Jeux'
  };
  
  return titles[category] || 'Catégorie';
}
