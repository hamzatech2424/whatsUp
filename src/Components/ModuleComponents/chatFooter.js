import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import SendBtnSvg from '../../Assets/Icons/sendBtnSvg';
import PickButton from '../../Assets/Icons/pickButton';
import AuthController from '../../Controllers/authController';
import ConversationController from '../../Controllers/conversationController';
import ReduxDispatchController from '../../Controllers/reduxDispatchController';
import { Colors } from '../../theme';
import AbstractBottomSheet from '../abstractComponents/abstractBottomSheet';
import { SheetManager } from "react-native-actions-sheet";
import MediaPickerSheet from './mediaPickerSheet';


export const MEDIA_PICKER_SHEET = "mediaPickerSheet"


const ChatFooter = ({ userDetails, conversationData, conversationDetails }) => {

  const [messageBody, setMessageBody] = useState("");

  const onSend = () => {
    setMessageBody("")
    ConversationController.onSendMessage(userDetails, conversationData, conversationDetails, messageBody,[])
      .then((result) => {
       console.log('Successfully Send Message')
      })
      .catch((error) => {
        console.log(error)
      })
  }



  return (
    <>
      <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS === "android" ? 0 : 110} behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.viewLast}>
        <View style={styles.viewLastB}>
          <TextInput
            style={styles.txtInputView}
            placeholder="Type message ..."
            placeholderTextColor={Colors.greyPrimary}
            value={messageBody}
            onChangeText={setMessageBody} />
        </View>
        <View style={styles.viewLastC}>

          <TouchableOpacity
            onPress={() => SheetManager.show(MEDIA_PICKER_SHEET)}
            style={{ width: '50%', height: "100%", justifyContent: 'center', alignItems: 'center' }}  >
            <PickButton />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onSend}
            style={{ width: '50%', height: "100%", justifyContent: 'center', alignItems: 'center' }}  >
            <SendBtnSvg />
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>

      <AbstractBottomSheet
        id={MEDIA_PICKER_SHEET}
      >
        <MediaPickerSheet 
        userDetails={userDetails}
        conversationData={conversationData}
        conversationDetails={conversationDetails}
        />
      </AbstractBottomSheet>
    </>
  );
};

export default ChatFooter;

const styles = StyleSheet.create({
  viewLast: {
    width: '100%',
    height: 55,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: Colors.greyPrimary,
    justifyContent: "center",
    alignItems: 'center'
    // backgroundColor: "blue"
    // backgroundColor:Colors.greyPrimary
  },

  viewLastB: {
    // width: '100%',
    flex: 1,
    paddingLeft: 10,
    height: 55,
    justifyContent: 'center',
    // backgroundColor:Colors.greyPrimary
    // backgroundColor: "red",
  },
  viewLastC: {
    width: '25%',
    height: 55,
    flexDirection: 'row',
    // justifyContent: "space-between",
    // alignItems: 'center',
    // paddingRight: 10,
    // backgroundColor:Colors.greyPrimary
    // backgroundColor: "pink",
  },
  txtInputView: {
    width: '100%',
    height: '80%',
    backgroundColor: Colors.greySecondary,
    // backgroundColor: 'pink',
    borderRadius: 50,
    paddingLeft: 15,
    // fontFamily: Fonts.default,
    fontSize: 14,
    color: '#50555C',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 0.9,
  },
});
