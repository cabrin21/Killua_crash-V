const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir le frontend
app.use(express.static(path.join(__dirname, 'public')));

// API pour générer le code à 8 chiffres
app.get('/api/code', (req, res) => {
  const code = Math.floor(10000000 + Math.random() * 90000000); // 8 chiffres
  res.json({ code: code.toString() });
});

// Rediriger toutes les autres requêtes vers index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
