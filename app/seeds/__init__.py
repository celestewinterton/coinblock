from flask.cli import AppGroup
from .users import seed_users, undo_users
from .crypto import seed_crypto, undo_crypto
from .transactions import seed_transactions, undo_transactions


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_crypto()
    seed_transactions()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_crypto()
    undo_transactions()
    # Add other undo functions here
