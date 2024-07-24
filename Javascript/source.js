document.addEventListener('DOMContentLoaded', () => {
    const nightModeToggle = document.getElementById('night-mode-toggle');
    const body = document.body;

    // Activer le mode nuit par défaut
    body.classList.add('night-mode');

    // Basculer entre le mode nuit et le mode jour
    nightModeToggle.addEventListener('click', () => {
        body.classList.toggle('day-mode');
        body.classList.toggle('night-mode');
        nightModeToggle.textContent = body.classList.contains('night-mode') ? 'Mode Jour' : 'Mode Nuit';
    });
});

function showCategory(category) {
    console.log('Category selected:', category);

    fetch(`get_links.php?categorie=${encodeURIComponent(category)}`)
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Network response was not ok: ${response.statusText}. Response body: ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Affiche les données ou les messages d'erreur/succès dans la console

            const mainPanel = document.getElementById('main-panel');
            mainPanel.innerHTML = ''; // Vider le contenu précédent

            const rightPanel = document.querySelector('.right-panel');
            rightPanel.innerHTML = '<h2>Navigation</h2><ul></ul>'; // Réinitialiser le menu de navigation

            if (data.error) {
                mainPanel.innerHTML = `<p>${data.error}</p>`;
            } else if (data.length > 0) {
                // Ajouter le titre de la catégorie
                const categoryTitle = document.createElement('h2');
                categoryTitle.className = 'category-title';
                categoryTitle.innerHTML = replaceUnderscoresWithUnderline(category);
                mainPanel.appendChild(categoryTitle);

                // Organiser les outils par sous-catégorie
                const subCategories = {};

                data.forEach(item => {
                    const sousCat = item.sous_cat || 'Autre';
                    if (!subCategories[sousCat]) {
                        subCategories[sousCat] = [];
                    }
                    subCategories[sousCat].push(item);
                });

                // Afficher les sous-catégories dans le panneau de navigation
                const subCategoryList = rightPanel.querySelector('ul');
                for (const sousCat of Object.keys(subCategories)) {
                    const subCategoryItem = document.createElement('li');
                    const subCategoryLink = document.createElement('a');
                    subCategoryLink.href = '#';
                    subCategoryLink.textContent = replaceUnderscoresWithUnderline(sousCat);
                    subCategoryLink.addEventListener('click', (event) => {
                        event.preventDefault();
                        showSubCategory(sousCat, subCategories[sousCat]);
                    });
                    subCategoryItem.appendChild(subCategoryLink);
                    subCategoryList.appendChild(subCategoryItem);
                }

                // Afficher les sous-catégories dans le panneau principal
                for (const [sousCat, items] of Object.entries(subCategories)) {
                    // Trier les items : les titres commençant par '*' en premier
                    items.sort((a, b) => {
                        const aStartsWithStar = a.titre.startsWith('*');
                        const bStartsWithStar = b.titre.startsWith('*');
                        if (aStartsWithStar && !bStartsWithStar) {
                            return -1;
                        }
                        if (!aStartsWithStar && bStartsWithStar) {
                            return 1;
                        }
                        return 0;
                    });

                    const subCategorySection = document.createElement('section');
                    subCategorySection.className = 'sub-category-section'; // Ajout de la classe pour l'espacement

                    // Ajouter le titre de la sous-catégorie
                    const subCategoryTitle = document.createElement('h3');
                    subCategoryTitle.className = 'sub-category-title';
                    subCategoryTitle.innerHTML = replaceUnderscoresWithUnderline(sousCat);
                    subCategorySection.appendChild(subCategoryTitle);

                    items.forEach(item => {
                        const titleWithStar = replaceAsteriskWithStar(item.titre);
                        let guideLink = '';
                        if (item.guide && item.guide.trim() !== '') {
                            guideLink = ` <a href="${item.guide}" target="_blank" rel="noopener noreferrer">Guide ↗</a>`;
                        }
                        const linkElement = document.createElement('p');
                        linkElement.className = 'item-title';
                        linkElement.innerHTML = `<a href="${item.lien}" target="_blank" rel="noopener noreferrer">${replaceUnderscoresWithUnderline(titleWithStar)}</a> ${replaceUnderscoresWithUnderline(item.texte)}${guideLink}`;
                        subCategorySection.appendChild(linkElement);
                    });

                    mainPanel.appendChild(subCategorySection);
                }

                // Appliquer la transformation pour souligner après avoir inséré le contenu
                replaceUnderscoresWithUnderlineInElement(mainPanel);
            } else {
                mainPanel.innerHTML = '<p>Aucun résultat trouvé pour cette catégorie.</p>';
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            const mainPanel = document.getElementById('main-panel');
            mainPanel.innerHTML = `<p>Erreur lors de la récupération des données: ${error.message}</p>`;
        });
}

function showSubCategory(subCategory, items) {
    console.log('Sub-Category selected:', subCategory);

    const mainPanel = document.getElementById('main-panel');
    mainPanel.innerHTML = ''; // Vider le contenu précédent

    // Ajouter le titre de la sous-catégorie
    const subCategoryTitle = document.createElement('h2');
    subCategoryTitle.className = 'sub-category-title';
    subCategoryTitle.innerHTML = replaceUnderscoresWithUnderline(subCategory);
    mainPanel.appendChild(subCategoryTitle);

    items.forEach(item => {
        const titleWithStar = replaceAsteriskWithStar(item.titre);
        let guideLink = '';
        if (item.guide && item.guide.trim() !== '') {
            guideLink = ` <a href="${item.guide}" target="_blank" rel="noopener noreferrer">Guide ↗</a>`;
        }
        const linkElement = document.createElement('p');
        linkElement.className = 'item-title';
        linkElement.innerHTML = `<a href="${item.lien}" target="_blank" rel="noopener noreferrer">${replaceUnderscoresWithUnderline(titleWithStar)}</a> ${replaceUnderscoresWithUnderline(item.texte)}${guideLink}`;
        mainPanel.appendChild(linkElement);
    });

    // Appliquer la transformation pour souligner après avoir inséré le contenu
    replaceUnderscoresWithUnderlineInElement(mainPanel);
}

function replaceAsteriskWithStar(title) {
    // Remplace les astérisques par des emojis étoile
    return title.replace(/\*/g, '⭐');
}

function replaceUnderscoresWithUnderline(text) {
    // Remplace les doubles underscores par des balises <u>
    return text.replace(/__(.+?)__/g, '<u>$1</u>');
}

function replaceUnderscoresWithUnderlineInElement(element) {
    // Appliquer la transformation sur tous les éléments
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walker.nextNode()) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.includes('__')) {
            const span = document.createElement('span');
            span.innerHTML = replaceUnderscoresWithUnderline(node.textContent);
            node.parentNode.replaceChild(span, node);
        }
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
