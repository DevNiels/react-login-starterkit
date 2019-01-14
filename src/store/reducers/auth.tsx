import * as actionTypes from '../actions';

const initialState = {
  authRole: null
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        authRole: action.payload.authRole
      };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        authRole: null
      };
  }
  return state;
};

export default reducer;
