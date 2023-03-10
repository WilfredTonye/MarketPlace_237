from flask import Flask,render_template
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv

load_dotenv() # charge le fichier .env dans les variables d'environnement

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL') # récupère l'URL de connexion à partir des variables d'environnement
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # désactive le suivi des modifications pour améliorer les performances
db = SQLAlchemy(app)

from models import*

@app.route('/', methods=['GET'])
def home():

  return render_template('pages/index.html')

if __name__ == '__main__':
    app.run(debug=True)




