from email.policy import default
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import simplejson as json


join_watchlist = db.Table(
    "join_watchlist",
    db.Column(
        "watchlist_id", db.Integer, db.ForeignKey("watchlists.id"), primary_key=True
    ),
    db.Column(
        "crypto_id", db.Integer, db.ForeignKey("crypto.id"), primary_key=True
    ),
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    cash = db.Column(db.Float)

    transactions = db.relationship("Transaction", back_populates='user')
    watchlists = db.relationship("Watchlist", back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def balances(self):
        balances = {'cash': 0}
        for txn in self.transactions:
            if str(txn.crypto_id) == 'None':
                balances['cash'] += txn.amount
            elif str(txn.crypto_id) in balances:
                balances[str(txn.crypto_id)] += txn.quantity
                balances['cash'] -= txn.amount
            else:
                balances.update({str(txn.crypto_id): txn.quantity})
                balances['cash'] -= txn.amount
        return balances

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'email': self.email,
            # 'cash': self.cash,
            'watchlist': [item.to_dict() for item in self.watchlists],
            # 'cryptoWatch': [item.cryptoList for item in self.watchlists],
            'transactions': [transaction.to_dict() for transaction in self.transactions],
            'balances': self.balances()
        }


class Watchlist(db.Model):
    __tablename__ = "watchlists"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user = db.relationship("User", back_populates='watchlists')

    cryptoList = db.relationship("Crypto", back_populates='watchlists', secondary=join_watchlist)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'crypto': [crypto.to_dict() for crypto in self.cryptoList]
        }

class Crypto(db.Model):
    __tablename__ = 'crypto'

    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(50))
    price = db.Column(db.Float)

    transactions = db.relationship("Transaction", back_populates='crypto')

    watchlists = db.relationship("Watchlist", back_populates='cryptoList', secondary=join_watchlist)

    def to_dict(self):
        return {
        'id': self.id,
        'name': self.name,
        'symbol': self.symbol,
        'price': json.dumps(self.price, use_decimal=True)
        }
