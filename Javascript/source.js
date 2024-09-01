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
        .then(response => response.ok ? response.json() : Promise.reject(response.text()))
        .then(data => {
            console.log(data); // Affiche les données ou les messages d'erreur/succès dans la console
			
            const guideMessage = document.getElementById('guide-message');
            guideMessage.style.display = category === 'play' ? 'block' : 'none';

            const mainPanel = document.getElementById('main-panel');
            mainPanel.innerHTML = ''; // Vider le contenu précédent

            const rightPanel = document.querySelector('.right-panel ul');
            rightPanel.innerHTML = ''; // Réinitialiser le menu de navigation

            if (data.error) {
                mainPanel.innerHTML = `<p>${data.error}</p>`;
            } else if (data.length > 0) {
                const categoryTitle = document.createElement('h2');
                categoryTitle.className = 'category-title';
                categoryTitle.innerHTML = replaceUnderscoresWithUnderline(category);
                mainPanel.appendChild(categoryTitle);

                const subCategories = data.reduce((acc, item) => {
                    const sousCat = item.sous_cat || 'Autre';
                    acc[sousCat] = acc[sousCat] || [];
                    acc[sousCat].push(item);
                    return acc;
                }, {});

                for (const sousCat in subCategories) {
                    const subCategoryItem = document.createElement('li');
                    const subCategoryLink = document.createElement('a');
                    subCategoryLink.href = '#';
                    subCategoryLink.textContent = replaceUnderscoresWithUnderline(sousCat);
                    subCategoryLink.addEventListener('click', (event) => {
                        event.preventDefault();
                        showSubCategory(sousCat, subCategories[sousCat]);
                    });
                    subCategoryItem.appendChild(subCategoryLink);
                    rightPanel.appendChild(subCategoryItem);
                }

                for (const [sousCat, items] of Object.entries(subCategories)) {
                    items.sort((a, b) => {
                        return a.titre.startsWith('*') && !b.titre.startsWith('*') ? -1 : !a.titre.startsWith('*') && b.titre.startsWith('*') ? 1 : 0;
                    });

                    const subCategorySection = document.createElement('section');
                    subCategorySection.className = 'sub-category-section';

                    const subCategoryTitle = document.createElement('h3');
                    subCategoryTitle.className = 'sub-category-title';
                    subCategoryTitle.innerHTML = replaceUnderscoresWithUnderline(sousCat);
                    subCategorySection.appendChild(subCategoryTitle);

                    items.forEach(item => {
                        const titleWithStar = replaceAsteriskWithStar(item.titre);
                        const guideLink = item.guide ? ` <a href="${item.guide}" target="_blank" rel="noopener noreferrer">Guide ↗</a>` : '';
                        const linkElement = document.createElement('p');
                        linkElement.className = 'item-title';
                        linkElement.innerHTML = `<a href="${item.lien}" target="_blank" rel="noopener noreferrer">${replaceUnderscoresWithUnderline(titleWithStar)}</a> ${replaceUnderscoresWithUnderline(item.texte)}${guideLink}`;
                        subCategorySection.appendChild(linkElement);
                    });

                    mainPanel.appendChild(subCategorySection);
                }

                replaceUnderscoresWithUnderlineInElement(mainPanel);
            } else {
                mainPanel.innerHTML = '<p>Aucun résultat trouvé pour cette catégorie.</p>';
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            document.getElementById('main-panel').innerHTML = `<p>Erreur lors de la récupération des données: ${error.message}</p>`;
        });
}

function showSubCategory(subCategory, items) {
    console.log('Sub-Category selected:', subCategory);

    const mainPanel = document.getElementById('main-panel');
    mainPanel.innerHTML = ''; // Vider le contenu précédent

    const subCategoryTitle = document.createElement('h2');
    subCategoryTitle.className = 'sub-category-title';
    subCategoryTitle.innerHTML = replaceUnderscoresWithUnderline(subCategory);
    mainPanel.appendChild(subCategoryTitle);

    items.forEach(item => {
        const titleWithStar = replaceAsteriskWithStar(item.titre);
        const guideLink = item.guide ? ` <a href="${item.guide}" target="_blank" rel="noopener noreferrer">Guide ↗</a>` : '';
        const linkElement = document.createElement('p');
        linkElement.className = 'item-title';
        linkElement.innerHTML = `<a href="${item.lien}" target="_blank" rel="noopener noreferrer">${replaceUnderscoresWithUnderline(titleWithStar)}</a> ${replaceUnderscoresWithUnderline(item.texte)}${guideLink}`;
        mainPanel.appendChild(linkElement);
    });

    replaceUnderscoresWithUnderlineInElement(mainPanel);
}

function replaceAsteriskWithStar(title) {
    return title.replace(/\*/g, '⭐');
}

function replaceUnderscoresWithUnderline(text) {
    return text.replace(/__(.+?)__/g, '<u>$1</u>');
}

function replaceUnderscoresWithUnderlineInElement(element) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while ((node = walker.nextNode())) {
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
