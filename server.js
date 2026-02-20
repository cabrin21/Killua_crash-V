// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route pour générer un code dynamique
app.get('/api/code', (req, res) => {
  // Exemple : 243-ABC-XYZ (3 lettres aléatoires + 3 chiffres)
  const letters = Array.from({length:3}, () => String.fromCharCode(65 + Math.floor(Math.random()*26))).join('');
  const numbers = Math.floor(100 + Math.random() * 900);
  const code = `243-${letters}-${numbers}`;
  res.json({ code });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur KILLUA en ligne sur le port ${PORT}`);
});
