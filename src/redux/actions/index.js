const API_URL = 'https://economia.awesomeapi.com.br/json/all';

export const userInfos = 'USER_INFOS';
export const walletInfos = 'WALLET_INFOS';
export const requestCurency = 'REQUEST_CURRENCY';
export const receiveCurrencySuccess = 'RECEIVE_CURRENCY_SUCCESS';
export const addExpense = 'ADD_EXPENSE';
export const deleteExpense = 'DELETE_EXPENSE';
export const editExpenseState = 'EDIT_EXPENSE';
export const editSubmitExpenseState = 'EDIT_SUBMIT_EXPENSE';

export function userInfosAction(payload) {
  return {
    type: userInfos,
    payload,
  };
}

const requestApiCurrency = () => ({
  type: requestCurency,
});

const receiveApiCurrencySuccess = (payload) => ({
  type: receiveCurrencySuccess,
  payload,
});

export const fetchCurrency = () => async (dispatch) => {
  dispatch(requestApiCurrency());
  const response = await fetch(API_URL);
  const json = await response.json();

  dispatch(receiveApiCurrencySuccess(json));
};

export function addExpenseAction(payload) {
  return {
    type: addExpense,
    payload,
  };
}

export function removeExpense(payload) {
  return {
    type: deleteExpense,
    payload,
  };
}

export function editExpense(id) {
  return {
    type: editExpenseState,
    id,
  };
}

export function editSubmitExpense(payload) {
  return {
    type: editSubmitExpenseState,
    payload,
  };
}
