const { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@adiwajshing/baileys');
const Pino = require('pino');
const fs = require('fs');
const chalk = require('chalk');

global.status = 0;

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: Pino({ level: 'silent' }),
    printQRInTerminal: true,
    auth: state
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if(connection === 'close') {
      const reason = lastDisconnect?.error?.output?.statusCode;
      console.log(chalk.red('[WHATSAPP] Déconnecté :'), reason);
      startBot();
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

      if(text.toLowerCase() === 'ping') {
        await sock.sendMessage(from, { text: 'Pong ⚡' }, { quoted: msg });
      }
    } catch(err) {
      console.log(chalk.red('Erreur dans messages.upsert :'), err);
    }
  });

  global.status = 1;
  return sock;
}

startBot().catch(console.error);

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.blue('Fichier mis à jour, rechargement : ' + __filename));
  delete require.cache[file];
  require(file);
});
