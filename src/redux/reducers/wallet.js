import { requestCurency,
  receiveCurrencySuccess,
  receiveCurencyFailure,
  addExpense,
  addExpenseSum,
  deleteExpense,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  id: 0,
  addExpenseSum: [],
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
  case addExpense: return {
    ...state,
    expenses: [...state.expenses, { id: state.id, ...action.payload }],
    id: state.id + 1,
  };
  case addExpenseSum: return {
    ...state,
    addExpenseSum: [...state.addExpenseSum, ...action.payload],
  };
  case deleteExpense: return {
    ...state,
    expenses: [...state.expenses.filter((item) => item.id !== Number(action.payload))],
  };
  default: return state;
  }
};

export default getWalletReducer;
