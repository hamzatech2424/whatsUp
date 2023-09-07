import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../theme'
import AuthController from '../../Controllers/authController'
import { clearAndNavigate } from '../../Navigation/mainNavigation'
import ReduxDispatchController from '../../Controllers/reduxDispatchController'

const LogOutButton = () => {

    const [loading, setLoading] = useState(false)

    const onLogOutPress = () => {
        setLoading(true)
        AuthController.logout()
            .then(() => {
                setLoading(false)
                ReduxDispatchController.ClearEverything.clearing()
                clearAndNavigate("Auth")
            }).catch((error) => {
                setLoading(false)
                console.log(error)
                Alert.alert(error)
            })
    }


    return (
        <TouchableOpacity
            onPress={onLogOutPress}
            disabled={loading}
            style={styles.buttonView}>
            {loading ?
                <ActivityIndicator size={'small'} color={'black'} />
                :
                <Text style={{ color: 'black' }}>Log Out</Text>
            }
        </TouchableOpacity>
    )
}

export default LogOutButton

const styles = StyleSheet.create({
    buttonView: {
        width: 80,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: Colors.greyPrimary
    }
})