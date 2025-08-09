const puppeteer = require('puppeteer');
const axios = require('axios');

const BOT_TOKEN = 8491886952:AAFqAmIRXzvBZtXhEdh-1-N5wzO-hpRPNgc;
const CHAT_ID = 5136509892;

async function sendTelegramMessage(text) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  await axios.post(url, {
    chat_id: CHAT_ID,
    text,
  });
}

async function main() {
  while (true) {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();
      await page.goto('https://1xbet.com/fr/line/football', { waitUntil: 'networkidle2' });
      const title = await page.title();
      await sendTelegramMessage(`Page title is: ${title}`);
      await browser.close();
    } catch (error) {
      console.error('Erreur:', error);
      await sendTelegramMessage(`Erreur: ${error.message}`);
    }
    // Attente 5 minutes avant de recommencer
    await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000));
  }
}

main();
