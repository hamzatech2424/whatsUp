import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AllContactsScreens from '../Screens/allContactsScreens';
import NewInviteScreen from '../Screens/newInviteScreen';
import {
  CardStyleInterpolators,
} from '@react-navigation/stack';
import MainScreen from '../Screens/mainScreen';
import { Colors } from '../theme';
import ChatScreen from '../Screens/chatScreen';
import MediaPreviewScreen from '../Screens/mediaPreviewScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
    >
      {/* <Stack.Screen name="NewInvites" component={NewInviteScreen}
        options={({ route }) => ({
          headerTitle: "WhatsUp",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      /> */}
      <Stack.Screen name="Main" component={MainScreen}
        options={({ route }) => ({
          headerShown: false,
          headerTitle: "WhatsUp",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerTintColor: "black",
          // headerStyle: {
          //   backgroundColor: Colors.primaryGreen
          // },
        })}
      />
      <Stack.Screen name="Chat" component={ChatScreen}
        options={({ route }) => ({
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />
      <Stack.Screen name="MediaPreview" component={MediaPreviewScreen}
        options={({ route }) => ({
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />

    </Stack.Navigator>
  )
}

export default AppStack
