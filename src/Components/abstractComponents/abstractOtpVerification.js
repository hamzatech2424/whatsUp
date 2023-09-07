import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import CursorSvg from '../../Assets/Icons/cursorSvg';
import { Colors } from '../../theme';


const CELL_COUNT = 4;

const AbstractOtpVerification = ({onChangeText,error}) => {

    const [OTP, setOtp] = useState('');

    useEffect(()=>{
      onChangeText(OTP)
    },[OTP])
  
  


  return (
    <View>
    <CodeField
      value={OTP}
      cellCount={CELL_COUNT}
      caretHidden={false}
      onSubmitEditing={() => Keyboard.dismiss()}
      textContentType="oneTimeCode"
      onChangeText={setOtp}
      keyboardType="number-pad"
      keyboardAppearance={'dark'}
      renderCell={({ index, symbol, isFocused }) => (
        <View
          key={index}
          style={[styles.cellView,{borderColor:error?'red':'grey'}]}>
          <Text style={[styles.textTwo, { fontSize:24}]}>
            {isFocused ? <Cursor cursorSymbol={<CursorSvg />} /> : symbol}
          </Text>
        </View>
      )}
    />
  </View>
  )
}

export default AbstractOtpVerification

const styles = StyleSheet.create({
    textTwo: {
    //   fontFamily: 'Manrope-Regular',
      color: Colors.whitePrimary,
      fontSize:13,
    },
    cellView: {
      backgroundColor: Colors.greyPrimary,
      height: 50,
      width:50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      borderWidth:1,
      marginHorizontal:5,
    },
  });