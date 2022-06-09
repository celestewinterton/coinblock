import { easyFetch } from "../utils/easyFetch"

// Edit and Delete for admin use only to fix errors...?
// Have only the Satoshi Nakamoto user have edit/delete access

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

  for (let data of formData.entries()) console.log("formData", data)

  const data = await res.json()
  if (res.ok) {
    dispatch(postNewTransaction(data))
  } else {
    return data
  }
  // if (res.ok) {
  //   const data = await res.json()
  //   dispatch(postNewTransaction(data))
  // }
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
      // case EDIT_TRANSACTION:
      //     newState[action.transaction.id] = action.transaction
      //     return newState
      // case DELETE_TRANSACTION:
      //     delete newState[action.transactionId]
      //     return newState
      default:
          return state;
  };
};

export default transactionsReducer;


// const EDIT_TRANSACTION = 'transactions/EDIT_TRANSACTION'
// const DELETE_TRANSACTION = 'transactions/DELETE_TRANSACTION'


// const changeTransaction = transaction => ({
//   type: EDIT_TRANSACTION,
//   transaction
// })

// const removeTransaction = transactionId => ({
//   type: DELETE_TRANSACTION,
//   transactionId
// })



// export const editTransaction = (formData) => async (dispatch) => {
//   const res = await easyFetch(`/api/transactions`, {
//     method: 'PUT',
//     body: formData
//   })

//   const data = await res.json()

//   if (res.ok) {
//       dispatch(changeTransaction(data))
//   } else {
//       return data
//   }
// }

// export const deleteTransactions = (transactionId) => async (dispatch) => {
//   const res = await easyFetch(`/api/transactions/${transactionId}`, {
//     method: 'DELETE'
//   })

//   const data = await res.json()

//   if (res.ok) {
//       dispatch(removeTransaction(data.id))
//   } else {
//       return data
//   }
// }
