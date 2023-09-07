import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { SenderStyle, SenderDateStyle,ReceiverStyle,ReceiverDateStyle } from './messageStyles'
import ClockSvg from '../../../Assets/Icons/clockSvg'
import RefreshIconSvg from '../../../Assets/Icons/refreshIconSvg'
import { dateToShortTime } from '../../../Utils/common'
import AuthController from '../../../Controllers/authController'
import ConversationController from '../../../Controllers/conversationController'
import ReduxDispatchController from '../../../Controllers/reduxDispatchController'



const MyMessage = ({children, message,conversationDetails}) => {
    
    const isSender = message.senderId == AuthController.currentUser()._id
  
    const handleResend = (message) => {
        console.log(message)
        ConversationController.onResendMessage(conversationDetails,message,[])
        .then((result)=>{
         console.log('Successfully resendMessage')
        })
        .catch((error)=>{
          console.log(error,'Error in resendMessage')
        })
    }


    return (
        <View 
        style={{ width: '100%', justifyContent: 'flex-start', flexDirection: isSender? "row-reverse": "row" }}
        >
            <View style={{flex:1, maxWidth: 24, justifyContent:"center", alignItems:"center"}}>
                {
                    // message.status === MessageController.MESSAGE_STATUS.SENDING?
                    message.status === "sent" ?
                    <ClockSvg size={12}/>
                    :false
                }
            </View>
            <View style={isSender ? SenderStyle : ReceiverStyle}>
                 { React.cloneElement(children, {isSender})}
                <View style={{ alignItems: isSender ? 'flex-end' : 'flex-start'  }}>
                    <Text style={isSender ? SenderDateStyle : ReceiverDateStyle}>{dateToShortTime(message.time)}</Text>
                </View>
            </View>
            <View style={{flex:1, maxWidth: 50 ,justifyContent:"center", paddingLeft:5}}>
                {
                    message.status == "error"  ?
                    <TouchableOpacity 
                    onPress={()=>handleResend(message)}
                    style={{width: 40, justifyContent:"center", alignItems:"center"}}>
                        <RefreshIconSvg color={"red"}/>
                        <Text style={{fontSize: 10, marginRight: -2, color:"red"}}>Resend</Text>
                    </TouchableOpacity>: false
                }
            </View>
        </View>
    )
}

export default MyMessage

const styles = StyleSheet.create({})