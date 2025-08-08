from telegram.ext import Updater, CommandHandler

TOKEN = "TON_TOKEN_ICI"
CHAT_ID = 5136509892  # Ton chat ID personnel

def start(update, context):
    update.message.reply_text("Bonjour ! Le bot est actif.")

def main():
    updater = Updater(TOKEN, use_context=True)
    dp = updater.dispatcher
    dp.add_handler(CommandHandler("start", start))
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
