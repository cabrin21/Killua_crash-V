// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@adiwajshing/baileys');
const Pino = require('pino');
const fs = require('fs');
const chalk = require('chalk');
const fetch = require('node-fetch'); // npm i node-fetch@2

// --------------------- EXPRESS ---------------------
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route pour générer un code pairing 243-XXXXX
app.get('/api/code', (req, res) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '243-';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  res.json({ code });
});

app.listen(PORT, () => {
  console.log(chalk.green(`[EXPRESS] Serveur en ligne sur le port ${PORT}`));
});

// --------------------- WHATSAPP BOT ---------------------
global.status = 0;

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: Pino({ level: 'silent' }),
    printQRInTerminal: true, // Scanner QR code la première fois
    auth: state
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if(connection === 'close') {
      const reason = lastDisconnect?.error?.output?.statusCode;
      console.log(chalk.red('[WHATSAPP] Déconnecté :'), reason);
      startBot(); // reconnect automatique
    } else if(connection === 'open') {
      console.log(chalk.green('✅ Connecté à WhatsApp avec session sauvegardée'));
    }
  });

  sock.ev.on('messages.upsert', async (m) => {
    try {
      let msg = m.messages[0];
      if(!msg.message) return;

      const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
      const from = msg.key.remoteJid;

      // Commande ping
      if(text.toLowerCase() === 'ping') {
        await sock.sendMessage(from, { text: 'Pong ⚡' }, { quoted: msg });
      }

      // Commande !code -> récupère depuis le serveur Express
      if(text.toLowerCase() === '!code') {
        try {
          const res = await fetch(`http://localhost:${PORT}/api/code`);
          if(!res.ok) throw new Error('Erreur serveur Express');
          const data = await res.json();
          const code = data.code || 'Erreur';
          await sock.sendMessage(from, { text: `⚡ CODE KILLUA : ${code}` }, { quoted: msg });
        } catch(err) {
          console.log(chalk.red('Erreur fetch code pairing :'), err);
          await sock.sendMessage(from, { text: '❌ Impossible de récupérer le code' }, { quoted: msg });
        }
      }

    } catch(err) {
      console.log(chalk.red('Erreur messages.upsert :'), err);
    }
  });

  global.status = 1;
  return sock;
}

startBot().catch(console.error);

// Hot reload du bot
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.blue('Fichier mis à jour, rechargement : ' + __filename));
  delete require.cache[file];
  require(file);
});
