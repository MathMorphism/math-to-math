const start = document.querySelector('#start');
const stop = document.querySelector('#stop');

// start the speech
start.addEventListener('click', () => {
        start.style.display = 'none';
        stop.style.display = 'block';
});

// end the speech
stop.addEventListener('click', () => {
        start.style.display = 'block';
        stop.style.display = 'none';
});
