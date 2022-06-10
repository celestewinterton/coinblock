from .db import db
from datetime import datetime
import simplejson as json

class Transaction(db.Model):
  __tablename__ = 'transactions'

  id = db.Column(db.Integer, primary_key=True)
  amount = db.Column(db.Float)
  price = db.Column(db.Float)
  quantity = db.Column(db.Float)
  credit = db.Column(db.String(50))
  debit = db.Column(db.String(50))
  type = db.Column(db.String(50))
  status = db.Column(db.String(50), default="Completed")

  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  user = db.relationship("User", back_populates='transactions')

  crypto_id = db.Column(db.Integer, db.ForeignKey("crypto.id"))
  crypto = db.relationship("Crypto", back_populates='transactions')

  created_at = db.Column(db.DateTime(timezone=True), default=datetime.now())


  def to_dict(self):
    return {
      'id': self.id,
      'amount': json.dumps(self.amount, use_decimal=True),
      'price': json.dumps(self.price, use_decimal=True),
      'quantity': json.dumps(self.quantity, use_decimal=True),
      'type': self.type,
      'credit': self.credit,
      'debit': self.debit,
      'status': self.status,
      'user_id': self.user_id,
      # 'crypto': [coin.to_dict() for coin in self.crypto],
      'crypto_id': self.crypto_id,
      'created_at': self.created_at
    }
