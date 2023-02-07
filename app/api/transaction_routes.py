from copyreg import remove_extension
from flask import Blueprint, jsonify, render_template, request
from datetime import datetime, date, timedelta
from ..models import Transaction
from ..models.db import db
from ..forms import TransactionForm
from flask_login import current_user
from ..utils import form_validation_errors

from sqlalchemy.sql import func
from pycoingecko import CoinGeckoAPI
cg = CoinGeckoAPI()

transaction_routes = Blueprint('transactions', __name__)


def daterange(start_date, end_date):
  for n in range(int((end_date - start_date).days)):
    yield start_date + timedelta(n)

@transaction_routes.route('')
def get_user_transactions():
  transactions = Transaction.query.all()
  crypto = current_user.to_dict()["crypto"]
  userTransactions = [txn for txn in transactions if txn.user_id == current_user.id]



# ********************* Moving user balance logic to backend with coingecko *********************

  # Creating a store of price data for user crypto
  price_data = {} # {'bitcoin': {'12-10-2022': 22145, '12-11-2022': 22343}}}
  today = date.today().strftime('%Y-%m-%d')

  for asset in crypto:
    if asset != "cash":
      if asset not in price_data or today not in price_data[asset]:
        api_data = cg.get_coin_market_chart_by_id(id=asset, vs_currency="usd", days=90)["prices"]
        print("Called API for chart...")

        for entry in api_data:
          ts, price = entry
          readable_date = datetime.utcfromtimestamp(ts/1000).strftime('%Y-%m-%d')
          # readable_date = datetime.utcfromtimestamp(ts/1000).strftime('%Y-%m-%d %H:%M:%S')

          if asset not in price_data:
            price_data[asset] = {}
          if readable_date not in price_data[asset]:
            price_data[asset][readable_date] = price


# **************************** Crypto asset qty over time ****************************
  start_date = userTransactions[0].to_dict()["created_at"].date()
  end_date = date.today() +timedelta(days=1)
  history = [{"date": start_date, "cash" : 0}]
  old_dict = {"date": start_date, "cash" : 0}

  for day in daterange(start_date, end_date):
    new_dict = old_dict
    new_dict['date'] = day
    txns = list(filter(lambda t: t.to_dict()["created_at"].date() == day, userTransactions))

    for txn in txns:
      if txn.crypto_id == None:
        new_dict["cash"] += txn.amount

      elif str(txn.to_dict()["crypto"]["apiId"]) in new_dict:
        new_dict[str(txn.to_dict()["crypto"]["apiId"])] += txn.quantity
        new_dict["cash"] -= txn.amount

      else:
        new_dict[str(txn.to_dict()["crypto"]["apiId"])] = txn.quantity
        new_dict["cash"] -= txn.amount

    history.append(new_dict.copy())
    old_dict = new_dict

# ************************ Crypto asset market value over time ************************

  market_value = [{"date": start_date, "cash" : 0, "total": 0}]
  prev = {"date": start_date, "cash" : 0, "total": 0}

  for qty in history:
    day_converted = qty["date"].strftime('%Y-%m-%d')
    new_dict = prev
    new_dict['date'] = qty["date"].strftime('%b %d, %Y')
    new_dict["total"] = qty["cash"]

    for asset in qty:
      if asset != "date" and asset != "cash":
        new_dict[asset] = qty[asset] * price_data[asset][day_converted]
        new_dict["total"] += qty[asset] * price_data[asset][day_converted]

      if asset == "cash":
        new_dict["cash"] = qty[asset]

    market_value.append(new_dict.copy())
    prev = new_dict


  return {'transactions': {'qty': [day for day in history], 'value': [day for day in market_value], 'chart_data': [{"date": day["date"], "value": day["total"]} for day in market_value]}}




@transaction_routes.route('' , methods=['POST'])
def post_transaction():
  form = TransactionForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  params = {
    'type': form.data['type'],
    'quantity': form.data['quantity'],
    'credit': form.data['credit'],
    'debit': form.data['debit'],
    'user_id': form.data['user_id'],
  }

  if form.data['type'] == "sell":
    params['amount'] = -(form.data['amount']),
  else:
    params['amount'] = form.data['amount'],

  if form.data['crypto_id']:
    params['crypto_id'] = form.data['crypto_id']
    params['price'] = form.data['price']

  def validate_user_funds():
    return (form.data['type'] == "buy" or form.data['type'] == "sell") and form.data['limit'] - form.data['amount'] < 0

  if form.validate_on_submit():
    if validate_user_funds():
      return {"errors": {"amount": "Please enter an amount less than or equal to to your cash/crypto balance"}}, 401
    else:
      transaction = Transaction(**params)
      db.session.add(transaction)
      db.session.commit()
      return transaction.to_dict()
  return {'errors': form_validation_errors(form.errors)}, 401



# @transaction_routes.route('/<int:id>',methods=['PUT'])
# def edit_transaction(id):
#   form = TransactionForm()
#   form['csrf_token'].data = request.cookies['csrf_token']
#   if form.validate_on_submit():
#     transaction = Transaction.query.get(id)
#     # transaction.name = form.data['amount']
#     # transaction.topic = form.data['type']
#     db.session.commit()
#     return transaction.to_dict()
#   return {'errors': form_validation_errors(form.errors)}, 401



# @transaction_routes.route('/<int:id>',methods=['DELETE'])
# def delete_transaction(id):
#   remove_transaction = Transaction.query.get(id)
#   db.session.delete(remove_transaction)
#   db.session.commit()
#   return {'id': id}
