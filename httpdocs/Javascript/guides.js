document.addEventListener('DOMContentLoaded', () => {
    const fileList = document.getElementById('file-list');

    async function loadFiles() {
        try {
            const response = await fetch('list_files.php');
            if (!response.ok) throw new Error('Network response was not ok');

            const jsonResult = await response.json(); // Utilisez .json() pour obtenir directement le JSON

            console.log('Fichiers reçus:', jsonResult); // Affichez le résultat JSON parsé

            if (Array.isArray(jsonResult)) {
                fileList.innerHTML = jsonResult.map(file => `
                    <li><a href="uploads/${file}" target="_blank">${file}</a></li>
                `).join('');
            } else if (jsonResult.error) {
                fileList.innerHTML = `<li>${jsonResult.error}</li>`;
            } else {
                fileList.innerHTML = '<li>Réponse invalide du serveur.</li>';
            }
        } catch (error) {
            console.error('Erreur lors du chargement des fichiers:', error);
            fileList.innerHTML = '<li>Erreur lors du chargement des fichiers.</li>';
        }
    }

    loadFiles();
});
