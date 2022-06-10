from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, NumberRange
from app.models import User


class WatchlistForm(FlaskForm):
    user_id = StringField('user_id', validators=[DataRequired()])
    crypto_id = StringField('crypto_id', validators=[DataRequired()])
    # name = StringField('Name')
