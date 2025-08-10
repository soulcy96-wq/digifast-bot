from flask import Flask, jsonify
from flask_cors import CORS
import threading
import time

app = Flask(__name__)
CORS(app)

surebets_data = [
    {"match": "Equipe A vs Equipe B", "site1": "1xBet", "site2": "Melbet", "cote1": 2.10, "cote2": 2.00, "surebet": True},
    {"match": "Equipe C vs Equipe D", "site1": "PremierBet", "site2": "Betway", "cote1": 1.90, "cote2": 2.05, "surebet": True},
    {"match": "Equipe E vs Equipe F", "site1": "888Starz", "site2": "Malibet", "cote1": 1.80, "cote2": 1.95, "surebet": False}
]

def update_surebets_periodically():
    while True:
        # Ici tu mettras la fonction de scraping/détection automatique des surebets réels
        # Pour l'instant, on ne modifie rien (simulation)
        time.sleep(60)  # Mise à jour toutes les 60 secondes

# Démarrer le thread en arrière-plan
threading.Thread(target=update_surebets_periodically, daemon=True).start()

@app.route('/surebets')
def surebets():
    return jsonify(surebets_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
