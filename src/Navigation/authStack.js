import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CreatAccountScreen from '../Screens/creatAccountScreen';
import OtpVerificationScreen from '../Screens/otpVerificationScreen';
import SignInScreen from '../Screens/signInScreen';
import { TouchableOpacity } from 'react-native';
import BackButtonSvg from '../Assets/Icons/backButtonSvg';
import { goBack } from './mainNavigation';
import {
  CardStyleInterpolators,
} from '@react-navigation/stack';
import ReduxDispatchController from '../Controllers/reduxDispatchController';

const Stack = createStackNavigator();

const BackButton = ({ color }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        ReduxDispatchController.Conversations.clearSingleConversation()
        goBack()
      }}
      style={{ width: 50, height: 50, justifyContent: "center", alignItems: 'center' }}>
      <BackButtonSvg color={color} />
    </TouchableOpacity>
  )
}



const AuthStack = () => {
  return (
    <Stack.Navigator >

      <Stack.Screen name="CreateAccount" component={CreatAccountScreen}
        options={({ route }) => ({
          headerTitle: "Sign In",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })} />

      <Stack.Screen name="Verification" component={OtpVerificationScreen}
        options={({ route }) => ({
          headerLeft: () => <BackButton />,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })} />

      <Stack.Screen name="SignIn" component={SignInScreen}
        options={({ route }) => ({
          headerTitle: "Create Account",
          headerLeft: () => <BackButton />,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />

    </Stack.Navigator>
  )
}

export default AuthStack
export { BackButton }
