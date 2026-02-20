const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route pour générer le code décoratif à 8 chiffres
app.get('/api/code', (req, res) => {
  const letters = Array.from({length:3}, () => String.fromCharCode(65 + Math.floor(Math.random()*26))).join('');
  const numbers = Math.floor(10000000 + Math.random() * 90000000); // 8 chiffres
  const code = `243-${letters}-${numbers}`;
  res.json({ code });
});

app.listen(PORT, () => {
  console.log(`Serveur KILLUA en ligne sur le port ${PORT}`);
});
