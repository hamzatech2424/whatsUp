import { AUTH, CLEAR_REDUX } from "../types"
import produce from 'immer';

const state = {
  currentUser: {},
}

const AuthReducer = (mState = { ...state }, action) => {
  switch (action.type) {
    case AUTH.SET_CURRENT_USER:
      return produce(mState, draftState => {
        draftState.currentUser = action.payload;
      })
      case CLEAR_REDUX.CLEAR_REDUCER:
        return produce(mState, draftState => {
          draftState.currentUser = {};
        })
    default:
      return { ...mState };
  }
}
export default AuthReducer;


