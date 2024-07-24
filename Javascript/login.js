document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.querySelector('.close');
    const loginForm = document.getElementById('login-form');
    const dashboardContent = document.getElementById('dashboard-content');

    // Afficher la modal de connexion
    loginModal.style.display = 'block';

    // Fermer la modal
    closeModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Soumettre le formulaire de connexion
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const password = document.getElementById('password').value;
        const now = new Date();
        const currentPassword = `${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${(now.getMonth() + 1).toString().padStart(2, '0')}`;
        
        if (password === currentPassword) {
            // Valider la session de l'utilisateur
            document.cookie = "session_valid=true; path=/; max-age=600"; // 10 minutes
            loginModal.style.display = 'none';
            dashboardContent.style.display = 'block';
        } else {
            document.getElementById('login-error').style.display = 'block';
        }
    });
});
