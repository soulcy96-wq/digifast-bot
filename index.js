// index.js
const axios = require('axios');
const cheerio = require('cheerio');
const TelegramBot = require('telegram-bot-api');
const schedule = require('node-schedule');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const FormData = require('form-data');
const pLimit = require('p-limit');
const UserAgent = require('user-agents');

const TELEGRAM_TOKEN = '8491886952:AAFqAmIRXzvBZtXhEdh-1-N5wzO-hpRPNgc';
const TELEGRAM_CHAT_ID = '5136509892';

const api = new TelegramBot({
  token: TELEGRAM_TOKEN,
  updates: {
    enabled: false
  }
});

const LIMIT_CONCURRENT_REQUESTS = 5;
const limit = pLimit(LIMIT_CONCURRENT_REQUESTS);

const sites = [
  // mêmes sites et parseOdds à compléter...
];

// Le reste du code identique...

// Fonction pour récupérer le HTML d’un site
async function fetchSiteHtml(url) {
  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': new UserAgent().toString() }
    });
    return response.data;
  } catch (err) {
    console.error(`Erreur fetching ${url} :`, err.message);
    return null;
  }
}

// Fonction pour détecter surebets parmi les cotes récupérées
function detectSurebets(oddsArrays) {
  // TODO : algorithme de détection surebet multi-sites et multi-marchés
  return [];
}

// Fonction pour envoyer un message Telegram
async function sendTelegramMessage(text) {
  try {
    await api.sendMessage({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML'
    });
    console.log('Message Telegram envoyé.');
  } catch (err) {
    console.error('Erreur envoi Telegram:', err.message);
  }
}

// Planification toutes les 5 minutes
schedule.scheduleJob('*/5 * * * *', async () => {
  console.log('Début scan surebets à', new Date().toLocaleTimeString());

  const allOdds = [];

  const promises = sites.map(site => limit(async () => {
    const html = await fetchSiteHtml(site.url);
    if (!html) return;

    const odds = await site.parseOdds(html);
    if (odds && odds.length > 0) {
      allOdds.push({ site: site.name, odds });
    }
  }));

  await Promise.all(promises);

  const surebets = detectSurebets(allOdds);

  if (surebets.length === 0) {
    console.log('Aucun surebet détecté cette fois.');
  } else {
    for (const surebet of surebets) {
      const message = `<b>Surebet détecté sur ${surebet.match}</b>\n` +
                      `Sites: ${surebet.sites.join(', ')}\n` +
                      `Cotes: ${surebet.odds.join(', ')}\n` +
                      `Gain potentiel: ${surebet.profit.toFixed(2)} %`;
      await sendTelegramMessage(message);
    }
  }
});
