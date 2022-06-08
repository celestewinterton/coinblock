


export const fetchMarketData = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false', {
    method: 'GET',
    // headers: {'ContentType': 'application/json'},
    // body: JSON.stringify()
  })

  if (response.ok) {
    const result = await response.json();
    return response

  }
}

export const fetchAssetDetails = (symbol) => {

}

const data = fetchMarketData()
console.log(data)
