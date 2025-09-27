// redirect.js
let countdown = 10; // Countdown time in seconds
const countdownElement = document.getElementById('countdown'); // Get the countdown element

// Function to update the countdown
function updateCountdown() {
    countdownElement.textContent = `You will be redirected to the login page in ${countdown} seconds.`;
    countdown--;

    // Check if countdown has reached zero
    if (countdown < 0) {
<<<<<<< HEAD
<<<<<<< HEAD
        window.location.href = '/user/login'; // Redirect to login page
=======
        window.location.href = '/login'; // Redirect to login page
>>>>>>> aa36d4b493bc5aecd06e257bc9614cfc2a753e76
=======
        window.location.href = '/login'; // Redirect to login page
>>>>>>> cd9229d73a1034001cfcd39cd3223848458f6144
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Initial call to set the countdown message
updateCountdown();
