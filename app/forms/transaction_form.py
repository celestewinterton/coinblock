from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, FloatField
from wtforms.validators import DataRequired, NumberRange
from app.models import User

class TransactionForm(FlaskForm):
    amount = FloatField('Amount', validators=[DataRequired(), NumberRange(min=1, max=25000)])
    price = FloatField('Price')
    quantity = FloatField('Quantity') # qty = $amt / $currentAssetPrice
    type = StringField('Type') # buy/sell/transfer
    credit = StringField('Credit') # buying "BTC"
    debit = StringField('Debit') # from "cash balance"
    user_id = StringField('user_id')
    crypto_id = StringField('crypto_id')
    submit = SubmitField('Submit')
