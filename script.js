document.addEventListener('DOMContentLoaded', function() {
    const name1Input = document.getElementById('name1');
    const name2Input = document.getElementById('name2');
    const labelTypeRadios = document.querySelectorAll('input[name="labelType"]');
    const labelPreview = document.getElementById('labelPreview');
    const downloadButton = document.getElementById('downloadButton');
    const name2Container = document.querySelector('.input-group input:nth-child(2)');

    // Mettre à jour l'aperçu à chaque saisie
    name1Input.addEventListener('input', updatePreview);
    name2Input.addEventListener('input', updatePreview);

    // Gérer l'affichage du champ pour le deuxième nom
    labelTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'double') {
                name2Container.style.display = 'block';
            } else {
                name2Container.style.display = 'none';
            }
            updatePreview();
        });
    });

    // Mettre à jour l'aperçu
    function updatePreview() {
        const labelType = document.querySelector('input[name="labelType"]:checked').value;
        const name1 = name1Input.value;
        let name2 = '';

        if (labelType === 'double') {
            name2 = name2Input.value;
        }

        if (labelType === 'single') {
            labelPreview.innerHTML = name1;
        } else {
            labelPreview.innerHTML = `${name1}<br>${name2}`;
        }
    }

    // Télécharger l'étiquette
    downloadButton.addEventListener('click', function() {
        html2canvas(labelPreview).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'etiquette.png';
            link.click();
        });
    });

    // Initialiser l'aperçu
    updatePreview();
});
