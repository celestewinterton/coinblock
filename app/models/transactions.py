from .db import db
from datetime import datetime

class Transaction(db.Model):
  __tablename__ = 'transactions'

  id = db.Column(db.Integer, primary_key=True)
  price = db.Column(db.Integer)
  quantity = db.Column(db.Integer)
  type = db.Column(db.String(100))
  credit = db.Column(db.String(255))
  debit = db.Column(db.String(255))
  status = db.Column(db.String(50))

  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  user = db.relationship("User", back_populates='transactions')

  crypto_id = db.Column(db.Integer, db.ForeignKey("crypto.id"))
  crypto = db.relationship("Crypto", back_populates='crypto')

  created_at = db.Column(db.DateTime(timezone=True), default=datetime.now())


  def to_dict(self):
    return {
      'id': self.id,
      'price': self.price,
      'quantity': self.quantity,
      'type': self.type,
      'credit': self.credit,
      'debit': self.debit,
      'status': self.status,
      'user_id': self.user_id,
      'crypto_id': self.crypto_id,
      'created_at': self.created_at
    }
