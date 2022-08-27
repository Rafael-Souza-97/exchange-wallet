const API_URL = 'https://economia.awesomeapi.com.br/json/all';

export const userInfos = 'USER_INFOS';
export const walletInfos = 'WALLET_INFOS';
export const requestCurency = 'REQUEST_CURRENCY';
export const receiveCurrencySuccess = 'RECEIVE_CURRENCY_SUCCESS';
export const receiveCurencyFailure = 'REQUEST_CURRENCY_FAILURE';

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

const receiveISSLocationFailure = (error) => ({
  type: receiveCurencyFailure,
  error,
});

export const fetchCurrency = () => async (dispatch) => {
  dispatch(requestApiCurrency());
  try {
    const response = await fetch(API_URL);
    const json = await response.json();

    dispatch(receiveApiCurrencySuccess(json));
  } catch (error) {
    dispatch(receiveISSLocationFailure(error));
  }
};
