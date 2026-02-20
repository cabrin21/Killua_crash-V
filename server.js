const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir les fichiers statiques depuis "public/"
app.use(express.static(path.join(__dirname, 'public')));

// Route pour générer un code pairing de 8 caractères
app.get('/api/code', (req, res) => {
  // Exemple : code pairing 8 caractères alphanumériques
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '243-'; // Préfixe fixe
  for (let i = 0; i < 5; i++) {   // 5 caractères aléatoires pour obtenir 8 au total avec "243"
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  res.json({ code }); // Retour JSON : { code: '243-ABCDE' }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur KILLUA en ligne sur le port ${PORT}`);
});
