document.addEventListener('DOMContentLoaded', function() {
  const accessLibraryButton = document.getElementById('access-library');
  const homepage = document.getElementById('homepage');
  const mainContent = document.getElementById('main-content');

  accessLibraryButton.addEventListener('click', function() {
    homepage.style.display = 'none'; // Masquer la page d'accueil
    mainContent.style.display = 'flex'; // Afficher le contenu principal
  });
});


document.querySelectorAll('.left-panel a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        // Récupérer la catégorie à partir de l'attribut onclick ou du lien
        const category = event.target.getAttribute('onclick').match(/'([^']+)'/)[1];
        
        // Appeler la fonction pour afficher la catégorie
        showCategory(category);
    });
});

function showCategory(category) {
    const mainPanel = document.getElementById('main-panel');

    // Effacer le contenu actuel
    mainPanel.innerHTML = '';

    // Créer un élément de contenu principal
    const categoryContent = document.createElement('div');
    categoryContent.classList.add('category-section');
    categoryContent.innerHTML = `<h2>${getCategoryTitle(category)}</h2><p>Contenu pour la catégorie ${category}...</p>`;

    // Si la catégorie est "play", ajouter le message en jaune
    if (category === 'play') {
        const warningMessage = document.createElement('div');
        warningMessage.style.backgroundColor = 'yellow';
        warningMessage.style.color = 'black';
        warningMessage.style.padding = '10px';
        warningMessage.style.borderRadius = '5px';
        warningMessage.style.marginBottom = '20px';
        warningMessage.innerText = 'Veuillez noter que les jeux proposés sont pour un usage personnel uniquement.';
        
        // Ajouter le message avant le contenu de la catégorie
        mainPanel.appendChild(warningMessage);
    }

    // Ajouter le contenu de la catégorie dans le main panel
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
