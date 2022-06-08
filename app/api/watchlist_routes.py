from copyreg import remove_extension
from flask import Blueprint, jsonify, render_template, request
from datetime import datetime
from ..models import User, Watchlist
from ..models.db import db
from flask_login import current_user
from ..utils import form_validation_errors

transaction_routes = Blueprint('watchlist', __name__)
