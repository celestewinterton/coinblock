from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, NumberRange
from app.models import User


class WatchlistForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    name = StringField('Name')
    submit = SubmitField('Submit')
