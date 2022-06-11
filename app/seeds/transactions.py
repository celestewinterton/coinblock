from app.models import db, Transaction


# prices from 06/09/2022 for defaults
# Adds a demo user, you can add other users here if you want
def seed_transactions():

  deposit = Transaction(amount=25000, price=1, quantity=25000, credit="cash", debit="bank", type="transfer", status="Completed", user_id=2, created_at="2015-11-20")
  txn1 = Transaction(amount=100, price=327, quantity=0.305810397553517, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2015-11-20")
  txn2 = Transaction(amount=100, price=461.29, quantity=0.216783368379978, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2015-12-18")
  txn3 = Transaction(amount=300, price=450.38, quantity=0.666104178693548, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2016-1-8")
  txn4 = Transaction(amount=500, price=391, quantity=1.27877237851662, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2016-2-12")
  txn5 = Transaction(amount=400, price=410.2, quantity=0.975134080936129, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2016-3-18")
  txn6 = Transaction(amount=200, price=446.28, quantity=0.448149144035135, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2016-5-20")
  txn7 = Transaction(amount=400, price=609.5, quantity=0.656275635767022, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2016-6-10")
  txn8 = Transaction(amount=2000, price=657.5, quantity=3.04182509505703, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2016-7-22")
  txn9 = Transaction(amount=300, price=570.84, quantity=0.525541307546773, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2016-8-26")
  txn10 = Transaction(amount=500, price=652.75, quantity=0.765990042129452, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2016-10-21")
  txn11 = Transaction(amount=2000, price=909, quantity=2.2002200220022, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2017-1-6")
  txn12 = Transaction(amount=300, price=2099.99, quantity=0.142857823132491, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2017-5-26")
  txn13 = Transaction(amount=500, price=2574.84, quantity=0.194186823258921, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2017-6-23")
  txn14 = Transaction(amount=400, price=2825.27, quantity=0.141579388872568, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2017-7-21")
  txn15 = Transaction(amount=200, price=3726.51, quantity=0.0536695192016122, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2017-9-15")
  txn16 = Transaction(amount=500, price=3774.99, quantity=0.132450681988562, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2018-11-23")
  txn17 = Transaction(amount=400, price=3729.31, quantity=0.107258447273088, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2018-12-28")
  txn18 = Transaction(amount=200, price=3917, quantity=0.0510594842992086, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=1, created_at="2019-3-8")
  txn19 = Transaction(amount=100, price=12.03, quantity=8.31255195344971, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=2, created_at="2016-10-21")
  txn20 = Transaction(amount=400, price=118.06, quantity=3.38810774182619, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=2, created_at="2019-2-8")
  txn21 = Transaction(amount=500, price=190.89, quantity=2.61930955000262, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=2, created_at="2019-8-23")
  txn22 = Transaction(amount=1000, price=172.09, quantity=5.81091289441571, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=2, created_at="2019-10-18")
  txn23 = Transaction(amount=800, price=237.75, quantity=3.36487907465825, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=2, created_at="2020-3-6")
  txn24 = Transaction(amount=500, price=214.25, quantity=2.33372228704784, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=2, created_at="2020-5-1")
  txn25 = Transaction(amount=500, price=235.8, quantity=2.12044105173876, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=2, created_at="2020-7-17")
  txn26 = Transaction(amount=500, price=387.81, quantity=1.28929114772698, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=2, created_at="2020-9-11")
  txn27 = Transaction(amount=800, price=5.150005796, quantity=155.339631000291, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=5, created_at="2018-11-23")
  txn28 = Transaction(amount=2000, price=26.29983337, quantity=76.0461091849115, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=5, created_at="2019-8-23")
  txn29 = Transaction(amount=200, price=43.91416945, quantity=4.55433866801732, credit="btc", debit="cash", type="buy", status="Completed", user_id=2, crypto_id=5, created_at="2021-1-8")


  db.session.add(deposit)
  db.session.add(txn1)
  db.session.add(txn2)
  db.session.add(txn3)
  db.session.add(txn4)
  db.session.add(txn5)
  db.session.add(txn6)
  db.session.add(txn7)
  db.session.add(txn8)
  db.session.add(txn9)
  db.session.add(txn10)
  db.session.add(txn11)
  db.session.add(txn12)
  db.session.add(txn13)
  db.session.add(txn14)
  db.session.add(txn15)
  db.session.add(txn16)
  db.session.add(txn17)
  db.session.add(txn18)
  db.session.add(txn19)
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
