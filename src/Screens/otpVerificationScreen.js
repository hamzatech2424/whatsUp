import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Keyboard,
  StatusBar
} from 'react-native';
import AbstractButton from '../Components/abstractComponents/abstractButton';
import AbstractOtpVerification from '../Components/abstractComponents/abstractOtpVerification';
import AuthController from '../Controllers/authController';
import { clearAndNavigate, navigate } from '../Navigation/mainNavigation';
import { Colors } from '../theme';

const OtpVerificationScreen = (props) => {

  const { phoneNumber } = props.route?.params
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');
  const [errorResendOtp, setErrorResendOtp] = useState('');
  const [processing, setProcessing] = useState(false);

  const isSubmittedOnce = useRef(false);

  const _handlerConfirm = () => {
    if (otp.length < 4) {
      Keyboard.dismiss();
      setError('OTP is not correct');
    } else {
      setError('');
      setProcessing(true);
      console.log(`OTP: ${otp}, PH: ${phoneNumber}`);
      AuthController.verifyOTP(phoneNumber, otp)
        .then((result) => {
          console.log(result, `OTP Verified`);
          if (result?.fullName) {
            AuthController.storeCurrentUserData(result)
              .then((result) => {
                console.log("AsyncStorage Data Saved")
                setProcessing(false);
                clearAndNavigate("App")
              })
              .catch((error) => {
                console.log(error, 'Error in Storing AsyncStorage Data')
                setProcessing(false);
                clearAndNavigate("App")
              })
          }
          else {
            setProcessing(false);
            navigate('SignIn', { phoneNumber })
          }
        })
        .catch((error) => {
          console.log(error, 'Errororo')
          setProcessing(false);
          setError(error);
        })
    }
  };

  useEffect(() => {
    if (otp.length === 6 && !isSubmittedOnce.current) {
      isSubmittedOnce.current = true;
      _handlerConfirm();
    }
  }, [otp]);

  const _handlerResendCode = () => {
    setErrorResendOtp('');
    AuthController.sendNumberForVerification(phoneNumber)
      .then((result) => {
        Toast.show('OTP Again Sent!', Toast.SHORT);
        console.log(result, `OTP sent successfully!`);
        // navigate('Verification',{phoneNumber:phoneNumber})
      })
      .catch((error) => {
        setErrorResendOtp(err);
      })
  };


  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={"white"} barStyle={'dark-content'} />
      <View style={{ width: '80%', alignSelf: "center" }}>

        <View style={{ alignItems: "center" }}>
          <View style={{ marginVertical: 5 }} >
            <Text style={{ fontSize: 17 }}>Enter 4 digits Verification code</Text>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 14 }} >
              Code send to
              <Text style={{ color: Colors.primaryGreen, fontWeight: '800' }}>
                {` ${phoneNumber}`}
              </Text>
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <AbstractOtpVerification error={error} onChangeText={setOTP} />
        </View>

        <View style={{ alignItems: 'center', marginTop: 60 }}>
          <AbstractButton
            processing={processing}
            onPress={_handlerConfirm}
            label={'Confirm'}
            width={'70%'}
            backgroundColor={Colors.primaryGreen}
          />
        </View>

        <View style={{ alignSelf: 'center', marginTop: 5, marginBottom: 15 }}>
          <Text style={styles.errorStyle}>{error}</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text >
            Don’t received the code?{' '}
            <Text
              onPress={_handlerResendCode}
              style={[
                styles.textFive,
                {
                  textDecorationLine: 'underline',
                },
              ]}>
              Resend Code
            </Text>
          </Text>
        </View>
        <View style={{ alignSelf: 'center', marginTop: 10 }}>
          <Text style={styles.errorStyle}>{errorResendOtp}</Text>
        </View>
      </View>
    </View>
  )
}

export default OtpVerificationScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
    // alignItems: "center"
  },
  errorStyle: {
    // fontFamily: 'Manrope-Regular',
    fontSize: 12.5,
    color: 'red',
    fontWeight: '600',
    paddingLeft: 10,
  },
})