import { userInfos } from '../actions/index';

const INICIAL_STATE = {
  email: '',
};
function getUserLoginReducer(state = INICIAL_STATE, action) {
  switch (action.type) {
  case userInfos:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}

export default getUserLoginReducer;
