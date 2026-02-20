const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Route pour générer/valider le code
app.post('/api/code', (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Aucun code fourni !' });
  }

  // Exemple de logique : si le code commence par 243, succès
  if (code.startsWith('243')) {
    return res.json({ message: `⚡ CODE VALIDE : ${code}` });
  } else {
    return res.json({ message: `❌ CODE INVALIDE : ${code}` });
  }
});

// Route test
app.get('/', (req, res) => res.send('Server Killua actif ⚡'));

app.listen(PORT, () => {
  console.log(`Server démarré sur http://localhost:${PORT}`);
});
