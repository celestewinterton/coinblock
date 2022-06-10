export const toDate = (val) => {
  return new Date(val).toLocaleDateString('en-US');
}

export const toUnix = (val) => {
  return Math.floor(new Date(val).getTime() / 1000)
}

export const toBillions = (num) => {
  return Math.floor(num / 1000000000)
}

export const toMillions = (num) => {
  return Math.floor(num / 1000000)
}

export const currency = (num) => {
  const dollars = new Intl.NumberFormat(`en-US`, {
    currency: `USD`,
    style: 'currency',
  }).format(num);

  return dollars
}



// testing...
// console.log(toDate(1367107200000))
// console.log(toUnix("4/27/2013"), 1367107200)
