const axios = require('axios');
const readline = require('readline');

const BASE_URL = 'https://api.ayoba.me/v2';
const TOKEN_EXPIRATION_TIME = 30 * 60 * 1000;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let token;
let tokenExpiration;

async function login(username, password) {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            username,
            password,
        });
        console.log('Login successful:', response.data);
        token = response.data.access_token;
        tokenExpiration = Date.now() + TOKEN_EXPIRATION_TIME;
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
    }
}

async function sendTextMessage(msisdn, message) {
    try {
        const response = await axios.post(
            'https://api.ayoba.me/v1/business/message',
            {
                msisdns: [msisdn],
                message: {
                    text: message,
                    type: 'text',
                },
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        console.log('Text message sent successfully:', response.data);
    } catch (error) {
        console.error('Failed to send text message:', error.response ? error.response.data : error.message);
    }
}

async function sendLocationMessage(msisdn, latitude, longitude) {
    try {
        const response = await axios.post(
            'https://api.ayoba.me/v1/business/message',
            {
                msisdns: [msisdn],
                message: {
                    coordinates: {
                        latitude,
                        longitude,
                    },
                    type: 'location',
                },
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        console.log('Location message sent successfully:', response.data);
    } catch (error) {
        console.error('Failed to send location message:', error.response ? error.response.data : error.message);
    }
}

async function sendMediaMessage(msisdn, mediaUrl, caption) {
    try {
        const response = await axios.post(
            'https://api.ayoba.me/v1/business/message',
            {
                msisdns: [msisdn],
                message: {
                    caption,
                    type: 'media',
                    url: mediaUrl,
                },
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        console.log('Media message sent successfully:', response.data);
    } catch (error) {
        console.error('Failed to send media message:', error.response ? error.response.data : error.message);
    }
}

async function sendReactionMessage(msisdn, correlationId, reaction) {
    try {
        const response = await axios.post(
            'https://api.ayoba.me/v1/business/message',
            {
                msisdns: [msisdn],
                message: {
                    correlationId,
                    type: 'reaction',
                    reaction,
                },
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        console.log('Reaction message sent successfully:', response.data);
    } catch (error) {
        console.error('Failed to send reaction message:', error.response ? error.response.data : error.message);
    }
}

async function deleteMessage(msisdn, correlationId) {
    try {
        const response = await axios.post(
            'https://api.ayoba.me/v1/business/message',
            {
                msisdns: [msisdn],
                message: {
                    correlationId,
                    type: 'delete',
                },
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        console.log('Message deleted successfully:', response.data);
    } catch (error) {
        console.error('Failed to delete message:', error.response ? error.response.data : error.message);
    }
}

async function listMessages() {
    try {
        const response = await axios.get('https://api.ayoba.me/v1/business/message', {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log('List of messages:', response.data);
    } catch (error) {
        console.error('Failed to list messages:', error.response ? error.response.data : error.message);
    }
}

async function cliMenu() {
    const username = 'e5e0ae993390e9aa596e79b729054fad91dccf9e'; 
    const password = 'MSuEVJEFHGXkuEMM2UA2yJMi0MBljUb';

    await login(username, password);
    if (!token) return;

    while (true) {
        if (Date.now() > tokenExpiration) {
            console.log('Token has expired. Please log in again.');
            await login(username, password);
            if (!token) return;
        }

        console.log('Choose an option:');
        console.log('1. Send Text Message');
        console.log('2. Send Location Message');
        console.log('3. Send Media Message');
        console.log('4. Send Reaction Message');
        console.log('5. Delete Message');
        console.log('6. List Messages');
        console.log('7. Exit');

        // Wait for user input
        const option = await new Promise((resolve) => {
            rl.question('> ', resolve);
        });

        switch (option) {
            case '1':
                const msisdnText = await new Promise((resolve) => {
                    rl.question('Enter MSISDN: ', resolve);
                });
                const messageText = await new Promise((resolve) => {
                    rl.question('Enter message text: ', resolve);
                });
                await sendTextMessage(msisdnText, messageText);
                break;

            case '2':
                const msisdnLocation = await new Promise((resolve) => {
                    rl.question('Enter MSISDN: ', resolve);
                });
                const latitude = await new Promise((resolve) => {
                    rl.question('Enter latitude: ', resolve);
                });
                const longitude = await new Promise((resolve) => {
                    rl.question('Enter longitude: ', resolve);
                });
                await sendLocationMessage(msisdnLocation, latitude, longitude);
                break;

            case '3':
                const msisdnMedia = await new Promise((resolve) => {
                    rl.question('Enter MSISDN: ', resolve);
                });
                const mediaUrl = await new Promise((resolve) => {
                    rl.question('Enter media URL: ', resolve);
                });
                const caption = await new Promise((resolve) => {
                    rl.question('Enter caption: ', resolve);
                });
                await sendMediaMessage(msisdnMedia, mediaUrl, caption);
                break;

            case '4':
                const msisdnReaction = await new Promise((resolve) => {
                    rl.question('Enter MSISDN: ', resolve);
                });
                const correlationId = await new Promise((resolve) => {
                    rl.question('Enter correlation ID: ', resolve);
                });
                const reaction = await new Promise((resolve) => {
                    rl.question('Enter reaction (e.g., 😀): ', resolve);
                });
                await sendReactionMessage(msisdnReaction, correlationId, reaction);
                break;

            case '5':
                const msisdnDelete = await new Promise((resolve) => {
                    rl.question('Enter MSISDN: ', resolve);
                });
                const correlationIdDelete = await new Promise((resolve) => {
                    rl.question('Enter correlation ID: ', resolve);
                });
                await deleteMessage(msisdnDelete, correlationIdDelete);
                break;

            case '6':
                await listMessages();
                break;

            case '7':
                rl.close();
                return;

            default:
                console.log('Invalid option');
                break;
        }
    }
}

cliMenu();
