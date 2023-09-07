import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../theme'
import AuthController from '../../Controllers/authController'
import { dateToShortTime } from '../../Utils/common'

const AbstractConversationItem = ({ item, onPress }) => {

  const userLoginId = AuthController.currentUser()._id
  const defaultName = item.receiver._id == userLoginId ? item?.sender?.fullName  : item?.receiver?.fullName
  const defaultLastMessage = item?.lastMessage?.msg ? item?.lastMessage?.msg : "last Message"
  const defaultTime =  item.lastMessage.time ? item.lastMessage.time : "00:00"

  return (
    <TouchableOpacity 
    onPress={onPress}
    style={styles.mainContainer}>
      <View style={styles.viewOne}>

        <View>
          <View style={[styles.nameAvatar]}>
            <Text style={{ fontWeight: '800', fontSize: 24, color: 'white', textTransform: 'capitalize' }}>{defaultName.slice(0, 1)}</Text>
          </View>
        </View>

        <View style={{ flex: 1, paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <View>
                            <Text style={{ fontWeight: '700',color:'black' }}>
                                {((item?.fullName)?.length > 20) ?
                                    (((item?.fullName).substring(0, 20 - 3)) + '...') :
                                    defaultName}
                            </Text>
                        </View>

                        <View>
                        <Text>
                                {((item?.lastMessage?.msg).length > 35) ?
                                    (((item?.lastMessage?.msg).substring(0, 35 - 3)) + '...') :
                                    defaultLastMessage}
                            </Text>
                        </View>
                    </View>

                    {item.onPlatform ? false:
                        <View style={{ position: 'absolute', right: 0,bottom:-15 }}>
                            {/* <TouchableOpacity style={styles.inviteButtonContainer} > */}
                                <Text style={{fontSize:12 }}>{dateToShortTime(defaultTime)}</Text>
                            {/* </TouchableOpacity> */}
                        </View>
                        }

                </View>

      </View>

    </TouchableOpacity>
  )
}

export default AbstractConversationItem

const styles = StyleSheet.create({
  mainContainer: {
    width: '99%',
    marginLeft:1,
    height: 75,
    backgroundColor: Colors.greySecondary,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  viewOne: {
    width: '90%',
    height: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
  },
  nameAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor:Colors.primaryGreen
},
memberText: {
  color: Colors.primaryGreen,
  fontStyle: 'italic',
  fontWeight: 'bold',
  fontSize: 10
},
inviteButtonContainer: {
  width: 70,
  height: 30,
  backgroundColor: Colors.primaryGreen,
  justifyContent: "center",
  alignItems: 'center',
  borderRadius: 5,
}
})