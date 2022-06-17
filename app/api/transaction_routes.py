from copyreg import remove_extension
from flask import Blueprint, jsonify, render_template, request
from datetime import datetime, date
from ..models import User, Transaction, Crypto
from ..models.db import db
from ..forms import TransactionForm
from flask_login import current_user
from ..utils import form_validation_errors

from sqlalchemy.sql import func
from pycoingecko import CoinGeckoAPI
cg = CoinGeckoAPI()

transaction_routes = Blueprint('transactions', __name__)

@transaction_routes.route('')
def get_user_transactions():
  # transactions = Transaction.query.all()
  # return {'transactions': [txn.to_dict() for txn in transactions if txn.user_id == current_user.id]}

  transactions = Transaction.query.with_entities(func.sum(Transaction.quantity), Transaction.crypto_id).filter(user_id = current_user.id).group_by(Transaction.crypto_id).all()
  print("===================>",transactions[0])

  # print("===================>",transactions, start_date, datetime.date(start_date), datetime.datetime(start_date))
  # for day in transactions[len(transactions)-1]
  # portfolio = Transaction.query.with_entities(func.sum(Transaction.quantity), Transaction.crypto_id).filter_by(user_id = id).group_by(Transaction.crypto_id).all()
  # userTransactions = [txn.to_dict() for txn in transactions if txn.user_id == current_user.id]

  # new_dict = {'cash': []}
  # for txn in userTransactions:
  #   if str(txn.crypto_id) == 'None':
  #     new_dict['cash'].append(txn)
  #   elif str(Crypto.query.get(txn.crypto_id).symbol) in new_dict:
  #     new_dict[str(Crypto.query.get(txn.crypto_id).symbol)].append(txn)
  #   else:
  #     new_dict.update({str(Crypto.query.get(txn.crypto_id).symbol): [txn]})

  # return { 'transactions': new_dict }




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
