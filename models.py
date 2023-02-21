from sqlalchemy import Column, String, Integer, Boolean, DateTime, ARRAY, ForeignKey
from flask_sqlalchemy import SQLAlchemy
from flask import flash
import datetime
from datetime import datetime
from flask_migrate import Migrate
db = SQLAlchemy()

#  connect to a local postgresql database
def db_setup(app):
    app.config.from_object('config')
    db.app = app
    db.init_app(app)
    migrate = Migrate(app, db)
    return db


#Implement the category model:     
class Category(db.Model):

    __tablename__ = 'categories'
    id = db.Column(db.Integer,primary_key=True)
    category_name = db.Column(db.String, nullable=False)
    product = db.relationship('Product', backref='Category', lazy='dynamic')


    def __init__(self, category_name):
        self.category_name = category_name
      
class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String, nullable=False)
    about_product = db.Column(db.String(120),nullable=False)
    description = db.Column(db.String(120),nullable=False)
    image_name = db.Column(db.String(120),nullable=False)
    quantity = db.Column(db.String(120))
    category_id = db.Column(db.Integer, ForeignKey(Category.id), nullable=False)
    prices = db.Column(db.String(), default='')
    create_at = db.Column(db.DateTime, default= datetime.now())

    def __init__(self, product_name, about_product, description, image_name, category_id, prices,quantity):
            self.product_name = product_name
            self.about_product = about_product
            self.description = description 
            self.image_name = image_name
            self.quantity = quantity
            self.category_id = category_id
            self.prices = prices
       
    def insert(self):
        db.session.add(self)
        try:
              db.session.commit()
              flash('New Product    was successfully listed!')
        except Exception as e:
               print(e)
        
    def product_infos(self):
        return{
            'product_id' :self.product_id,
            'product_name' :self.Product.name,
            'image_name' :self.Product.image_name,   
        }           
    def update(self):
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
  
    def short(self):
        return{
            'id':self.id,
            'product_name':self.product_name,
        }

    
    def detail(self):
        return{
            'id' :self.id,
            'product_name' :self.product_name,
            'about_product' : self.about_product,
            'description' :self.description,
            'image_name' :self.image_name,
            'category_id':self.category_id,
            'prices' :self.prices,
            'quantity':self.quantity
        }
