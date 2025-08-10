from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/surebets')
def surebets():
    data = [
        {"match": "Equipe A vs Equipe B", "site1": "1xBet", "site2": "Melbet", "cote1": 2.10, "cote2": 2.00, "surebet": True},
        {"match": "Equipe C vs Equipe D", "site1": "PremierBet", "site2": "Betway", "cote1": 1.90, "cote2": 2.05, "surebet": True},
        {"match": "Equipe E vs Equipe F", "site1": "888Starz", "site2": "Malibet", "cote1": 1.80, "cote2": 1.95, "surebet": False}
    ]
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
