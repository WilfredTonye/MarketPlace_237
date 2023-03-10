#----------------------------------------------------------------------------#
# Imports
#----------------------------------------------------------------------------#

from ast import dump
from ast import dumps
import json
import dateutil.parser
import babel
from flask import Flask, render_template, request, Response, flash, redirect, url_for
from flask_moment import Moment
from flask_sqlalchemy import SQLAlchemy
import logging
from models import*
from flask_migrate import Migrate
from logging import Formatter, FileHandler
from flask_wtf import FlaskForm
import sys
from forms import *
from flask_uploads.flask_uploads import configure_uploads, IMAGES, UploadSet
#from flask_uploads import configure_uploads, IMAGES, UploadSet
from sqlalchemy import Table, Text
from sqlalchemy.exc import SQLAlchemyError
#----------------------------------------------------------------------------#
# App Config.
#----------------------------------------------------------------------------#

app = Flask(__name__)
moment = Moment(app)
app.config.from_object('config')
db = db_setup(app)

app.config['UPLOADED_IMAGES_DEST'] = 'static/uploads/images'

images = UploadSet('images', IMAGES)
configure_uploads(app, images)




#  implement any missing fields, as a database migration using Flask-Migrate
    
      
 
#db.create_all()
   
def format_datetime(value, format='medium'):
  date = dateutil.parser.parse(value)
  if format == 'full':
      format="EEEE MMMM, d, y 'at' h:mma"
  elif format == 'medium':
      format="EE MM, dd, y h:mma"
  return babel.dates.format_datetime(date, format, locale='en')

app.jinja_env.filters['datetime'] = format_datetime

#----------------------------------------------------------------------------#
# Controllers.
#----------------------------------------------------------------------------#

# @app.route('/')
# def index():
#   currentArtist = Artist.query.order_by(Artist.create_at.desc()).limit(10).all();
#   return render_template('pages/home.html',data=currentArtist)


#recherche product

@app.route('/product/search', methods=['POST', 'GET'])
def search_products():
  # TODO: implement search on artists with partial string search. Ensure it is case-insensitive.
  # seach for "A" should return "Guns N Petals", "Matt Quevado", and "The Wild Sax Band".
  # search for "band" should return "The Wild Sax Band".
    product_regard = Product.query.filter(Product.product_name.ilike('%' + request.form['search_term'] + '%')).filter(Product.category_id == 1).all()
    product_regar = Product.query.filter(Product.product_name.ilike('%' + request.form['search_term'] + '%')).filter(Product.category_id == 2).all()
    product_rega = Product.query.filter(Product.product_name.ilike('%' + request.form['search_term'] + '%')).filter(Product.category_id == 3).all()
    return render_template('pages/Search.html',products=product_regard,productss=product_regar,productsss=product_rega)
    # return render_template('pages/Search.html', results=response, search_term=request.form.get('search_term', ''))

       #home
@app.route('/', methods=['GET'])
def home():

  return render_template('pages/index.html')

    #admin filtre
@app.route('/admin/filter', methods=['POST', 'GET'])
def admin_search_products():
  data=Product.query.all()
  taille=len(data);
  return render_template('pages/AdminFilter.html', products=data, total = taille)
    # return render_template('pages/AdminFilter.html', results=response, search_term=request.form.get('search_term', ''))

#Create product
@app.route('/products/create', methods=['GET'])
def create_product_form():
  category = Category.query.all()
  form = ProductForm(obj=category)
  form.category_id.choices = [(c.id, c.category_name) for c in Category.query.order_by('id')]
 
  return render_template('forms/add_product.html',form=form)
#Submition product

@app.route('/products/create', methods=['POST'])
def create_product_submission():
 
    form = ProductForm()
    form.category_id.choices = [(c.id, c.category_name) for c in Category.query.order_by('id')]
    filename = images.save(form.image_name.data)
    c =request.form.getlist('category_id')
    taille=len(c)
    try: 
      category_index = 0
      while category_index < taille: 
        # print(list[i]) 
        
        new_product=Product(
                product_name = request.form['product_name'],
                about_product = request.form['about_product'],
                description = request.form['description'],
                image_name = filename,
                quantity = request.form['quantity'],
                category_id =int(request.form.getlist('category_id')[category_index]),
                prices = request.form['prices'],
              )
        category_index +=1    
        Product.insert(new_product)
    except SQLAlchemyError as e:
          flash('An error occurred. when persisting Product ' + request.form['product_name'] + ' could not be listed.')
    return redirect(url_for('getproduct'))


#DELETE PRODUCT TO DATABASE
@app.route('/delete/product/<int:product_id>', methods=['DELETE','GET'])
def delete_product(product_id):
  
  try:
    Product.query.filter_by(id=product_id).delete()
    
    db.session.commit()
    flash('Record Product Delete sucessfuly')
  except:
    db.session.rollback() 
    flash('Cannot Delete Record Because they are already linked to an Category ')
  finally:
    db.session.close()
    return redirect(url_for('getproduct'))
#EDIT PRODUCT  TO DATABASE
@app.route('/products/<int:product_id>/edit', methods=['GET'])
def edit_product(product_id):
  category = Category.query.all()
  form = ProductForm(obj=category)
  form.category_id.choices = [(c.id, c.category_name) for c in Category.query.order_by('id')]
  product_getdataByid = Product.query.get(product_id)
  if product_getdataByid:
    product_infos = Product.detail(product_getdataByid)
    form.product_name.data = product_infos["product_name"]
    form.about_product.data = product_infos["about_product"]
    form.description.data = product_infos["description"]
    # form.image_name.data = product_infos["image_name"]    
    form.quantity.data = product_infos["quantity"]
    form.prices.data = product_infos["prices"]
    return render_template('forms/edit_product.html', form=form, product=product_infos)
  return render_template('errors/404.html')

@app.route('/products/<int:product_id>/edit', methods=['POST'])
def edit_product_submission(product_id):
  # TODO: take values from the form submitted, and update existing
  
    category = Category.query.all()
    form = ProductForm(request.form,obj=category)
    form_1=ProductForm()
    form.category_id.choices = [(c.id, c.category_name) for c in Category.query.order_by('id')]
    product_getdataByid = Product.query.get(product_id)
    if product_getdataByid:
        
        filename = images.save(form_1.image_name.data)
        setattr(product_getdataByid, 'product_name', request.form['product_name'])
        setattr(product_getdataByid, 'about_product', request.form['about_product'])
        setattr(product_getdataByid, 'description', request.form['description'])
        setattr(product_getdataByid, 'image_name', filename)
        setattr(product_getdataByid, 'quantity', request.form['quantity'])
        setattr(product_getdataByid, 'category_id', request.form['category_id'])
        setattr(product_getdataByid, 'prices', request.form['prices'])
        Product.update(product_getdataByid)
        #Upload Sucess message
        # print('sucess')
      
    return redirect(url_for('getproduct'))

#Show All Product To Admin    
@app.route('/admin/products')
def getproduct():
  data=Product.query.all()
  taille=len(data);
  return render_template('pages/Admin.html', products=data, total = taille)

#Get Product By category
@app.route('/products/category/<int:category_id>')
def getproduct_category(category_id):
  product_query = Product.query.options(db.joinedload(Product.Category)).filter(Product.category_id == 1).all()
  product_quer = Product.query.options(db.joinedload(Product.Category)).filter(Product.category_id == 2).all()
  product_que = Product.query.options(db.joinedload(Product.Category)).filter(Product.category_id == 3).all()
  taille = len(product_query)
  return render_template('pages/Category.html',products=product_query,taille=taille, productss = product_quer,productsss= product_que)


if not app.debug:
    file_handler = FileHandler('error.log')
    file_handler.setFormatter(
        Formatter('%(asctime)s %(levelproduct_name)s: %(message)s [in %(pathproduct_name)s:%(lineno)d]')
    )
    app.logger.setLevel(logging.INFO)
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
    app.logger.info('errors')









