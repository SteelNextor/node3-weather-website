const weatherform = document.querySelector('form');
const search = document.querySelector('input');
const icon =  document.querySelector('img');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weatherform.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    let url = `/weather?address=${location}`;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    icon.style.visibility = 'hidden';

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            }
            else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                if (data.weatherIcon) {
                    icon.src = data.weatherIcon;
                    icon.style.visibility = 'visible';
                }
            }
        });
    });
});