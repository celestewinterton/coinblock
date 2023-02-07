from flask import Blueprint
from ..models import Crypto

from pycoingecko import CoinGeckoAPI
cg = CoinGeckoAPI()

crypto_routes = Blueprint('crypto', __name__)

@crypto_routes.route('')
def get_crypto():
  coins = Crypto.query.all()

  # api_data = cg.get_coins_markets(vs_currency="usd")
  # print(api_data)

  return {'crypto': [coin.to_dict() for coin in coins]}
