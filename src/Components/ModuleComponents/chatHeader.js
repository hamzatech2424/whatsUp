import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../theme'
import { BackButton } from '../../Navigation/authStack'
import AuthController from '../../Controllers/authController'

const ChatHeader = ({headerDetails}) => {

    const defaultHeaderName = headerDetails?.sender?.fullName ? headerDetails?.sender?.fullName : headerDetails?.fullName

    const headerNamePicker = () => {
        if(headerDetails?.fullName){
            return headerDetails?.fullName
        }
        else if(AuthController.currentUser()._id == headerDetails?.sender?._id){
            return headerDetails?.receiver?.fullName
         }
         else if(AuthController.currentUser()._id != headerDetails?.sender?._id){
             return headerDetails?.sender?.fullName
         }
         else{
             console.log("elssseeee headerNamePicker")
         }
    }

  return (
    <View style={styles.mainContainer}>
        <View style={styles.viewOne}>
         <BackButton color={"white"} />   
        <Text style={styles.textOne}>{headerNamePicker()}</Text>
        </View>
    </View>
  )
}

export default ChatHeader

const styles = StyleSheet.create({
    mainContainer:{
        width:'100%',
        height:55,
        backgroundColor:Colors.primaryGreen,
        justifyContent:"center",
        alignItems:"center"
    },
    viewOne:{
        width:'100%',
        height:"100%",
        alignItems:"center",
        flexDirection:"row"
    },
    textOne:{
        fontSize:18,
        fontWeight:"700",
        color:'white'
    }
})