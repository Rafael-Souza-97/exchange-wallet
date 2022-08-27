import { combineReducers } from 'redux';
import getUserLoginReducer from './user';
import getWalletReducer from './wallet';

const rootReducer = combineReducers({
  user: getUserLoginReducer,
  wallet: getWalletReducer,
});

export default rootReducer;
