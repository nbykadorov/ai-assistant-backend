export default async function handler(req, res) {

    if (req.method !== 'POST') {

        return res.status(405).json({
            error: 'Method not allowed'
        });
    }

    try {

        const {
            messages,
            password,
            model
        } = req.body;

        if (
            password !== process.env.ADMIN_PASSWORD
        ) {

            return res.status(401).json({
                error: 'Unauthorized'
            });
        }

        const response = await fetch(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Authorization':
                        `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type':
                        'application/json',
                    'HTTP-Referer':
                        'https://your-site.com',
                    'X-Title':
                        'Tilda AI Assistant'
                },
                body: JSON.stringify({
                    model:
                        model ||
                        'deepseek/deepseek-chat-v3-0324:free',

                    messages
                })
            }
        );

        const data = await response.json();

        return res.status(200).json(data);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: error.message
        });
    }
}
