import { easyFetch } from "../utils/easyFetch"


const LOAD_CRYPTO = 'crypto/LOAD_CRYPTO'


export const loadAllCrypto = crypto => ({
  type: LOAD_CRYPTO,
  crypto
})

export const loadCrypto = () => async dispatch => {
  const res = await easyFetch(`/api/crypto`)
  const data = await res.json()

  if (res.ok) {
    dispatch(loadAllCrypto(data.crypto))
  } else {
      return data
  }
}


const initialState = {};

const cryptoReducer = (state = initialState, action) => {
  const newState = { ...state }
  switch (action.type) {
    case LOAD_CRYPTO:
      if (action.crypto.length) {
        action.crypto.forEach(coin => {
          newState[coin.id] = coin;
        });
      }
      return newState;
    default:
      return state;
  }
};

export default cryptoReducer;
