const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route pour générer un code pairing fixe (8 caractères)
app.get('/api/code', (req, res) => {
  // Code pairing fixe : MANZMODS
  const code = 'MANZMODS';
  res.json({ code });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur KILLUA en ligne sur le port ${PORT}`);
});
