from copyreg import remove_extension
from flask import Blueprint, jsonify, render_template, request
from datetime import datetime

from app.utils.form_validation_errors import form_validation_errors
from ..models import User, Transaction
from ..models.db import db
from ..forms import TransactionForm
from flask_login import current_user
from ..utils import form_validation_errors

transaction_routes = Blueprint('channels', __name__)

@transaction_routes.route('')
def get_user_transactions():
  transactions = Transaction.query.all()
  return {'channels': [txn.to_dict() for txn in transactions]}


@transaction_routes.route('' , methods=['POST'])
def post_transaction():
  form = TransactionForm()
  params = {
    'amount': form.data['amount'],
  }
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    transaction = Transaction(**params)
    transaction.users.append(current_user)
    db.session.add(transaction)
    db.session.commit()
    return transaction.to_dict()
  return {'errors': form_validation_errors(form.errors)}, 401



@transaction_routes.route('/<int:id>',methods=['PUT'])
def edit_transaction(id):
  form = TransactionForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    transaction = Transaction.query.get(id)
    # transaction.name = form.data['amount']
    # transaction.topic = form.data['type']
    db.session.commit()
    return transaction.to_dict()
  return {'errors': form_validation_errors(form.errors)}, 401



@transaction_routes.route('/<int:id>',methods=['DELETE'])
def delete_transaction(id):
  remove_transaction = Transaction.query.get(id)
  db.session.delete(remove_transaction)
  db.session.commit()
  return {'id': id}
