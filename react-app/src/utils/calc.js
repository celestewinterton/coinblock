export const bigNum = num => {
  if (num >= 1000000000) return Math.floor(num / 1000000000) + 'B'
  if (num >= 1000000) return Math.floor(num / 1000000) + 'M'
  if (num >= 1000) return Math.floor(num / 1000) + 'K'
  if (num < 100) return num
  else Math.floor(num)
}

export const currency = (num) => {
  const dollars = new Intl.NumberFormat(`en-US`, {
    currency: `USD`,
    style: 'currency',
  }).format(num);

  return dollars
}

export const round = (num, decimalPlaces=2) => {
  const factor = Math.pow(10, decimalPlaces)
  return Math.round(num * factor) / factor
}


export const change = (past, now) => {
  let res = round(((now - past) / past) * 100);
  if (res > 0) return `+${res}%` // profits
  if (res <= 0) return `${res}%` // losses
}
