import { easyFetch } from "../utils/easyFetch";
import { format } from "date-fns";

const LOAD_TRANSACTIONS = "transactions/LOAD_TRANSACTIONS";
const POST_TRANSACTION = "transactions/POST_TRANSACTION";

const loadTransactions = (transactions) => ({
  type: LOAD_TRANSACTIONS,
  transactions,
});

const postNewTransaction = (transaction) => ({
  type: POST_TRANSACTION,
  transaction,
});

export const getTransactions = () => async (dispatch) => {
  const res = await easyFetch(`/api/transactions`);
  const data = await res.json();
  console.log("THUNK THUNK THUNK", data.transactions);

  if (res.ok) {
    dispatch(loadTransactions(data.transactions));
  } else if (data.errors) {
    return data;
  }

  dispatch(loadTransactions(data.transactions));
};

export const postTransaction = (formData) => async (dispatch) => {
  const res = await fetch(`/api/transactions`, {
    method: "POST",
    body: formData,
  });

  // for (let data of formData.entries()) console.log("formData", data)
  const data = await res.json();
  if (res.ok) {
    dispatch(postNewTransaction(data));
    return data;
  } else {
    return data;
  }
};

const initialState = {};

const transactionsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_TRANSACTIONS:
      if (action.transactions) {
        // newState['transactions'] = action.transactions
        for (let key in action.transactions) {
          newState[key] = action.transactions[key];
        }
      }
      return newState;
    case POST_TRANSACTION:
      newState[action.transaction.id] = action.transaction;
      return newState;
    default:
      return state;
  }
};

export default transactionsReducer;
