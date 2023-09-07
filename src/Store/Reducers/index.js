import {combineReducers} from 'redux';
import ContactReducer from './contactReducer';
import ConversationsReducer from './conversationsReducer';
import AuthReducer from './authReducer';

const RootReducer = combineReducers({
    ContactReducer,
    ConversationsReducer,
    AuthReducer
});
export default RootReducer;
