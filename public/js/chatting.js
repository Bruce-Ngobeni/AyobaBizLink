// document.addEventListener('DOMContentLoaded', function() {
//     const messageInput = document.getElementById('messageInput');
//     const sendButton = document.getElementById('sendButton');
//     const lastText = document.querySelector('.last-text');
//     const contacts = document.querySelectorAll('.contact-item'); // Assuming each customer has this class
//     const currentCustomerElement = document.getElementById('currentCustomer'); // Assuming this is the h2 element

//     sendButton.addEventListener('click', function() {
//         const message = messageInput.value;
//         console.log(message);
//         // Update the last-text element
//         lastText.textContent = message;

//         // Clear the textarea
//         messageInput.value = '';
//     });

//     contacts.forEach(contact => {
//         contact.addEventListener('click', function() {
//             const customerName = this.querySelector('.customer-name').textContent;
//             currentCustomerElement.textContent = customerName;
//         });
//     });
// });


document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const lastText = document.querySelector('.last-text');
    const contacts = document.querySelectorAll('.contact-item'); // Select all contact items
    const currentCustomerElement = document.getElementById('currentCustomer'); // The h2 element
    

    sendButton.addEventListener('click', function() {
        const message = messageInput.value;
        console.log(message);
        // Update the last-text element
        lastText.textContent = message;

        // Clear the textarea
        messageInput.value = '';

        console.log(currentCustomerElement);
        console.log("Hey: ",currentCustomerElement.value);
    });

    contacts.forEach(contact => {
        contact.addEventListener('click', function() {
            
            const customerName = this.querySelector('.customer-name').textContent;
            
            currentCustomerElement.textContent = customerName;
        });
    });
});

