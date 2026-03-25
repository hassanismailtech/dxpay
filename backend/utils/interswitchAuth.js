const axios = require('axios');
require('dotenv').config();

const getInterswitchToken = async () => {
    const clientId = process.env.INTERSWITCH_CLIENT_ID;
    const secretKey = process.env.INTERSWITCH_SECRET_KEY;
    const passportUrl = process.env.INTERSWITCH_PASSPORT_ENV;

    // 1. Concatenate and Base64 encode the credentials
    const credentials = `${clientId}:${secretKey}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');

    try {
        // 2. Make the POST request to the Interswitch Passport endpoint
        const response = await axios.post(
            passportUrl,
            'grant_type=client_credentials', // Must be sent as form-urlencoded data
            {
                headers: {
                    'Authorization': `Basic ${encodedCredentials}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        // 3. Return the access token (usually expires in 24 hours)
        console.log('Interswitch Token generated successfully!');
        return response.data.access_token;

    } catch (error) {
        console.error('Error generating Interswitch token:', error.response ? error.response.data : error.message);
        throw new Error('Failed to authenticate with Interswitch');
    }
};

module.exports = { getInterswitchToken };