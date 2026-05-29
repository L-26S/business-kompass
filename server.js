const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'Business Kompass API läuft' });
});

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Kein Prompt übergeben' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    console.log('Anthropic response status:', response.status);

    if (data.error) {
      console.error('Anthropic error:', data.error);
      return res.status(500).json({ error: data.error.message });
    }

    const text = data?.content?.[0]?.text || '';
    
    // JSON bereinigen
    let clean = text.replace(/```json|```/g, '').trim();
    
    // Ersten { und letzten } extrahieren
    const firstBrace = clean.indexOf('{');
    const lastBrace = clean.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      clean = clean.substring(firstBrace, lastBrace + 1);
    }
    
    // Sonderzeichen in Strings bereinigen
    clean = clean
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, ' ')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '')
      .replace(/\t/g, ' ');
    
    // Prüfen ob gültiges JSON
    try {
      JSON.parse(clean);
    } catch(parseErr) {
      console.error('JSON parse error:', parseErr.message);
      console.error('Problematic JSON around error:', clean.substring(4900, 5100));
    }
    
    console.log('Result length:', clean.length);
    return res.status(200).json({ result: clean });
  } catch (err) {
    console.error('API Fehler:', err);
    return res.status(500).json({ error: 'API Fehler. Bitte nochmal versuchen.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
