from flask import Flask,render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_moment import Moment
from functools import wraps
from authlib.integrations.flask_client import OAuth
import os
from dotenv import load_dotenv
from models import*
# charge le fichier .env dans les variables d'environnement
load_dotenv() 
app = Flask(__name__)
moment = Moment(app)

#Gestion de l'authentification grace à Auth0
app.config['SECRET_KEY'] = os.urandom(32)
app.config['AUTH0_CLIENT_ID'] = os.getenv('AUTH0_CLIENT_ID')
app.config['AUTH0_CLIENT_SECRET'] = os.getenv('AUTH0_CLIENT_SECRET')
app.config['AUTH0_DOMAIN'] = os.getenv('AUTH0_DOMAIN')
app.config['AUTH0_CALLBACK_URL'] = os.getenv('AUTH0_CALLBACK_URL')
app.config['AUTH0_AUDIENCE'] = os.getenv('AUTH0_AUDIENCE')
db = db_setup(app)
# db.create_all()
oauth = OAuth(app)

auth0 = oauth.register(
    'auth0',
    client_id=app.config['AUTH0_CLIENT_ID'],
    client_secret=app.config['AUTH0_CLIENT_SECRET'],
    api_base_url=f'https://{app.config["AUTH0_DOMAIN"]}',
    access_token_url=f'https://{app.config["AUTH0_DOMAIN"]}/oauth/token',
    authorize_url=f'https://{app.config["AUTH0_DOMAIN"]}/authorize',
    client_kwargs={
        'scope': 'openid profile email',
    },
)


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth0_url = f'https://{app.config["AUTH0_DOMAIN"]}/authorize'
        token = None

        # Check for access token in request headers
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(' ')[1]
        else:
            return jsonify({'message': 'No authorization header provided.'}), 401

        # Validate access token
        try:
            payload = auth0.api_base.get('userinfo', token=token).json()
        except:
            return jsonify({'message': 'Invalid authorization token.'}), 401

        # Check for valid user role
        if 'role' in payload and payload['role'] == 'seller':
            return f(*args, **kwargs)
        else:
            return jsonify({'message': 'Insufficient permissions.'}), 403

    return decorated

@app.route('/login')
def login():
    return auth0.authorize_redirect(redirect_uri=app.config['AUTH0_CALLBACK_URL'])

@app.route('/callback')
def callback_handling():
    auth0.authorize_access_token()
    # resp = auth0.get('userinfo')
    # userinfo = resp.json()
    print("utilisateur authentifié Avec success")
    # return jsonify(userinfo)

@app.route('/protected')
@requires_auth
def protected_route():
    return jsonify({'message': 'You are authorized to access this resource.'})



@app.route('/', methods=['GET'])
def home():

  return render_template('pages/index.html')

if __name__ == '__main__':
    app.run(debug=True)




