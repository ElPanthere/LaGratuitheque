document.addEventListener('DOMContentLoaded', function() {
  // Fonction pour charger et afficher les données
  function loadCategories() {
    fetch('fetch_data.php')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('categories-container');
        
        // Effacer le contenu précédent
        container.innerHTML = '';

        data.forEach(item => {
          const categoryCard = document.createElement('div');
          categoryCard.classList.add('category-card');
          
          // Vérifiez si la colonne "Guide" a une valeur
          const guideLink = item.Guide ? `<a href="${item.Guide}" class="category-guide">Guide</a>` : '';
          
          categoryCard.innerHTML = `
            <h2 class="category-title">${item.Category} 📚</h2>
            <p>${item.Description}</p>
            ${guideLink}
          `;
          
          container.appendChild(categoryCard);
        });
      })
      .catch(error => console.error('Erreur lors de la récupération des données:', error));
  }

  loadCategories();
});