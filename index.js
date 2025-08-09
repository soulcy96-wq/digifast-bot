const TelegramBot = require('node-telegram-bot-api');

const TELEGRAM_TOKEN = '8491886952:AAFqAmIRXzvBZtXhEdh-1-N5wzO-hpRPNgc';
const TELEGRAM_CHAT_ID = '5136509892';

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: false });

async function sendTelegramMessage(text) {
  try {
    await bot.sendMessage(TELEGRAM_CHAT_ID, text, { parse_mode: 'HTML' });
    console.log('Message envoyé sur Telegram.');
  } catch (err) {
    console.error('Erreur envoi Telegram:', err.message);
  }
}

sendTelegramMessage('🤖 DigiFast Bot démarre avec succès !');
