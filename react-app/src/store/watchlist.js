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
    body: formData
  })

  // for (let data of formData.entries()) console.log("formData", data)
  const data = await res.json()
  if (res.ok) {
    dispatch(addToUserWatchlist(data))
  } else {
    // console.log(data)
    return data
  }
}

export const deleteFromWatchlist = (watchlistId) => async (dispatch) => {
  const res = await easyFetch(`/api/watchlist/${watchlistId}`, {
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
          if (action.items.length) {
              action.items.forEach(item => {
                  newState[item.id] = item;
              });
          }
          return newState;
      case ADD_TO_WATCHLIST:
          newState[action.item.id] = action.item
          return newState
      case REMOVE_FROM_WATCHLIST:
          delete newState[action.itemId]
          return newState
      default:
          return state;
  };
};

export default watchlistReducer;
