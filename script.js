const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const progressElement = document.querySelector('.progress-value');

const startDate = new Date("12/3/2023").getTime(); // November 7, 2023
const targetDate = new Date("01/13/2024").getTime(); // December 2, 2023

async function getQuote(){
    const res = await fetch('https://api.quotable.io/quotes/random?tags=love')
    const data = await res.json()
    document.getElementById("quote").textContent = data[0].content
}

function startCountdown() {
    function updateCountdown() {
        const currentTime = new Date().getTime();
        const timeDifference = targetDate - currentTime;

        if (timeDifference <= 0) {
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            progressElement.style.width = '100%'; 
            clearInterval(countdownInterval);
        } else {
            const totalMilliseconds = targetDate - startDate;
            const remainingMilliseconds = targetDate - currentTime;
            const progress = ((totalMilliseconds - remainingMilliseconds) / totalMilliseconds) * 100;

            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            daysElement.textContent = days < 10 ? '0' + days : days;
            hoursElement.textContent = hours < 10 ? '0' + hours : hours;
            minutesElement.textContent = minutes < 10 ? '0' + minutes : minutes;
            secondsElement.textContent = seconds < 10 ? '0' + seconds : seconds;

            progressElement.style.width = progress + '%';
        }
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

startCountdown();
getQuote()
