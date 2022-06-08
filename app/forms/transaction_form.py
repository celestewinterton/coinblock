from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import User


class TransactionForm(FlaskForm):
    amount = IntegerField('Amount', validators=[DataRequired()])
    price = StringField('Password')
    quantity = StringField('Password') # qty = $amt / $currentAssetPrice
    type = StringField('Password') # buy/sell/transfer
    credit = StringField('Password') # buying "BTC"
    debit = StringField('Password') # from "cash balance"
