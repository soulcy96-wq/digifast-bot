const puppeteer = require('puppeteer');
const axios = require('axios');

const BOT_TOKEN = process.env.BOT_TOKEN || '8491886952:AAFqAmIRXzvBZtXhEdh-1-N5wzO-hpRPNgc';
const CHAT_ID = process.env.CHAT_ID || '5136509892';

async function sendTelegramMessage(text) {
  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text,
    });
    console.log('✅ Message Telegram envoyé');
  } catch (err) {
    console.error('⚠️ Erreur Telegram:', err.message);
  }
}

async function scrape1xBet() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const page = await browser.newPage();
    await page.goto('https://1xbet.com/fr/line/football', { waitUntil: 'networkidle2' });

    // Exemple simplifié : récupérer le titre de la page
    const title = await page.title();

    // Ici, tu dois extraire les données nécessaires (matches, cotes, marchés)
    // Par exemple, récupérer des cotes dans la page — à adapter selon structure réelle

    // Simulons une détection de surebet (à remplacer par vraie détection)
    const surebetDetected = true;

    if (surebetDetected) {
      await sendTelegramMessage(`Surebet détecté sur 1xBet!\nPage titre: ${title}`);
    }

  } catch (err) {
    console.error('Erreur scraping 1xBet:', err.message);
    await sendTelegramMessage(`Erreur scraping 1xBet: ${err.message}`);
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('🚀 DigifastBot démarré');
  while (true) {
    await scrape1xBet();
    await new Promise(r => setTimeout(r, 30 * 1000)); // pause 30 secondes
  }
}

main();
