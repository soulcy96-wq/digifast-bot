const puppeteer = require('puppeteer');
const axios = require('axios');

const BOT_TOKEN = "8491886952:AAFqAmIRXzvBZtXhEdh-1-N5wzO-hpRPNgc";
const CHAT_ID = "5136509892";

async function sendTelegramMessage(text) {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await axios.post(url, {
      chat_id: CHAT_ID,
      text,
    });
    console.log('Message envoyé sur Telegram.');
  } catch (error) {
    console.error('Erreur lors de l’envoi Telegram :', error.message);
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
    const title = await page.title();
    console.log(`Titre de la page : ${title}`);
    await sendTelegramMessage(`Titre de la page 1xBet : ${title}`);
  } catch (error) {
    console.error('Erreur lors du scraping :', error.message);
    await sendTelegramMessage(`Erreur scraping : ${error.message}`);
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('🚀 Script démarre...');
  while (true) {
    console.log('📅 Nouvelle itération de scraping...');
    await scrape1xBet();
    console.log('⏳ Pause de 5 minutes avant la prochaine exécution...');
    await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000)); // 5 minutes
  }
}

main().catch(err => {
  console.error('❌ Erreur fatale dans main :', err);
  process.exit(1);
});
