from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


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

    transactions = db.relationship("Transaction", back_populates='user')
    watchlists = db.relationship("Watchlist", back_populates='user')
    watching = db.relationship("Watchlist", back_populates='users', secondary=join_watchlist)


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'email': self.email,
            'watching': [crypto.to_dict() for crypto in self.watching],
            'email': self.email,
        }

    def to_names(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
        }


class Watchlist(db.Model):
    __tablename__ = "watchlists"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user = db.relationship("User", back_populates='watchlists')

    users = db.relationship("User", back_populates='watching', secondary=join_watchlist)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'users': [user.to_names() for user in self.users]
        }

class Crypto(db.Model):
  __tablename__ = 'crypto'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), unique=True)
  symbol = db.Column(db.String(50), unique=True)
  price = db.Column(db.Integer)

  transactions = db.relationship("Transaction", back_populates='crypto')
  watchlists = db.relationship("Watchlist", back_populates='crypto')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'symbol': self.symbol,
      'price': self.price
    }
