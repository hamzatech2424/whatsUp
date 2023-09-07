import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useState } from 'react'
import AbstractTextInput from '../Components/abstractComponents/abstractTextInput';
import AbstractButton from '../Components/abstractComponents/abstractButton';
import AuthController from '../Controllers/authController';
import { clearAndNavigate } from '../Navigation/mainNavigation';

const SignInScreen = (props) => {

    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const { phoneNumber } = props.route?.params;

    const onNext = () => {
        setError('');
        setProcessing(true)
        if (fullName.trim()) {
            AuthController.updateUserInfo(phoneNumber, fullName)
                .then((result) => {
                    console.log(result);
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
                })
                .catch((error) => {
                    setProcessing(false);
                    setError(error);
                })
        }
        else {
            setProcessing(false);
            setError('Enter Valid Full Name')
        }
    }

    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={"white"} barStyle={'dark-content'} />
            <View style={{ width: '90%', alignSelf: 'center' }}>
                <View style={{ marginBottom: 10 }}>
                    <AbstractTextInput
                        placeHolder={'Enter Full Name'}
                        value={fullName}
                        onChangeText={txt => setFullName(txt)}
                        error={error} />
                </View>

                <View style={{ alignItems: 'center' }}>
                    <AbstractButton
                        label={"Next"}
                        width={'80%'}
                        onPress={onNext}
                        processing={processing}
                    />

                    <View style={{ alignSelf: 'center', marginTop: 10 }}>
                        <Text style={styles.errorStyle}>{error}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    errorStyle: {
        fontSize: 13,
        color: 'red',
        fontWeight: '600',
        paddingLeft: 10,
    },
})