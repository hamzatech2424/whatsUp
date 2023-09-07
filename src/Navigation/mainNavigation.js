import React, { createRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import AuthStack from './authStack'
import AppStack from './appStack'
import SplashScreen from '../Screens/splashScreen';


const Stack = createStackNavigator();

export const navigationRef = createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export function clearAndNavigate(name, params) {
    navigationRef.current?.reset({
        index: 0,
        routes: [{ name }],
        params: params,
    });
}

export function goBack() {
    navigationRef.current?.goBack();
}

const MainNavigation = () => {
    return (
        <NavigationContainer
            // theme={{ colors: { background: 'black' } }}
            ref={navigationRef}
        // onReady={() => RNBootSplash.hide()}
        // onStateChange={handleNavigationBarColor}
        >
            <Stack.Navigator>

            <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{
                        headerShown: false,
                        gestureEnabled: true,
                        animation: 'slide_from_right',
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }}
                />
                

                <Stack.Screen
                    name="Auth"
                    component={AuthStack}
                    options={{
                        headerShown: false,
                        gestureEnabled: true,
                        animation: 'slide_from_right',
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }}
                />

                <Stack.Screen
                    name="App"
                    component={AppStack}
                    options={{
                        headerShown: false,
                        gestureEnabled: true,
                        animation: 'slide_from_right',
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }}
                />


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation

