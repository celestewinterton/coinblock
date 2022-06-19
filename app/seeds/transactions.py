from app.models import db, Transaction


# prices from 06/09/2022 for defaults
# Adds a demo user, you can add other users here if you want
def seed_transactions():

  deposit = Transaction(amount=25000, price=1, quantity=25000, credit="cash", debit="bank", type="transfer", status="Completed", user_id=2, created_at="2017-9-14")
  txn14 = Transaction(amount=1200, price=3726.51, quantity=0.32201712, credit="btc", debit="cash", type="buy", status="Completed", user_id=1, crypto_id=1, created_at="2017-9-15")
  txn15 = Transaction(amount=2500, price=3726.51, quantity=0.67086899, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2017-9-15")
  txn16 = Transaction(amount=1600, price=3774.99, quantity=0.42384218, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2018-11-23")
  txn17 = Transaction(amount=2000, price=3729.31, quantity=0.53629224, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2018-12-28")
  txn18 = Transaction(amount=2000, price=3917, quantity=0.511059484, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2019-3-8")
  txn20 = Transaction(amount=400, price=118.06, quantity=3.38810774182619, credit="eth", debit="cash", type="buy", status="Completed", user_id=1, crypto_id=2, created_at="2019-2-8")
  txn21 = Transaction(amount=500, price=190.89, quantity=2.61930955000262, credit="eth", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=2, created_at="2019-8-23")
  txn22 = Transaction(amount=1000, price=172.09, quantity=5.81091289441571, credit="eth", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=2, created_at="2019-10-18")
  txn23 = Transaction(amount=800, price=237.75, quantity=3.36487907465825, credit="eth", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=2, created_at="2020-3-6")
  txn24 = Transaction(amount=500, price=214.25, quantity=2.33372228704784, credit="eth", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=2, created_at="2020-5-1")
  txn25 = Transaction(amount=500, price=235.8, quantity=2.12044105173876, credit="eth", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=2, created_at="2020-7-17")
  txn26 = Transaction(amount=500, price=387.81, quantity=1.28929114772698, credit="eth", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=2, created_at="2020-9-11")
  txn27 = Transaction(amount=800, price=5.150005796, quantity=155.339631000291, credit="bnb", debit="cash", type="buy", status="Completed", user_id=1, crypto_id=5, created_at="2018-11-23")
  txn28 = Transaction(amount=1000, price=26.29983337, quantity=38.0230547, credit="bnb", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=5, created_at="2019-8-23")
  txn29 = Transaction(amount=200, price=43.91416945, quantity=4.55433866801732, credit="bnb", debit="cash", type="buy", status="Completed", user_id=1, crypto_id=5, created_at="2021-1-8")


  db.session.add(deposit)
  db.session.add(txn14)
  db.session.add(txn15)
  db.session.add(txn16)
  db.session.add(txn17)
  db.session.add(txn18)
  db.session.add(txn20)
  db.session.add(txn21)
  db.session.add(txn22)
  db.session.add(txn23)
  db.session.add(txn24)
  db.session.add(txn25)
  db.session.add(txn26)
  db.session.add(txn27)
  db.session.add(txn28)
  db.session.add(txn29)

  db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_transactions():
  db.session.execute('TRUNCATE crypto RESTART IDENTITY CASCADE;')
  db.session.commit()
