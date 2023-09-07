import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../proxy";
import store from "../Store";
import ReduxDispatchController from "./reduxDispatchController";

const NETWORK_ERROR = "Internet Error"

class AuthController {

    static AUTH_STORAGE_KEY = 'whatsUpUser';

    static sendNumberForVerification = (phoneNumber) => {
        return new Promise((resolve, reject) => {
            axios
                .post(`${BASE_URL}/auth/send-otp`, { phoneNumber })
                .then(response => {
                    if (response.data.success) {
                        resolve(response.data.message);
                    } else {
                        reject(response.data.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in sendNumberForVerificationApiCall");
                    reject(NETWORK_ERROR);
                });
        })
    }

    static verifyOTP = (phoneNumber, code) => {
        return new Promise((resolve, reject) => {

            axios.post(`${BASE_URL}/auth/verify-otp`, {
                code,
                phoneNumber
            })
                .then(response => {
                    // console.log(response.data)
                    if (response.data.success) {
                        resolve(response.data.data);
                    } else {
                        reject(response.data.code);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in verifyOTPApiCall");
                    reject(NETWORK_ERROR);
                });
        })
    }


    static updateUserInfo = (phoneNumber, fullName) => {
        console.log(phoneNumber, fullName, 'dgfchgjhkjlk')
        return new Promise((resolve, reject) => {
            axios
                .patch(`${BASE_URL}/auth/update-info`, {
                    phoneNumber,
                    fullName
                })
                .then(response => {
                    if (response.data.success) {
                        resolve(response.data.data);
                    } else {
                        reject(response.data.message);
                    }
                })
                .catch(err => {
                    console.log(err, "Error in updateUserInfoApiCall");
                    reject(NETWORK_ERROR);
                });
        })
    }


    static storeCurrentUserData = (user) => {
        return new Promise((resolve, reject) => {
            ReduxDispatchController.AUTHENTICATION.setCurrentUser(user)
            AsyncStorage.setItem(AuthController.AUTH_STORAGE_KEY, JSON.stringify(user))
                .then((user) => {
                    // console.log(user)
                    resolve(user);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                })
        })
    }

    static getCurrentUserData = () => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(AuthController.AUTH_STORAGE_KEY)
                .then((user) => {
                    if (user != null) {
                        resolve(JSON.parse(user))
                    }
                    else {
                        resolve(null)
                    }
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                })
        })
    }


    static currentUser = () => {
        return store.getState().AuthReducer.currentUser;
    }

    static logout = () => {
        return new Promise((resolve, reject) => {
            ReduxDispatchController.AUTHENTICATION.setCurrentUser({})
            AsyncStorage.removeItem(AuthController.AUTH_STORAGE_KEY)
                .then((result) => {
                    console.log("AsyncStorage Data Cleared")
                    resolve(true)
                })
                .catch((error) => {
                    console.log(error, 'Error in Clearing AsyncStorage')
                    reject(error)
                })
        })
    }

}

export default AuthController