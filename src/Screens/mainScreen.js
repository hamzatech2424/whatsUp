import React, { useEffect } from 'react'
import TopBarCustomNavigation from '../Navigation/topbarCustomNavigation'
import { View, Text, StyleSheet, TouchableOpacity,SafeAreaView } from 'react-native'
import { Colors } from '../theme'
import AuthController from '../Controllers/authController'
import { useSelector } from 'react-redux'
import LogOutButton from '../Components/ModuleComponents/logOutButton'


const MainScreen = () => {

  return (
    <>
      <SafeAreaView
      
      style={{flex:1}}
      >
        <View style={styles.mainContainer}>
        <View style={{ paddingLeft: 20,flexDirection:"row",alignItems:"center" }}>
          <Text style={{ fontWeight: '500', color: 'white', fontSize: 22 }}>WhatsUp</Text>
          <Text style={{color:'black',fontWeight:"600",fontSize:19}}>{` ${AuthController.currentUser().fullName}`}</Text>
        </View>

        <View style={{ marginRight: 20 }}>
          <LogOutButton />
        </View>
        </View>
      <TopBarCustomNavigation />

      </SafeAreaView>
    </>
  )
}

export default MainScreen

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.primaryGreen,
    justifyContent: 'center',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },

})

