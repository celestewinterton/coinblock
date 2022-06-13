from flask import Blueprint
from ..models import Crypto

from pycoingecko import CoinGeckoAPI
cg = CoinGeckoAPI()


crypto_routes = Blueprint('crypto', __name__)

@crypto_routes.route('')
def get_crypto():
  coins = Crypto.query.all()
  return {'crypto': [coin.to_dict() for coin in coins]}
