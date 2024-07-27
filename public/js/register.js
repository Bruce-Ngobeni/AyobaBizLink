document.addEventListener('DOMContentLoaded', function() {
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const registerForm = document.getElementById('registerForm');

    const userData = () => {
        console.log('Username:', username.value);
        console.log('Email:', email.value);
        console.log('Password:', password.value);
        console.log('Confirm Password:', confirmPassword.value);
    };

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting
        userData(); // Call the function to log the form data
    });
});
