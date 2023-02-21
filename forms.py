from datetime import datetime
from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SelectMultipleField, DateTimeField, BooleanField, FileField;
from wtforms.validators import DataRequired, AnyOf, URL



class ProductForm(FlaskForm): 
    product_name = StringField(
        'product_name', validators=[DataRequired()]
    )
    about_product = StringField(
        'about_product', validators=[DataRequired()]
    )
    description = StringField(
        'description', validators=[DataRequired()]
    )
    image_name   = FileField(u'image_name', validators=[DataRequired()])
    quantity = StringField(
        'quantity'
    )
    category_id = SelectMultipleField(u'category_id', coerce=int,validators=[DataRequired()],
    )
    prices = StringField(
            'prices'
        )
  

# CHANGE THIS  TO THE FOLDER TO UPLOAD
  