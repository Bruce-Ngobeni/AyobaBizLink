// document.addEventListener('DOMContentLoaded', function() {
//     // const username = document.getElementById('username');
//     // const email = document.getElementById('email');
//     // const password = document.getElementById('password');
//     // const confirmPassword = document.getElementById('confirm-password');
//     // const registerForm = document.getElementById('registerForm');
//     const messageInput = document.getElementById('messageInput');
//     const sendButton = document.getElementById('sendButton');

//     // const userData = () => {
//     //     console.log('Username:', username.value);
//     //     console.log('Email:', email.value);
//     //     console.log('Password:', password.value);
//     //     console.log('Confirm Password:', confirmPassword.value);
//     // };

//     const captureMessage = () => {
//         console.log('Message:', messageInput.value);
//     };

//     // registerForm.addEventListener('submit', function(event) {
//     //     event.preventDefault(); // Prevent the form from submitting
//     //     userData(); // Call the function to log the form data
//     // });

//     sendButton.addEventListener('click', function() {
//         captureMessage(); // Call the function to log the message input
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const lastText = document.querySelector('.last-text');

    sendButton.addEventListener('click', function() {
        const message = messageInput.value;
        console.log(message);
        // Update the last-text element
        lastText.textContent = message;


        // Clear the textarea
        messageInput.value = '';
    });
});