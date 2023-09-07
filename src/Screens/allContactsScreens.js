import { StyleSheet, Text, View, FlatList, ActivityIndicator,  RefreshControl,StatusBar,Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import AbstractContactItem from '../Components/abstractComponents/abstractContactItem'
import { Colors } from '../theme'
import ContactsController, { useOnPlatformContacts } from '../Controllers/contactController'
import ConversationController from '../Controllers/conversationController'


const SW = Dimensions.get('window').width
const SH = Dimensions.get('window').height


const AllContactsScreens = () => {

  const [loading, setLoading] = useState(true)
  const [refreshingContacts,setRefreshContacts] = useState(false)
  const allContactsOnPlatform = useOnPlatformContacts()

  // useEffect(()=>{

  //   setTimeout(()=>{
  //     setLoading(false)
  //   },3000)

  // },[])

  useEffect(()=>{

    setTimeout(()=>{
      setRefreshContacts(false)
    },3000)

  },[refreshingContacts])


  useEffect(()=>{
    ContactsController.getAllContactsFromPhone((value)=>{
      setLoading(false)
    })
  },[])



  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={"white"} barStyle={'dark-content'}  />

      {loading ?

        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', backgroundColor: "rgba(220,220,220,0.1)" }} >
          <View style={{ marginBottom: 70 }}>
            <ActivityIndicator size={'large'} color={Colors.primaryGreen} />
            <View style={{ alignItems: 'center' }}>
              <View style={{marginVertical:10}}>
                <Text style={{color:"grey"}}>Please wait..</Text>
              </View>
              <View>
                <Text style={{color:"grey"}}>Loading your contacts</Text>
              </View>
            </View>
          </View>
        </View>

        :

        <View style={{ width: '90%', alignSelf: 'center' }}>
          <View style={{ marginTop: 10 }} />

          <View style={{height:'100%'}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={allContactsOnPlatform}
              renderItem={({ item }) => <AbstractContactItem item={item} />}
              keyExtractor={item => item?._id}
              initialNumToRender={10}
              refreshControl={
                <RefreshControl
                  color={'black'}
                  tintColor="black"
                  progressBackgroundColor="grey"
                  refreshing={refreshingContacts}
                  onRefresh={()=>setRefreshContacts(true)}
                />
              }
            />
          </View>

          {/* <View>
             <AbstractButton
             label={"All Contacts"}
             width={'100%'}
             />
            </View> */}

        </View>
      }
    </View >
  )
}

export default AllContactsScreens

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  }
})