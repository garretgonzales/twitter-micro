const form = document.querySelector('form');

const loadingSpinner = document.querySelector('.loading');

const API_URL = 'http://localhost:5001/tweets';

loadingSpinner.style.display = 'none';

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const name = formData.get('name');
    const content = formData.get('content');

    const tweet = {
        name,
        content
    };

    loadingSpinner.style.display = '';
    form.style.display = 'none';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(tweet),
        headers: {
            'content-type': 'application/json'
        }
    })
});