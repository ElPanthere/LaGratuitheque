document.addEventListener('DOMContentLoaded', () => {
    const csvForm = document.getElementById('csv-form');
    const manualEntryForm = document.getElementById('manual-entry-form');
    const htmlForm = document.getElementById('html-form');
    const entriesBody = document.getElementById('entries-body');
    const selectAllCheckbox = document.getElementById('select-all');
    const deleteSelectedButton = document.getElementById('delete-selected');

    // Fonction pour charger les données
    async function loadEntries() {
        try {
            const response = await fetch('get_data.php');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            entriesBody.innerHTML = data.map(entry => `
                <tr>
                    <td><input type="checkbox" class="entry-checkbox" value="${entry.id}"></td>
                    <td>${entry.id}</td>
                    <td>${entry.categorie}</td>
                    <td>${entry.lien}</td>
                    <td>${entry.titre}</td>
                    <td>${entry.texte}</td>
                    <td>${entry.sous_cat}</td>
                    <td>${entry.guide}</td>
                    <td><button onclick="deleteEntry(${entry.id})">Supprimer</button></td>
                </tr>
            `).join('');
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        }
    }

    // Charger les données au démarrage
    loadEntries();

    // Fonction pour supprimer une entrée
    window.deleteEntry = async function(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette entrée ?')) {
            try {
                const response = await fetch('delete_entry.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ id })
                });
                if (!response.ok) throw new Error('Network response was not ok');
                await response.text();
                loadEntries();
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'entrée:', error);
            }
        }
    };

    // Fonction pour supprimer les entrées sélectionnées
    deleteSelectedButton.addEventListener('click', async () => {
        const selectedIds = Array.from(document.querySelectorAll('.entry-checkbox:checked'))
            .map(checkbox => checkbox.value);

        if (selectedIds.length === 0) {
            alert('Veuillez sélectionner des entrées à supprimer.');
            return;
        }

        if (confirm('Êtes-vous sûr de vouloir supprimer les entrées sélectionnées ?')) {
            try {
                const response = await fetch('delete_entries.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ ids: JSON.stringify(selectedIds) })
                });
                if (!response.ok) throw new Error('Network response was not ok');
                await response.text();
                loadEntries();
            } catch (error) {
                console.error('Erreur lors de la suppression des entrées sélectionnées:', error);
            }
        }
    });

    // Fonction pour importer un fichier CSV
    csvForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(csvForm);

        try {
            const response = await fetch('import_csv.php', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.text();
            document.getElementById('import-status').innerText = result;
            loadEntries();
        } catch (error) {
            console.error('Erreur lors de l\'importation du fichier CSV:', error);
            document.getElementById('import-status').innerText = 'Erreur lors de l\'importation.';
        }
    });

    // Fonction pour importer un fichier HTML
    htmlForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(htmlForm);

        try {
            const response = await fetch('upload_html.php', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();

            if (result.url) {
                // Ouvrir le fichier dans un nouvel onglet
                window.open(result.url, '_blank');
            } else {
                document.getElementById('html-import-status').innerText = 'Erreur lors de l\'importation.';
            }
        } catch (error) {
            console.error('Erreur lors de l\'importation du fichier HTML:', error);
            document.getElementById('html-import-status').innerText = 'Erreur lors de l\'importation.';
        }
    });

    // Fonction pour ajouter une entrée manuellement
    manualEntryForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(manualEntryForm);

        try {
            const response = await fetch('add_entry.php', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.text();
            alert(result);
            manualEntryForm.reset();
            loadEntries();
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'entrée:', error);
        }
    });

    // Fonction pour sélectionner/désélectionner toutes les cases
    selectAllCheckbox.addEventListener('change', (event) => {
        document.querySelectorAll('.entry-checkbox').forEach(checkbox => {
            checkbox.checked = event.target.checked;
        });
    });
});
