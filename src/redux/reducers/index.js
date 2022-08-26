import { combineReducers } from 'redux';
import getUserLogin from './user';
import wallet from './wallet';

const rootReducer = combineReducers({ user: getUserLogin, wallet });

export default rootReducer;
