import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../theme'
import AuthController from '../Controllers/authController'
import { clearAndNavigate, navigate } from '../Navigation/mainNavigation'
import ReduxDispatchController from '../Controllers/reduxDispatchController'
import MySocketController from '../SocketController'

const SplashScreen = () => {

    useEffect(() => {
        AuthController.getCurrentUserData()
            .then((result) => {
                // console.log(result, 'resultbvnbmn,m')
                if (result == null) {
                    MySocketController.init()
                    navigate('Auth')
                }
                else {
                    ReduxDispatchController.AUTHENTICATION.setCurrentUser(result)
                    MySocketController.init()
                    clearAndNavigate("App")
                }
            })
            .catch((error) => {
                console.log(error)
            })
  

    }, [])


    return (
        <View style={styles.mainContainer}>
            <Text style={{ color: "white" }}>SplashScreen</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: Colors.greyPrimary
    }
})