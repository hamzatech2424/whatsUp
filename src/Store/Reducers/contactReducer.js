import { CLEAR_REDUX, CONTACTS, SET_ON_PLATFORM_CONTACTS } from "../types"
import produce from 'immer';
import { contactArray } from "../../MocData/moc";
const state = {
  allContacts: [],
  onPlatformContacts: [],
  onlineUsers:[]
}

const ContactReducer = (mState = { ...state }, action) => {
  switch (action.type) {
    case CONTACTS.SET_ALL_CONTACTS:
      return produce(mState, draftState => {
        draftState.allContacts = action.payload;
      })
    case CONTACTS.SET_ON_PLATFORM_CONTACTS:
      return produce(mState, draftState => {
        draftState.onPlatformContacts = action.payload;
      })
    case CONTACTS.ONLINE_CONTACT:
      return produce(mState, draftState => {
        draftState.onlineUsers =action.payload
    
      })
    case CLEAR_REDUX.CLEAR_REDUCER:
      return produce(mState, draftState => {
        draftState.allContacts = [];
        draftState.onPlatformContacts = [];
      })
    default:
      return { ...mState };
  }
}
export default ContactReducer;


