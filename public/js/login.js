document.addEventListener('DOMContentLoaded', function() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');

    const userData = () => {
        console.log('Username:', username.value);
        console.log('Password:', password.value);
    };

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting
        userData(); // Call the function to log the username and password
    });
});