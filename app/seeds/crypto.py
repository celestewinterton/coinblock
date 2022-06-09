from app.models import db, Crypto

# prices from 06/09/2022 for defaults
# Adds a demo user, you can add other users here if you want
def seed_crypto():

  btc = Crypto(name="Bitcoin", symbol="btc", price=30018),
  db.session.add(btc)
  eth = Crypto(name="Ethereum", symbol="eth", price=1786.29),
  db.session.add(eth)
  usdt = Crypto(name="Tether", symbol="usdt", price=0.998742),
  db.session.add(usdt)
  usdc = Crypto(name="USD Coin", symbol="usdc", price=1),
  db.session.add(usdc)
  bnb = Crypto(name="BNB", symbol="bnb", price=288.81),
  db.session.add(bnb)
  ada = Crypto(name="Cardano", symbol="ada", price=0.63187),
  db.session.add(ada)
  xrp = Crypto(name="XRP", symbol="xrp", price=0.399892),
  db.session.add(xrp)
  busd = Crypto(name="Binance USD", symbol="busd", price=1),
  db.session.add(busd)
  sol = Crypto(name="Solana", symbol="sol", price=39.81),
  db.session.add(sol)
  doge = Crypto(name="Dogecoin", symbol="doge", price=0.079071),
  db.session.add(doge)
  dot = Crypto(name="Polkadot", symbol="dot", price=9.21),
  db.session.add(dot)
  wbtc = Crypto(name="Wrapped Bitcoin", symbol="wbtc", price=30037),
  db.session.add(wbtc)
  trx = Crypto(name="TRON", symbol="trx", price=0.080979),
  db.session.add(trx)
  steth = Crypto(name="Lido Staked Ether", symbol="steth", price=1737.38),
  db.session.add(steth)
  avax = Crypto(name="Avalanche", symbol="avax", price=24.27),
  db.session.add(avax)
  dai = Crypto(name="Dai", symbol="dai", price=0.999968),
  db.session.add(dai)
  shib = Crypto(name="Shiba Inu", symbol="shib", price=0.00001052),
  db.session.add(shib)
  leo = Crypto(name="LEO Token", symbol="leo", price=5.42),
  db.session.add(leo)
  cro = Crypto(name="Cronos", symbol="cro", price=0.17423),
  db.session.add(cro)
  matic = Crypto(name="Polygon", symbol="matic", price=0.630106),
  db.session.add(matic)
  link = Crypto(name="Chainlink", symbol="link", price=9.18),
  db.session.add(link)
  ltc = Crypto(name="Litecoin", symbol="ltc", price=60.12),
  db.session.add(ltc)
  ftt = Crypto(name="FTX", symbol="ftt", price=28.49),
  db.session.add(ftt)
  near = Crypto(name="NEAR Protocol", symbol="near", price=5.08),
  db.session.add(near)
  xlm = Crypto(name="Stellar", symbol="xlm", price=0.138711),
  db.session.add(xlm)
  xcn = Crypto(name="Chain", symbol="xcn", price=0.160044),
  db.session.add(xcn)
  xmr = Crypto(name="Monero", symbol="xmr", price=184.29),
  db.session.add(xmr)
  bch = Crypto(name="Bitcoin Cash", symbol="bch", price=174.02),
  db.session.add(bch)
  okb = Crypto(name="OKB", symbol="okb", price=11.3),
  db.session.add(okb)
  etc = Crypto(name="Ethereum Classic", symbol="etc", price=21.13),
  db.session.add(etc)
  algo = Crypto(name="Algorand", symbol="algo", price=0.401667),
  db.session.add(algo)
  atom = Crypto(name="Cosmos Hub", symbol="atom", price=8.76),
  db.session.add(atom)
  flow = Crypto(name="Flow", symbol="flow", price=2.39),
  db.session.add(flow)
  uni = Crypto(name="Uniswap", symbol="uni", price=5.17),
  db.session.add(uni)
  vet = Crypto(name="VeChain", symbol="vet", price=0.03207049),
  db.session.add(vet)
  xtz = Crypto(name="Tezos", symbol="xtz", price=2.19),
  db.session.add(xtz)
  tfuel = Crypto(name="Theta Fuel", symbol="tfuel", price=0.062863),
  db.session.add(tfuel)
  hbar = Crypto(name="Hedera", symbol="hbar", price=0.086965),
  db.session.add(hbar)
  ape = Crypto(name="ApeCoin", symbol="ape", price=5.71),
  db.session.add(ape)
  sand = Crypto(name="The Sandbox", symbol="sand", price=1.29),
  db.session.add(sand)
  kcs = Crypto(name="KuCoin", symbol="kcs", price=15.93),
  db.session.add(kcs)
  fil = Crypto(name="Filecoin", symbol="fil", price=7.18),
  db.session.add(fil)
  axs = Crypto(name="Axie Infinity", symbol="axs", price=19.35),
  db.session.add(axs)
  icp = Crypto(name="Internet Computer", symbol="icp", price=6.37),
  db.session.add(icp)
  frax = Crypto(name="Frax", symbol="frax", price=0.998845),
  db.session.add(frax)
  mana = Crypto(name="Decentraland", symbol="mana", price=0.969695),
  db.session.add(mana)
  theta = Crypto(name="Theta Network", symbol="theta", price=1.41),
  db.session.add(theta)
  egld = Crypto(name="Elrond", symbol="egld", price=61.91),
  db.session.add(egld)
  ceth = Crypto(name="cETH", symbol="ceth", price=36.03),
  db.session.add(ceth)
  aave = Crypto(name="Aave", symbol="aave", price=95.61),
  db.session.add(aave)
  eos = Crypto(name="EOS", symbol="eos", price=1.24),
  db.session.add(eos)
  tusd = Crypto(name="TrueUSD", symbol="tusd", price=0.999472),
  db.session.add(tusd)
  hnt = Crypto(name="Helium", symbol="hnt", price=11.8),
  db.session.add(hnt)
  hbtc = Crypto(name="Huobi BTC", symbol="hbtc", price=30318),
  db.session.add(hbtc)
  zec = Crypto(name="Zcash", symbol="zec", price=91.67),
  db.session.add(zec)
  cusdc = Crypto(name="cUSDC", symbol="cusdc", price=0.02262717),
  db.session.add(cusdc)
  dfi = Crypto(name="DeFiChain", symbol="dfi", price=2.04),
  db.session.add(dfi)
  grt = Crypto(name="The Graph", symbol="grt", price=0.146713),
  db.session.add(grt)
  bsv = Crypto(name="Bitcoin SV", symbol="bsv", price=55.75),
  db.session.add(bsv)
  ht = Crypto(name="Huobi", symbol="ht", price=6.85),
  db.session.add(ht)
  klay = Crypto(name="Klaytn", symbol="klay", price=0.36631),
  db.session.add(klay)
  mkr = Crypto(name="Maker", symbol="mkr", price=1126.01),
  db.session.add(mkr)
  btt = Crypto(name="BitTorrent", symbol="btt", price=0.00000105),
  db.session.add(btt)
  xec = Crypto(name="eCash", symbol="xec", price=0.0000514),
  db.session.add(xec)
  miota = Crypto(name="IOTA", symbol="miota", price=0.34431),
  db.session.add(miota)
  usdp = Crypto(name="Pax Dollar", symbol="usdp", price=0.999696),
  db.session.add(usdp)
  ftm = Crypto(name="Fantom", symbol="ftm", price=0.334938),
  db.session.add(ftm)
  rune = Crypto(name="THORChain", symbol="rune", price=2.81),
  db.session.add(rune)
  qnt = Crypto(name="Quant", symbol="qnt", price=63.06),
  db.session.add(qnt)
  neo = Crypto(name="NEO", symbol="neo", price=12),
  db.session.add(neo)
  gt = Crypto(name="Gate", symbol="gt", price=5.49),
  db.session.add(gt)
  usdn = Crypto(name="Neutrino USD", symbol="usdn", price=0.960925),
  db.session.add(usdn)
  xrd = Crypto(name="Radix", symbol="xrd", price=0.07787),
  db.session.add(xrd)
  waves = Crypto(name="Waves", symbol="waves", price=7.79),
  db.session.add(waves)
  lunc = Crypto(name="Terra Luna Classic", symbol="lunc", price=0.00007858),
  db.session.add(lunc)
  zil = Crypto(name="Zilliqa", symbol="zil", price=0.04884771),
  db.session.add(zil)
  usdd = Crypto(name="USDD", symbol="usdd", price=0.999695),
  db.session.add(usdd)
  cdai = Crypto(name="cDAI", symbol="cdai", price=0.02203148),
  db.session.add(cdai)
  nexo = Crypto(name="NEXO", symbol="nexo", price=1.21),
  db.session.add(nexo)
  ar = Crypto(name="Arweave", symbol="ar", price=13.28),
  db.session.add(ar)
  cake = Crypto(name="PancakeSwap", symbol="cake", price=4.37),
  db.session.add(cake)
  lrc = Crypto(name="Loopring", symbol="lrc", price=0.514086),
  db.session.add(lrc)
  chz = Crypto(name="Chiliz", symbol="chz", price=0.119657),
  db.session.add(chz)
  dash = Crypto(name="Dash", symbol="dash", price=57.68),
  db.session.add(dash)
  paxg = Crypto(name="PAX Gold", symbol="paxg", price=1847.25),
  db.session.add(paxg)
  ksm = Crypto(name="Kusama", symbol="ksm", price=66.06),
  db.session.add(ksm)
  snx = Crypto(name="Synthetix Network", symbol="snx", price=2.69),
  db.session.add(snx)
  bit = Crypto(name="BitDAO", symbol="bit", price=0.542025),
  db.session.add(bit)
  gmt = Crypto(name="STEPN", symbol="gmt", price=0.983425),
  db.session.add(gmt)
  bat = Crypto(name="Basic Attention", symbol="bat", price=0.393777),
  db.session.add(bat)
  enj = Crypto(name="Enjin Coin", symbol="enj", price=0.622458),
  db.session.add(enj)
  gala = Crypto(name="Gala", symbol="gala", price=0.075379),
  db.session.add(gala)
  stx = Crypto(name="Stacks", symbol="stx", price=0.537419),
  db.session.add(stx)
  cusdt = Crypto(name="cUSDT", symbol="cusdt", price=0.0217684),
  db.session.add(cusdt)
  celo = Crypto(name="Celo", symbol="celo", price=1.26),
  db.session.add(celo)
  amp = Crypto(name="Amp", symbol="amp", price=0.01104636),
  db.session.add(amp)
  kava = Crypto(name="Kava", symbol="kava", price=2.53),
  db.session.add(kava)
  fei = Crypto(name="Fei USD", symbol="fei", price=0.998999),
  db.session.add(fei)
  flex = Crypto(name="FLEX Coin", symbol="flex", price=4.94),
  db.session.add(flex)
  gno = Crypto(name="Gnosis", symbol="gno", price=188.65),
  db.session.add(gno)
  dcr = Crypto(name="Decred", symbol="dcr", price=33.83),
  db.session.add(dcr)
  one = Crypto(name="Harmony", symbol="one", price=0.03917141),
  db.session.add(one)
  cvx = Crypto(name="Convex Finance", symbol="cvx", price=7.43),
  db.session.add(cvx)
  xaut = Crypto(name="Tether Gold", symbol="xaut", price=1855.02),
  db.session.add(xaut)
  osmo = Crypto(name="Osmosis", symbol="osmo", price=1.16),
  db.session.add(osmo)
  crv = Crypto(name="Curve DAO", symbol="crv", price=1.15),
  db.session.add(crv)
  xdc = Crypto(name="XDC Network", symbol="xdc", price=0.03675517),
  db.session.add(xdc)
  xem = Crypto(name="NEM", symbol="xem", price=0.04970364),
  db.session.add(xem)
  mina = Crypto(name="Mina Protocol", symbol="mina", price=0.82475),
  db.session.add(mina)
  hot = Crypto(name="Holo", symbol="hot", price=0.00246572),
  db.session.add(hot)
  ldo = Crypto(name="Lido DAO", symbol="ldo", price=1.023),
  db.session.add(ldo)
  qtum = Crypto(name="Qtum", symbol="qtum", price=3.9),
  db.session.add(qtum)
  omi = Crypto(name="ECOMI", symbol="omi", price=0.00150212),
  db.session.add(omi)
  nxm = Crypto(name="Nexus Mutual", symbol="nxm", price=58.01),
  db.session.add(nxm)
  iost = Crypto(name="IOST", symbol="iost", price=0.01678988),
  db.session.add(iost)
  tkx = Crypto(name="Tokenize Xchange", symbol="tkx", price=4.84),
  db.session.add(tkx)
  okt = Crypto(name="OKC", symbol="okt", price=23.84),
  db.session.add(okt)
  sfm = Crypto(name="SafeMoon", symbol="sfm", price=0.00066862),
  db.session.add(sfm)
  btg = Crypto(name="Bitcoin Gold", symbol="btg", price=21.65),
  db.session.add(btg)
  comp = Crypto(name="Compound", symbol="comp", price=55.22),
  db.session.add(comp)
  omg = Crypto(name="OMG Network", symbol="omg", price=2.7),
  db.session.add(omg)
  mex = Crypto(name="Maiar DEX", symbol="mex", price=0.00007221),
  db.session.add(mex)
  mim = Crypto(name="Magic Internet Money", symbol="mim", price=0.998717),
  db.session.add(mim)
  dome = Crypto(name="Everdome", symbol="dome", price=0.01678719),
  db.session.add(dome)
  fxs = Crypto(name="Frax Share", symbol="fxs", price=6.09),
  db.session.add(fxs)
  evmos = Crypto(name="Evmos", symbol="evmos", price=1.69),
  db.session.add(evmos)
  ohm = Crypto(name="Olympus", symbol="ohm", price=17.48),
  db.session.add(ohm)
  glmr = Crypto(name="Moonbeam", symbol="glmr", price=1.27),
  db.session.add(glmr)
  kda = Crypto(name="Kadena", symbol="kda", price=1.91),
  db.session.add(kda)
  lusd = Crypto(name="Liquity USD", symbol="lusd", price=1.003),
  db.session.add(lusd)
  zrx = Crypto(name="0x", symbol="zrx", price=0.393012),
  db.session.add(zrx)
  srm = Crypto(name="Serum", symbol="srm", price=1.028),
  db.session.add(srm)
  bnt = Crypto(name="Bancor Network", symbol="bnt", price=1.31),
  db.session.add(bnt)
  iotx = Crypto(name="IoTeX", symbol="iotx", price=0.03402276),
  db.session.add(iotx)
  xido = Crypto(name="Xido Finance", symbol="xido", price=11.16),
  db.session.add(xido)
  lpt = Crypto(name="Livepeer", symbol="lpt", price=12.05),
  db.session.add(lpt)
  titan = Crypto(name="TitanSwap", symbol="titan", price=3.08),
  db.session.add(titan)
  ankr = Crypto(name="Ankr", symbol="ankr", price=0.03764986),
  db.session.add(ankr)
  ln = Crypto(name="LINK", symbol="ln", price=50.04),
  db.session.add(ln)
  audio = Crypto(name="Audius", symbol="audio", price=0.426069),
  db.session.add(audio)
  jst = Crypto(name="JUST", symbol="jst", price=0.04133023),
  db.session.add(jst)
  icx = Crypto(name="ICON", symbol="icx", price=0.384392),
  db.session.add(icx)
  glm = Crypto(name="Golem", symbol="glm", price=0.297778),
  db.session.add(glm)
  sgb = Crypto(name="Songbird", symbol="sgb", price=0.03602848),
  db.session.add(sgb)
  sushi = Crypto(name="Sushi", symbol="sushi", price=1.49),
  db.session.add(sushi)
  ens = Crypto(name="Ethereum Name Service", symbol="ens", price=11.5),
  db.session.add(ens)
  rvn = Crypto(name="Ravencoin", symbol="rvn", price=0.02686346),
  db.session.add(rvn)
  gusd = Crypto(name="Gemini Dollar", symbol="gusd", price=1.001),
  db.session.add(gusd)
  safemoon = Crypto(name="SafeMoon [OLD]", symbol="safemoon", price=1.03276e-7),
  db.session.add(safemoon)
  sc = Crypto(name="Siacoin", symbol="sc", price=0.00535565),
  db.session.add(sc)
  cel = Crypto(name="Celsius Network", symbol="cel", price=0.644298),
  db.session.add(cel)
  chsb = Crypto(name="SwissBorg", symbol="chsb", price=0.277914),
  db.session.add(chsb)
  nft = Crypto(name="APENFT", symbol="nft", price=9.42634e-7),
  db.session.add(nft)
  kub = Crypto(name="Bitkub Coin", symbol="kub", price=2.94),
  db.session.add(kub)
  ont = Crypto(name="Ontology", symbol="ont", price=0.297624),
  db.session.add(ont)
  sxp = Crypto(name="SXP", symbol="sxp", price=0.534735),
  db.session.add(sxp)
  nu = Crypto(name="NuCypher", symbol="nu", price=0.213174),
  db.session.add(nu)
  rpl = Crypto(name="Rocket Pool", symbol="rpl", price=15.94),
  db.session.add(rpl)
  cvxcrv = Crypto(name="Convex CRV", symbol="cvxcrv", price=1.093),
  db.session.add(cvxcrv)
  skl = Crypto(name="SKALE", symbol="skl", price=0.071748),
  db.session.add(skl)
  waxp = Crypto(name="WAX", symbol="waxp", price=0.123318),
  db.session.add(waxp)
  ever = Crypto(name="Everscale", symbol="ever", price=0.202438),
  db.session.add(ever)
  msol = Crypto(name="Marinade staked SOL", symbol="msol", price=41.8),
  db.session.add(msol)
  zen = Crypto(name="Horizen", symbol="zen", price=19.12),
  db.session.add(zen)
  yfi = Crypto(name="yearn.finance", symbol="yfi", price=7466.99),
  db.session.add(yfi)
  babydoge = Crypto(name="Baby Doge Coin", symbol="babydoge", price=1.469e-9),
  db.session.add(babydoge)
  elon = Crypto(name="Dogelon Mars", symbol="elon", price=4.20053e-7),
  db.session.add(elon)
  imx = Crypto(name="Immutable X", symbol="imx", price=0.97609),
  db.session.add(imx)
  rose = Crypto(name="Oasis Network", symbol="rose", price=0.065746),
  db.session.add(rose)
  vgx = Crypto(name="Voyager VGX", symbol="vgx", price=0.791459),
  db.session.add(vgx)
  poly = Crypto(name="Polymath", symbol="poly", price=0.254241),
  db.session.add(poly)
  pla = Crypto(name="PlayDapp", symbol="pla", price=0.538447),
  db.session.add(pla)
  elg = Crypto(name="Escoin", symbol="elg", price=3.36),
  db.session.add(elg)
  husd = Crypto(name="HUSD", symbol="husd", price=1.001),
  db.session.add(husd)
  scrt = Crypto(name="Secret", symbol="scrt", price=1.3),
  db.session.add(scrt)
  eurt = Crypto(name="Euro Tether", symbol="eurt", price=1.075),
  db.session.add(eurt)
  twt = Crypto(name="Trust Wallet", symbol="twt", price=0.611853),
  db.session.add(twt)
  mxc = Crypto(name="MXC", symbol="mxc", price=0.085509),
  db.session.add(mxc)
  slp = Crypto(name="Smooth Love Potion", symbol="slp", price=0.00505139),
  db.session.add(slp)
  astr = Crypto(name="Astar", symbol="astr", price=0.059725),
  db.session.add(astr)
  hive = Crypto(name="Hive", symbol="hive", price=0.542998),
  db.session.add(hive)
  uma = Crypto(name="UMA", symbol="uma", price=2.98),
  db.session.add(uma)
  dag = Crypto(name="Constellation", symbol="dag", price=0.077203),
  db.session.add(dag)
  plex = Crypto(name="PLEX", symbol="plex", price=0.745754),
  db.session.add(plex)
  renbtc = Crypto(name="renBTC", symbol="renbtc", price=29568),
  db.session.add(renbtc)
  xcm = Crypto(name="Coinmetro", symbol="xcm", price=0.64776),
  db.session.add(xcm)
  lsk = Crypto(name="Lisk", symbol="lsk", price=1.34),
  db.session.add(lsk)
  flexusd = Crypto(name="flexUSD", symbol="flexusd", price=0.997247),
  db.session.add(flexusd)
  knc = Crypto(name="Kyber Network Crystal", symbol="knc", price=1.89),
  db.session.add(knc)
  alusd = Crypto(name="Alchemix USD", symbol="alusd", price=0.998765),
  db.session.add(alusd)
  dao = Crypto(name="DAO Maker", symbol="dao", price=1.97),
  db.session.add(dao)
  juno = Crypto(name="JUNO", symbol="juno", price=3.58),
  db.session.add(juno)
  dgb = Crypto(name="DigiByte", symbol="dgb", price=0.0120497),
  db.session.add(dgb)
  pokt = Crypto(name="Pocket Network", symbol="pokt", price=0.165085),
  db.session.add(pokt)
  mpl = Crypto(name="Maple", symbol="mpl", price=29.3),
  db.session.add(mpl)
  syn = Crypto(name="Synapse", symbol="syn", price=0.984507),
  db.session.add(syn)
  cspr = Crypto(name="Casper Network", symbol="cspr", price=0.03417573),
  db.session.add(cspr)
  ilv = Crypto(name="Illuvium", symbol="ilv", price=268.33),
  db.session.add(ilv)

  db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_crypto():
  db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
  db.session.commit()
