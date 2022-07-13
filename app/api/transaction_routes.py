from copyreg import remove_extension
from flask import Blueprint, jsonify, render_template, request
from datetime import datetime, date, timedelta
from ..models import User, Transaction, Crypto
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
  userTransactions = [txn for txn in transactions if txn.user_id == current_user.id]
  # return {'transactions': [txn.to_dict() for txn in transactions if txn.user_id == current_user.id]}

  start_date = userTransactions[0].to_dict()["created_at"].date()
  end_date = date.today() +timedelta(days=2)
  history = [{"date": start_date, "cash" : 0}]
  old_dict = {"date": start_date, "cash" : 0}

  for day in daterange(start_date, end_date):
    new_dict = old_dict
    new_dict['date'] = day
    txns = list(filter(lambda t: t.to_dict()["created_at"].date() == day, userTransactions))

    for txn in txns:
      # print(day)
      if txn.crypto_id == None:
        new_dict["cash"] = new_dict["cash"] + txn.amount

      elif str(txn.to_dict()["crypto"]["apiId"]) in new_dict:
        new_dict[str(txn.to_dict()["crypto"]["apiId"])] += txn.quantity
        new_dict["cash"] = new_dict["cash"] - txn.amount

      else:
        new_dict[str(txn.to_dict()["crypto"]["apiId"])] = txn.quantity
        new_dict["cash"] = new_dict["cash"] - txn.amount

    # print("********* HISTORY *********", history)
    history.append(new_dict.copy()) # move out of txn loop after
    old_dict = new_dict

  print("###########################################################")
  # # from datetime => timestamp
  # print(datetime.now().timestamp())

  # # from date => datetime
  # print(datetime.fromisoformat(str(start_date)), datetime.fromisoformat(str(end_date)))

  # # from timestamp => datetime
  # print(datetime.fromtimestamp(int(1605096000)))
  print("###########################################################")

  #**********************************************
  # NEW CODE

  # start_date = userTransactions[0].to_dict()["created_at"].date()
  # end_date = date.today() +timedelta(days=2)
  # history = {start_date: {"cash" : 0}}
  # old_dict = {start_date: {"cash" : 0}}

  # user_coins = User.query.get(current_user.id).to_dict()['crypto']
  # for crypto in user_coins:
  #   # getting prices array with subarrays for timestamp and price
  #   prices = cg.get_coin_market_chart_range_by_id(id=crypto,vs_currency='usd',from_timestamp=datetime.fromisoformat(str(start_date)).timestamp(),to_timestamp=datetime.fromisoformat(str(end_date)).timestamp())['prices']

  #   for timestamp in prices:
  #     day = date.fromtimestamp(int(timestamp[0]/1000))
  #     price = timestamp[1]
  #     txns = list(filter(lambda t: t.to_dict()["created_at"].date() == day, userTransactions))

  #     for txn in txns:
  #       txn_id = Crypto.query.get(txn.crypto_id)
  #       if txn_id == crypto:
  #         print("@@@@@@@@@@@@@@@@@@@@@@", txn, "@@@@@@@@@@@@@@@@@@@@@@")





        # if day in history:
        #   history[day][crypto] = 0
        # else:
        #   new_dict = old_dict
        #   new_dict['date'] = day

        # if txn.crypto_id == None:
        #   new_dict["cash"] = new_dict["cash"] + txn.amount

        # elif str(txn.to_dict()["crypto"]["apiId"]) in new_dict:
        #   new_dict[str(txn.to_dict()["crypto"]["apiId"])] += txn.quantity
        #   new_dict["cash"] = new_dict["cash"] - txn.amount

        # else:
        #   new_dict[str(txn.to_dict()["crypto"]["apiId"])] = txn.quantity
        #   new_dict["cash"] = new_dict["cash"] - txn.amount


      # # print("********* HISTORY *********", history)
      # history.append(new_dict.copy()) # move out of txn loop after
      # old_dict = new_dict


  #**********************************************

  return {'transactions': [day for day in history]}
    # print("DATE", day, userTransactions[day].to_dict(), date.today(), date(created))
  # transactions = Transaction.query.with_entities(func.sum(Transaction.quantity), Transaction.crypto_id).filter(user_id = current_user.id).group_by(Transaction.crypto_id).all()
  # print("===================>", transactions[0])
  # cg.get_coin_history_by_id()
  # cg.get_coin_market_chart_by_id()
  # [txn.to_dict() for txn in transactions if txn.user_id == current_user.id]

  # return {'transactions': [txn.to_dict() for txn in userTransactions]}






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
