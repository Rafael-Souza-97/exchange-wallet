import { requestCurency,
  receiveCurrencySuccess,
  addExpense,
  deleteExpense,
  editExpenseState,
  editSubmitExpenseState,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  id: 0,
  objectEdit: {},
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
  case addExpense: return {
    ...state,
    expenses: [...state.expenses, { id: state.id, ...action.payload }],
    id: state.id + 1,
  };
  case deleteExpense: return {
    ...state,
    expenses: [...state.expenses.filter((item) => item.id !== Number(action.payload))],
  };
  case editExpenseState: return {
    ...state,
    editor: true,
    idToEdit: Number(action.id),
    objectEdit: {
      ...state.expenses.filter((item) => item.id === Number(action.id)),
    },
    expenses: [...state.expenses.filter((item) => item.id !== Number(action.id))],
  };
  case editSubmitExpenseState: return {
    ...state,
    expenses: [...state.expenses, { id: state.idToEdit, ...action.payload }]
      .sort((a, b) => a.id - b.id),
    editor: false,
    idToEdit: 0,
    objectEdit: {},
  };
  default: return state;
  }
};

export default getWalletReducer;
