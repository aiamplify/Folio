import express from 'express';
import cors from 'cors';
import { saveContactMessage, getRecentMessages } from './lib/db';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await saveContactMessage(name, email, message);
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const messages = await getRecentMessages();
    res.json(messages);
  } catch (error) {
    console.error('Error getting messages:', error);
    res.status(500).json({ error: 'Failed to get messages' });
  }
});

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  try {
    const messages = await getRecentMessages();
    console.log('Current messages in database:', messages);
  } catch (error) {
    console.error('Error checking messages:', error);
  }
});
