from app.models import db, User, Crypto


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstName='Demo', lastName='Guest', email='demo@aa.io', password='password')
    satoshi = User(
        firstName='Satoshi', lastName='Nakamoto', email='satoshi@btc.com', password='whitepaper')
    vitalik = User(
        firstName='Vitalik', lastName='Buterin', email='vitalik@eth.com', password='whitepaper')
    celeste = User(
        firstName='Celeste', lastName='Winterton', email='celestewinterton@gmail.com', password='terumi')

    db.session.add(demo)
    db.session.add(satoshi)
    db.session.add(vitalik)
    db.session.add(celeste)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
