import { easyFetch } from "../utils/easyFetch"

const LOAD_WATCHLIST = 'watchlist/LOAD_TRANSACTIONS'
const ADD_TO_WATCHLIST = 'watchlist/ADD_TO_WATCHLIST'
const REMOVE_FROM_WATCHLIST = 'watchlist/REMOVE_FROM_WATCHLIST'


const loadUserWatchlist = items => ({
  type: LOAD_WATCHLIST,
  items
})

const addToUserWatchlist = item => ({
  type: ADD_TO_WATCHLIST,
  item
})

const removeFromUserWatchlist = itemId => ({
  type: REMOVE_FROM_WATCHLIST,
  itemId
})

export const loadWatchlist = () => async (dispatch) => {
  const res = await easyFetch(`/api/watchlist`)
  const data = await res.json()

  if (res.ok) {
      dispatch(loadUserWatchlist(data.watchlist))
  } else {
      return data
  }
}

export const addToWatchlist = (formData) => async (dispatch) => {
  const res = await easyFetch(`/api/watchlist`, {
    method: 'POST',
    headers: {'ContentType': 'application/json'},
    // body: JSON.stringify(formData)
    body: formData
  })

  const data = await res.json()
  if (res.ok) {
    dispatch(addToUserWatchlist(data))
  } else {
    return data
  }
}

export const deleteFromWatchlist = (watchlistId) => async (dispatch) => {
  const res = await easyFetch(`/api/transactions/${watchlistId}`, {
    method: 'DELETE'
  })

  const data = await res.json()

  if (res.ok) {
      dispatch(removeFromUserWatchlist(data.id))
  } else {
      return data
  }
}



const initialState = {};

const watchlistReducer = (state = initialState, action) => {
  const newState = { ...state }
  switch (action.type) {
      case LOAD_WATCHLIST:
          if (action.transactions.length) {
              action.transactions.forEach(transaction => {
                  newState[transaction.id] = transaction;
              });
          }
          return newState;
      case ADD_TO_WATCHLIST:
          newState[action.transaction.id] = action.transaction
          return newState
      case REMOVE_FROM_WATCHLIST:
          delete newState[action.transactionId]
          return newState
      default:
          return state;
  };
};

export default watchlistReducer;
