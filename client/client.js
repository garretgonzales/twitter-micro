const form = document.querySelector('form');

const loadingSpinner = document.querySelector('.loading');

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

    console.log(tweet);
    loadingSpinner.style.display = '';
    form.style.display = 'none';
});