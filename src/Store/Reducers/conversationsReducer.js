import { CLEAR_REDUX, CONVERSATIONS } from "../types"
import produce from 'immer';
import { contactArray } from "../../MocData/moc";
const state = {
  allConversations: [],
  conversation: {}
}

const ConversationsReducer = (mState = { ...state }, action) => {
  switch (action.type) {
    case CONVERSATIONS.SET_ALL_CONVERSATIONS:
      return produce(mState, draftState => {
        draftState.allConversations = action.payload;
      })
    case CONVERSATIONS.SEND_SINGLE_CONVERSATIONS:
      return produce(mState, draftState => {
        draftState.allConversations.push(action.payload)
      })
    case CONVERSATIONS.SET_SINGLE_CONVERSATIONS:
      return produce(mState, draftState => {
        draftState.conversation = action.payload
      })
    case CONVERSATIONS.SINGLE_CONVERSATIONS_SET_SINGLE_MESSAGE:
      return produce(mState, draftState => {
        if (Object.keys(draftState.conversation).length > 0) {
          draftState.conversation.messages.push(action.payload)
          // console.log(draftState.conversation,"???????")

        } else {
          draftState.conversation.messages = [action.payload]
        }
      })
    case CONVERSATIONS.SET_SINGLE_CONVERSATION_PLUS_SET_FIRST_MESSAGE:
      return produce(mState, draftState => {
        draftState.conversation = action.payload.conversationObj
        if (Object.keys(draftState.conversation).length > 0) {
          draftState.conversation.messages.push(action.payload.firstMessage)
        }
        // draftState.conversation.messages.push(action.payload.firstMessage)
      })
    case CONVERSATIONS.SET_LAST_MESSAGE:
      return produce(mState, draftState => {
        const findIndexOfConversation = draftState.allConversations.findIndex((item) => item._id == action.payload.conversationId)
        if (findIndexOfConversation >= 0) {
          draftState.allConversations[findIndexOfConversation].lastMessage = action.payload.messageObj
        }
        else {
          console.log('NahiChalalalalalla',action.payload.conversationId)
          // console.log(draftState.allConversations)
          // console.log(action.payload)
        }
      })
    case CONVERSATIONS.SET_SINGLE_CONVERSATION_TEMP_MESSAGE_UPDATE:
      return produce(mState, draftState => {
        if (Object.keys(draftState.conversation).length > 0) {
          const findIndexOfMessage = draftState.conversation.messages.findIndex((item) => item._id == action.payload.tempMessage._id)
          if (findIndexOfMessage >= 0) {
            draftState.conversation.messages[findIndexOfMessage].status = "sent"
            draftState.conversation.messages[findIndexOfMessage] = action.payload.originalMessage
          }
        } else {
          draftState.conversation.messages[findIndexOfMessage].status = "sent"
          draftState.conversation.messages = [action.payload.originalMessage]
        }
      })
    case CONVERSATIONS.SET_SINGLE_CONVERSATION_TEMP_MESSAGE_STATUS_UPDATE:
      return produce(mState, draftState => {
        if (Object.keys(draftState.conversation).length > 0) {
          const findIndexOfMessage = draftState.conversation.messages.findIndex((item) => item._id == action.payload.tempMessage._id)
          if (findIndexOfMessage >= 0) {
            draftState.conversation.messages[findIndexOfMessage].loading = false
            draftState.conversation.messages[findIndexOfMessage].status = "error"
          }
        } else {
          draftState.conversation.messages = [{ ...action.payload.tempMessage, status: "error",loading:false }]
        }
      })
    // case CONVERSATIONS.SET_SINGLE_CONVERSATION_TEMP_MESSAGE_LAST_MESSAGE:
    //   return produce(mState, draftState => {
     
    //     const findIndexOfConversation = draftState.allConversations.findIndex((item) => item._id == action.payload.conversationId)
    //     if (findIndexOfConversation >= 0) {
    //       draftState.allConversations[findIndexOfConversation].lastMessage = action.payload.messageObj
    //     }
    //     else {
    //       console.log(draftState.allConversations)
    //       console.log(action.payload)
    //     }

    //   })
    case CONVERSATIONS.CLEAR_SINGLE_CONVERSATION:
      return produce(mState, draftState => {
        draftState.conversation = {};
      })
    case CLEAR_REDUX.CLEAR_REDUCER:
      return produce(mState, draftState => {
        draftState.allConversations = [];
        draftState.conversation = {};
      })
    default:
      return { ...mState };
  }
}
export default ConversationsReducer;


