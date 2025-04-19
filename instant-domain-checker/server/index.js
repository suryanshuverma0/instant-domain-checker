const express = require('express');
const cors = require('cors');
const whois = require('whois-json');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/check-domain', async (req, res) => {
  const { domain } = req.body;

  if (!domain || typeof domain !== 'string') {
    return res.status(400).json({ error: 'Invalid domain' });
  }

  try {
    const data = await whois(domain);
    const isAvailable = !data.domainName;
    res.json({ available: isAvailable });
  } catch (err) {
    console.error('WHOIS error:', err);
    res.status(500).json({ error: 'Error checking domain' });
  }
});

app.listen(3001, () => console.log('✅ Backend running on port 3001'));
