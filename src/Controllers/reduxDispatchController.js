import store from '../Store';
import {
  AUTH,
  CLEAR_REDUX,
  CONTACTS, CONVERSATIONS
} from '../Store/types';

class ReduxDispatchController {

  static AUTHENTICATION = {
    setCurrentUser: user => {
      store.dispatch({
        type: AUTH.SET_CURRENT_USER,
        payload: user,
      });
    },
  };

  static Contacts = {
    setAllContacts: users => {
      store.dispatch({
        type: CONTACTS.SET_ALL_CONTACTS,
        payload: users,
      });
    },
    setContactsOnPlatform: users => {
      store.dispatch({
        type: CONTACTS.SET_ON_PLATFORM_CONTACTS,
        payload: users,
      });
    },
    setContactOnLine: (contactId) => {
      store.dispatch({
        type: CONTACTS.ONLINE_CONTACT,
        payload: contactId,
      });
    },
  };

  static Conversations = {
    setAllConversations: users => {
      store.dispatch({
        type: CONVERSATIONS.SET_ALL_CONVERSATIONS,
        payload: users,
      });
    },
    setSingleConversations: conversationObj => {
      store.dispatch({
        type: CONVERSATIONS.SEND_SINGLE_CONVERSATIONS,
        payload: conversationObj,
      });
    },
    setConversation: conversationObj => {
      store.dispatch({
        type: CONVERSATIONS.SET_SINGLE_CONVERSATIONS,
        payload: conversationObj,
      });
    },
    setSingleConversationSetFirstMessage: (conversationObj, firstMessage) => {
      store.dispatch({
        type: CONVERSATIONS.SET_SINGLE_CONVERSATION_PLUS_SET_FIRST_MESSAGE,
        payload: { conversationObj, firstMessage },
      });
    },
    clearSingleConversation: clear => {
      store.dispatch({
        type: CONVERSATIONS.CLEAR_SINGLE_CONVERSATION,
        payload: clear,
      });
    },
    setLastMessage: (conversationId, messageObj) => {
      store.dispatch({
        type: CONVERSATIONS.SET_LAST_MESSAGE,
        payload: { conversationId, messageObj },
      });
    },
    setSingleConversationMessage: messageObj => {
      store.dispatch({
        type: CONVERSATIONS.SINGLE_CONVERSATIONS_SET_SINGLE_MESSAGE,
        payload: messageObj,
      });
    },
    setSingleConversationTempMessageUpdate: (tempMessage,originalMessage) => {
      store.dispatch({
        type: CONVERSATIONS.SET_SINGLE_CONVERSATION_TEMP_MESSAGE_UPDATE,
        payload:{tempMessage,originalMessage} ,
      });
    },
    setSingleConversationTempMessageStatusUpdate: (tempMessage, status) => {
      store.dispatch({
        type: CONVERSATIONS.SET_SINGLE_CONVERSATION_TEMP_MESSAGE_STATUS_UPDATE,
        payload: { tempMessage, status },
      });
    },
    setSingleConversationTempMessageLastMessage: (conversationId, messageObj) => {
      store.dispatch({
        type: CONVERSATIONS.SET_SINGLE_CONVERSATION_TEMP_MESSAGE_LAST_MESSAGE,
        payload: { conversationId, messageObj },
      });
    },
  };

  static ClearEverything = {
    clearing: clear => {
      store.dispatch({
        type: CLEAR_REDUX.CLEAR_REDUCER,
        payload: clear,
      });
    }
  }

}
export default ReduxDispatchController;
