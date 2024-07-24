<script>
document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('upload_html.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            window.location.href = `new-page-${result.pageId}.html`;
        } else {
            alert('Erreur: ' + result.message);
        }
    })
    .catch(error => {
        console.error('Erreur lors de l\'upload:', error);
    });
});
</script>
