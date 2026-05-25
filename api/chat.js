export default async function handler(req, res) {

    res.setHeader(
        'Access-Control-Allow-Origin',
        '*'
    );

    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type'
    );

    res.setHeader(
        'Access-Control-Allow-Methods',
        'POST, OPTIONS'
    );

    if (req.method === 'OPTIONS') {

        return res.status(200).end();
    }

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

        console.log('FROM TILDA:', password);

        console.log(
            'FROM VERCEL:',
            process.env.ADMIN_PASSWORD
        ); {


            // return res.status(401).json({
            //     error: 'Unauthorized'
            // });
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
                        'https://urban-estate.ru',

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

        console.log(data);

        return res.status(200).json(data);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: error.message
        });
    }
}
