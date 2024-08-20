document.addEventListener('DOMContentLoaded', function() {
  const accessLibraryButton = document.getElementById('access-library');
  const homepage = document.getElementById('homepage');
  const mainContent = document.getElementById('main-content');

  accessLibraryButton.addEventListener('click', function() {
    homepage.style.display = 'none'; // Masquer la page d'accueil
    mainContent.style.display = 'flex'; // Afficher le contenu principal
  });
});


function showCategory(category) {
    const mainPanel = document.getElementById('main-panel');

    // Nettoyer le contenu existant
    mainPanel.innerHTML = '';

    // Contenu spécifique pour la catégorie "Jeux"
    if (category === 'play') {
        // Créer et ajouter le message en jaune
        const warningMessage = document.createElement('div');
        warningMessage.style.backgroundColor = 'yellow';
        warningMessage.style.color = 'black';
        warningMessage.style.padding = '10px';
        warningMessage.style.borderRadius = '5px';
        warningMessage.style.marginBottom = '20px';
        warningMessage.innerText = 'Veuillez noter que les jeux proposés sont pour un usage personnel uniquement.';

        mainPanel.appendChild(warningMessage);
    }

    // Créer le contenu de la catégorie
    const categoryContent = document.createElement('div');
    categoryContent.classList.add('category-section');
    categoryContent.innerHTML = `<h2>${getCategoryTitle(category)}</h2><p>Contenu pour la catégorie ${category}...</p>`;

    // Ajouter le contenu de la catégorie
    mainPanel.appendChild(categoryContent);
}

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
