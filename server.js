import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

app.post('/chat', async (req, res) => {

    try {

        const {
            messages,
            password,
            model
        } = req.body;

        if (password !== ADMIN_PASSWORD) {
            return res.status(401).json({
                error: 'Unauthorized'
            });
        }

        const response = await fetch(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://your-site.com',
                    'X-Title': 'Tilda AI Assistant'
                },
                body: JSON.stringify({
                    model: model || 'deepseek/deepseek-chat-v3-0324:free',
                    messages,
                    stream: false
                })
            }
        );

        const data = await response.json();

        res.json(data);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Server Error'
        });
    }
});

app.listen(3000, () => {
    console.log('Server started');
});
