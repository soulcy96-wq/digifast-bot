const puppeteer = require('puppeteer');

async function scrape1xBet() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  try {
    await page.goto('https://1xbet.com/fr/line/football', { waitUntil: 'networkidle2' });

    // Attendre que la liste des matchs soit chargée
    await page.waitForSelector('.c-events__item'); // exemple de sélecteur de match, à ajuster selon site

    // Extraire les matchs
    const matches = await page.evaluate(() => {
      const data = [];
      const matchsElements = document.querySelectorAll('.c-events__item'); // à adapter si nécessaire
      matchsElements.forEach(matchEl => {
        const teams = matchEl.querySelector('.c-events__title')?.innerText.trim() || 'Match inconnu';
        const markets = [];

        // Trouver les marchés et cotes dans le match
        const marketEls = matchEl.querySelectorAll('.c-bets'); // exemple, à vérifier

        marketEls.forEach(marketEl => {
          const marketName = marketEl.querySelector('.c-bets__title')?.innerText.trim() || 'Marché inconnu';
          const odds = [];

          const oddEls = marketEl.querySelectorAll('.c-bets__button'); // boutons des cotes
          oddEls.forEach(oddEl => {
            const oddText = oddEl.innerText.trim();
            odds.push(oddText);
          });

          markets.push({ marketName, odds });
        });

        data.push({ teams, markets });
      });
      return data;
    });

    // Afficher dans la console
    for (const match of matches) {
      console.log(`Match: ${match.teams}`);
      for (const market of match.markets) {
        console.log(`  Marché: ${market.marketName} | Cotes: ${market.odds.join(' | ')}`);
      }
      console.log('-----------------------------');
    }
  } catch (err) {
    console.error('Erreur scraping 1xBet:', err);
  } finally {
    await browser.close();
  }
}

scrape1xBet();
