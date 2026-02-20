exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    const { email } = JSON.parse(event.body || '{}');
    if (!email || !email.includes('@')) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Valid email required' }) };
    }
    const API_KEY = process.env.MAILERLITE_API_KEY;
    const GROUP_ID = process.env.MAILERLITE_GROUP_ID;
    if (!API_KEY || !GROUP_ID) {
        console.error('Missing MAILERLITE_API_KEY or MAILERLITE_GROUP_ID env vars');
        return { statusCode: 500, body: JSON.stringify({ error: 'Server configuration error' }) };
    }
    try {
        const response = await fetch(
            `https://api.mailerlite.com/api/v2/groups/${GROUP_ID}/subscribers`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-MailerLite-ApiKey': API_KEY },
                body: JSON.stringify({ email: email, resubscribe: true })
            }
        );
        if (!response.ok) {
            const errorData = await response.text();
            console.error('MailerLite error:', errorData);
            return { statusCode: 500, body: JSON.stringify({ error: 'Subscription failed. Please try again.' }) };
        }
        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (err) {
        console.error('Network error:', err);
        return { statusCode: 500, body: JSON.stringify({ error: 'Network error. Please try again.' }) };
    }
};
