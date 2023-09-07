import { StyleSheet, Text, View, Keyboard,StatusBar } from 'react-native'
import React, { useState, useRef } from 'react';
import AbstractPhoneNumberTextInput from '../Components/abstractComponents/abstractPhoneNumberTextInput'
import AbstractButton from '../Components/abstractComponents/abstractButton';
import AuthController from '../Controllers/authController';
import { navigate } from '../Navigation/mainNavigation';

const CreatAccountScreen = () => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [processing, setProcessing] = useState(false);
  const phoneRef = useRef();
  const [error, setError] = useState('');

  const _handleNext = () => {
    setProcessing(true);
    phoneRef.current
      .validate()
      .then(phoneNo => {
        Keyboard.dismiss();
        setError('');
        AuthController.sendNumberForVerification(phoneNo)
          .then((result) => {
            console.log(result, `OTP sent successfully!`);
            setProcessing(false);
            navigate('Verification', { phoneNumber: phoneNo })
          })
          .catch((error) => {
            setProcessing(false);
            setError(error);
          })
      })
      .catch(err => {
        console.log(err);
        setProcessing(false);
        // setError(`Invalid phone number.`);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={"white"} barStyle={'dark-content'} />
      <View style={{ width: '90%', alignSelf: 'center' }}>

        <View style={{ marginBottom: 10 }}>
          <AbstractPhoneNumberTextInput
            placeHolder={'Mobile number'}
            label={'Phone number'}
            value={phoneNumber}
            onChangeText={txt => setPhoneNumber(txt)}
            ref={phoneRef}
          />
        </View>

        <View style={{ alignItems: 'center' }}>
          <AbstractButton
            processing={processing}
            onPress={_handleNext}
            label={"Next"}
            width={'70%'}
          />
        </View>

        <View style={{ alignSelf: 'center', marginTop: 10 }}>
          <Text style={styles.errorStyle}>{error}</Text>
        </View>

      </View>
    </View>
  )
}

export default CreatAccountScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: 'white'
  },
  errorStyle: {
    fontSize: 13,
    color: 'red',
    fontWeight: '600',
    paddingLeft: 10,
  },
})