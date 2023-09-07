import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../proxy';
import store from '../Store';
import AuthController from './authController';
import ReduxDispatchController from './reduxDispatchController';


const NETWORK_ERROR = "Internet Error"


class ConversationController {

  static getAllConversations() {
    return new Promise((resolve, reject) => {

      const userID = AuthController.currentUser()._id

      axios
        .get(`${BASE_URL}/conversation/get-all-conversations/${userID}`)
        .then(response => {
          if (response.data.success) {
            resolve(response.data.data);
          } else {
            reject(response.data.message);
          }
        })
        .catch(err => {
          console.log(err, "Error in getAllConversationsApiCall");
          reject(NETWORK_ERROR);
        });
    })
  }


  static allConversationsController = (_callback = () => false) => {

    ConversationController.getAllConversations()
      .then((result) => {
        ReduxDispatchController.Conversations.setAllConversations(result)
        _callback(false)
      })
      .catch((error) => {
        console.log(error)
        _callback(false)
      })

  }

  static sendMessage(message, arrayOfFiles) {
    return new Promise((resolve, reject) => {

      if (arrayOfFiles.length > 0) {
        console.log('Files hai Sath')
        const { files,loading, ...rest } = message
        let formData = new FormData();
        formData.append('data', JSON.stringify(rest));

        for (let index = 0; index < arrayOfFiles.length; index++) {
          formData.append('images', arrayOfFiles[index])
        }


        axios({
          url: `${BASE_URL}/conversation/send-msg`,
          data: formData,
          headers: {
            "content-type": "multipart/form-data",
          },
          method: "POST",
          onUploadProgress: (progressEvent) => {
            let percentComplete = progressEvent.loaded / progressEvent.total
            percentComplete = parseInt(percentComplete * 100);
            console.log(percentComplete,'percentCompletepercentComplete');
          },
        })

          .then(response => {
            console.log(response.data, 'response Datatatata')
            if (response.data.success) {
              resolve(response.data.data);
            } else {
              reject(response.data.message);
            }
          })
          .catch(err => {
            console.log(err, "Error in sendMessageApiCall");
            reject(NETWORK_ERROR);
          });
      }
      else {

        let stringifyObject = JSON.stringify(message)

        let formData = new FormData();
        formData.append('data', stringifyObject);

        axios({
          url: `${BASE_URL}/conversation/send-msg`,
          data: formData,
          headers: {
            "content-type": "multipart/form-data",
          },
          method: "POST",
          onUploadProgress: (progressEvent) => {
            let percentComplete = progressEvent.loaded / progressEvent.total
            percentComplete = parseInt(percentComplete * 100);
            console.log(percentComplete,'percentCompletepercentComplete');
            _progressCallback(percentComplete)
          },
        })
          .then(response => {
            if (response.data.success) {
              resolve(response.data.data);
            } else {
              reject(response.data.message);
            }
          })
          .catch(err => {
            console.log(err, "Error in sendMessageApiCall");
            reject(NETWORK_ERROR);
          });
      }

    })
  }


  static getSingleConversations(registeredUserId) {
    return new Promise((resolve, reject) => {
      const userID = AuthController.currentUser()._id
      axios
        .get(`${BASE_URL}/conversation/get-single-chat/${userID}/${registeredUserId}`)
        .then(response => {
          if (response.data.success) {
            resolve(response.data.data);
          } else {
            reject(response.data.message);
          }
        })
        .catch(err => {
          console.log(err, "Error in getSingleConversationsApiCall");
          reject(NETWORK_ERROR);
        });
    })
  }

  static idPicker = (userDetails, conversationData) => {
    if (userDetails?._id) {
      return userDetails?._id
    }
    else if (AuthController.currentUser()._id == conversationData?.sender?._id) {
      return conversationData?.receiver?._id
    }
    else if (AuthController.currentUser()._id != conversationData?.sender?._id) {
      return conversationData?.sender?._id
    }
    else {
      console.log('elssssssssse idPicker')
    }
  }

  static onSendMessage = (userDetails, conversationData, conversationDetails, messageBody, files) => {
    return new Promise((resolve, reject) => {

      const textObject = {
        _id: `${Math.floor(Math.random() * 12345678910)}`,
        msg: messageBody,
        senderId: AuthController.currentUser()._id,
        receiverId: ConversationController.idPicker(userDetails, conversationData),
        time: new Date(),
        messageType: "text",
        status: "sent"
      }

      const mediaObject = {
        _id: `${Math.floor(Math.random() * 12345678910)}`,
        msg: messageBody,
        senderId: AuthController.currentUser()._id,
        receiverId: ConversationController.idPicker(userDetails, conversationData),
        time: new Date(),
        messageType: "media",
        files,
        status: "sent",
        loading:true
      }

      const objectToBeSend = files.length > 0 ? mediaObject : textObject


      ReduxDispatchController.Conversations.setSingleConversationMessage(objectToBeSend)
      ConversationController.sendMessage(objectToBeSend, files, _progressCallback = () => false)
        .then((result) => {
          console.log(result, 'resultttttttttttttt')
          if (result.conversation) {
            ReduxDispatchController.Conversations.setSingleConversations(result.conversation)
            ReduxDispatchController.Conversations.setSingleConversationTempMessageUpdate(objectToBeSend, {...result.message,loading:false})
            resolve(result)
          }
          if (Object.keys(conversationDetails).length > 0) {
            ReduxDispatchController.Conversations.setSingleConversationTempMessageUpdate(objectToBeSend, {...result.message,loading:false})
            // console.log(conversationDetails,'ChatFooter')
            ReduxDispatchController.Conversations.setLastMessage(result.conversationId, {...result.message,loading:false})
            resolve(result)
          }
        })
        .catch((error) => {
          console.log(error, 'ConversationControllerApi')
          console.log(objectToBeSend)
          ReduxDispatchController.Conversations.setSingleConversationTempMessageStatusUpdate({...objectToBeSend,loading:false}, "error")
          reject(error)
        })

    })
  }


  static onResendMessage = (conversationDetails, message, files) => {
    return new Promise((resolve, reject) => {
      ConversationController.sendMessage({ ...message, status: "sent" }, files)
        .then((result) => {
          // console.log(result, 'resultttttttttttttt')
          if (result.conversation) {
            ReduxDispatchController.Conversations.setSingleConversations(result.conversation)
            ReduxDispatchController.Conversations.setSingleConversationTempMessageUpdate(message, result.message)
            resolve(result)
          }
          if (Object.keys(conversationDetails).length > 0) {
            ReduxDispatchController.Conversations.setSingleConversationTempMessageUpdate(message, result.message)
            ReduxDispatchController.Conversations.setLastMessage(result.conversationId, result.message)
            resolve(result)
          }
        })
        .catch((error) => {
          console.log(error, 'ConversationControllerApi')
          ReduxDispatchController.Conversations.setSingleConversationTempMessageStatusUpdate(message, "error")
          reject(error)
        })
    })
  }



}

export default ConversationController

export const useAllConversations = () => {
  return useSelector((state) => state.ConversationsReducer.allConversations)
}


// export const useSpecificConversation = (specificId) => {
//   const allConversations = useSelector((state) => state.ConversationsReducer.allConversations)
//   return allConversations.find((item) => item._id == specificId)
// }


export const useSingleConversation = (conversationId) => {

  const conversationDetails = useSelector((state) => state.ConversationsReducer.conversation)
  const [conversationLoading, setConversationLoading] = useState(true)
  // console.log(conversationDetails,"|||||||||")
  const requestForSingleConversation = (_callback = () => false) => {
    setConversationLoading(true)
    ConversationController.getSingleConversations(conversationId)
      .then((result) => {
        if (result) {
          // console.log(result)
          ReduxDispatchController.Conversations.setConversation(result)
        }
        _callback(false)
        setConversationLoading(false)
      })
      .catch((error) => {
        console.log(error, 'error in useSingleConversation')
        _callback(false)
        setConversationLoading(false)
      })
  }

  useEffect(() => {
    requestForSingleConversation()
  }, [])


  return { conversationDetails, conversationLoading, requestForSingleConversation }

}