from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
import os
from flask_migrate import Migrate
db = SQLAlchemy()



# TODO: connect to a local postgresql database
def db_setup(app):
   #Connexion à la base de donnees
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL') # récupère l'URL de connexion à partir des variables d'environnement
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # désactive le suivi des modifications pour améliorer les performances
    db.app = app
    db.init_app(app)
    migrate = Migrate(app, db)
    return db
#ZONE POUR LE MODELE DE DONNEE
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    role = db.Column(db.String(10), nullable=False)
    subscription = db.relationship('Subscription', backref='user', uselist=False)
    products = db.relationship('Product', backref='user', lazy=True)

class Subscription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    start_date = db.Column(db.DateTime, default=datetime.utcnow)
    end_date = db.Column(db.DateTime)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    buyers = db.relationship('Buyer', secondary='orders', backref='products')

orders = db.Table('orders',
    db.Column('buyer_id', db.Integer, db.ForeignKey('buyer.id'), primary_key=True),
    db.Column('product_id', db.Integer, db.ForeignKey('product.id'), primary_key=True),
    db.Column('order_date', db.DateTime, default=datetime.utcnow, nullable=False)
)

class Buyer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    orders = db.relationship('Product', secondary='orders', backref='buyers')
