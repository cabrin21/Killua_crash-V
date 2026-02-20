const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir le frontend
app.use(express.static(path.join(__dirname, 'public')));

// API pour générer le code
app.get('/api/code', (req, res) => {
  const code = '243-KILLUA-' + Math.floor(Math.random() * 900 + 100);
  res.json({ code });
});

// Rediriger toutes les autres requêtes vers index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
