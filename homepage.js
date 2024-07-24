// Javascript source.js
document.addEventListener('DOMContentLoaded', function() {
  const accessButton = document.getElementById('access-library');
  const homepage = document.getElementById('homepage');
  const mainContent = document.getElementById('main-content');

  accessButton.addEventListener('click', function() {
    homepage.style.display = 'none';
    mainContent.style.display = 'flex';
  });
});
