import { easyFetch } from "../utils/easyFetch"

const LOAD_TRANSACTIONS = 'transactions/LOAD_TRANSACTIONS'
const POST_TRANSACTION = 'transactions/POST_TRANSACTION'


const loadTransactions = transactions => ({
  type: LOAD_TRANSACTIONS,
  transactions
})

const postNewTransaction = transaction => ({
  type: POST_TRANSACTION,
  transaction
})

export const getTransactions = () => async (dispatch) => {
  const res = await easyFetch(`/api/transactions`)
  const data = await res.json()

  if (res.ok) {
      dispatch(loadTransactions(data.transactions))
  } else {
      return data
  }
}

export const postTransaction = (formData) => async (dispatch) => {
  const res = await fetch(`/api/transactions`, {
    method: 'POST',
    body: formData
  })

  // for (let data of formData.entries()) console.log("formData", data)
  const data = await res.json()
  if (res.ok) {
    dispatch(postNewTransaction(data))
    return data
  } else {
    return data
  }
}


const initialState = {};

const transactionsReducer = (state = initialState, action) => {
  const newState = { ...state }
  switch (action.type) {
      case LOAD_TRANSACTIONS:
        if (action.transactions.length) {
          action.transactions.forEach(transaction => {
            newState[transaction.id] = transaction;
          });
        }
        return newState;
      case POST_TRANSACTION:
        newState[action.transaction.id] = action.transaction
        return newState
      default:
        return state;
  };
};

export default transactionsReducer;
