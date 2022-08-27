import { requestCurency,
  receiveCurrencySuccess,
  receiveCurencyFailure,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const getWalletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case requestCurency: return {
    ...state,
  };
  case receiveCurrencySuccess: return {
    ...state,
    currencies: Object.keys(action.payload).filter((currency) => currency !== 'USDT'),
  };
  case receiveCurencyFailure: return {
    ...state,
    error: action.error,
  };
  default: return state;
  }
};

export default getWalletReducer;
