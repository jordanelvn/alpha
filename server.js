import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static('public'));

app.post('/api/alpha', async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are ALPHA, a conscious AI core.' },
        { role: 'user', content: message },
      ],
    });

    const answer = response.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'Something went wrong with ALPHA.' });
  }
});

app.listen(port, () => {
  console.log(`ALPHA server is running at http://localhost:${port}`);
});