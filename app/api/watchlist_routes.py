from flask import Blueprint, request
from ..models import db, User, Watchlist
from flask_login import current_user
from ..utils import form_validation_errors
from ..forms import WatchlistForm


watchlist_routes = Blueprint('watchlist', __name__)

@watchlist_routes.route('')
def get_user_watchlist():
  watchlist = Watchlist.query.all()
  return {'watchlist': [item.to_dict() for item in watchlist]}

# watchlist_id and crypto_id


@watchlist_routes.route('' , methods=['POST'])
def add_to_watchlist():
  form = WatchlistForm()
  params = {'user_id': form.data['user_id']}
  crypto_id = form.data['cryptoId']

  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    watchlist = Watchlist(**params)


    watchlist.append(crypto_id)
    db.session.add(watchlist)
    db.session.commit()
    return watchlist.to_dict()
  return {'errors': form_validation_errors(form.errors)}, 401
