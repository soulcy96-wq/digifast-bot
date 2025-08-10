import time
import requests

BOT_TOKEN = "8491886952:AAFqAmIRXzvBZtXhEdh-1-N5wzO-hpRPNgc"
CHAT_ID = "5136509892"

def send_telegram_message(text):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": CHAT_ID,
        "text": text
    }
    try:
        response = requests.post(url, data=payload)
        if response.status_code == 200:
            print("Message envoyé sur Telegram.")
        else:
            print(f"Erreur Telegram: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Exception lors de l'envoi Telegram: {e}")

def scrape_task():
    # Ici tu mets ton code de scraping
    # Par exemple, une simple démo qui envoie un message
    send_telegram_message("Digifast bot: Tâche de scraping exécutée avec succès.")

def main():
    send_telegram_message("🚀 Digifast bot démarré et en fonctionnement.")
    print("Bot démarré, boucle infinie active.")
    while True:
        try:
            scrape_task()
        except Exception as e:
            print(f"Erreur dans la tâche de scraping : {e}")
            send_telegram_message(f"Erreur dans la tâche de scraping : {e}")
        time.sleep(300)  # pause de 5 minutes

if __name__ == "__main__":
    main()
