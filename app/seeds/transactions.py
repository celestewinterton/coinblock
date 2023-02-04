from app.models import db, Transaction


# prices from 06/09/2022 for defaults
# Adds a demo user, you can add other users here if you want
def seed_transactions():

  deposit1 = Transaction(amount=25000, price=1, quantity=25000, credit="cash", debit="bank", type="transfer", status="Completed", user_id=1, created_at="2022-11-05")
  deposit2 = Transaction(amount=25000, price=1, quantity=25000, credit="cash", debit="bank", type="transfer", status="Completed", user_id=2, created_at="2022-11-06")
  txn14 = Transaction(amount=5000, price=15790.97, quantity=0.31663666, credit="btc", debit="cash", type="buy", status="Completed", user_id=1, crypto_id=1, created_at="2022-11-09")
  txn15 = Transaction(amount=3000, price=16682.66, quantity=0.17982744, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2022-11-19")
  txn16 = Transaction(amount=5000, price=15790.97, quantity=0.31663666, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2022-11-09")
  txn17 = Transaction(amount=2000, price=16426.05, quantity=0.12175782, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2022-12-19")
  txn18 = Transaction(amount=2000, price=15768.38, quantity=0.12683611, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2022-11-21")
  txn20 = Transaction(amount=1000, price=1107.9, quantity=0.9026085, credit="eth", debit="cash", type="buy", status="Completed", user_id=1, crypto_id=2, created_at="2022-11-22")
  txn21 = Transaction(amount=1000, price=1107.9, quantity=0.9026085, credit="eth", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=2, created_at="2022-11-22")
  txn22 = Transaction(amount=1000, price=1198.79, quantity=0.83417446, credit="eth", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=2, created_at="2022-11-26")
  txn23 = Transaction(amount=800, price=1165.6, quantity=0.6863418, credit="eth", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=2, created_at="2022-12-20")
  txn24 = Transaction(amount=500, price=1200.96, quantity=0.4163336, credit="eth", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=2, created_at="2023-01-01")
  txn25 = Transaction(amount=1000, price=1107.9, quantity=0.9026085, credit="eth", debit="cash", type="buy", status="Completed", user_id=1, crypto_id=2, created_at="2022-11-22")
  txn26 = Transaction(amount=1000, price=1198.79, quantity=0.83417446, credit="eth", debit="cash", type="buy", status="Completed", user_id=1, crypto_id=2, created_at="2022-11-26")
  txn27 = Transaction(amount=800, price=5.6319, quantity=142.047977, credit="uni", debit="cash", type="buy", status="Completed", user_id=1, crypto_id=34, created_at="2023-01-11")
  txn28 = Transaction(amount=800, price=5.6319, quantity=142.047977, credit="uni", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=34, created_at="2023-01-11")


  db.session.add(deposit1)
  db.session.add(deposit2)
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

  db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_transactions():
  db.session.execute('TRUNCATE crypto RESTART IDENTITY CASCADE;')
  db.session.commit()
