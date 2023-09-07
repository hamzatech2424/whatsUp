import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { Colors } from '../theme';
import NewInviteScreen from '../Screens/newInviteScreen';
import AllConversationsScreen from '../Screens/allConversationsScreen';

const Tab = createMaterialTopTabNavigator();


const TopBarCustomNavigation = () => {
    return (
        <Tab.Navigator
          screenOptions={{
            gestureEnabled: false,
            swipeEnabled: true,
            tabBarStyle: {backgroundColor: Colors.primaryGreen},
            tabBarActiveTintColor: "white" ,
            tabBarLabelStyle: {
              textTransform:"capitalize",
              fontSize: 15,
              fontWeight:'500'
            },
            tabBarIndicatorStyle: {backgroundColor: "white"},
            tabBarPressOpacity:1,
            keyboardDismissMode:"auto",
            tabBarPressColor:Colors.primaryGreen,
          }}>
          <Tab.Screen
            name="Invite"
            component={NewInviteScreen}
          />
          <Tab.Screen name="Conversations" component={AllConversationsScreen} />
        </Tab.Navigator>
  )
}

export default TopBarCustomNavigation

