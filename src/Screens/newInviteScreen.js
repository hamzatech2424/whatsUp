import { StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import AbstractContactItem from '../Components/abstractComponents/abstractContactItem'
import { contactArray } from '../MocData/moc'
import { Colors } from '../theme'
import ContactsController, { useMergedContacts, useNewInviteContacts } from '../Controllers/contactController'
import Contacts from 'react-native-contacts';
import { phone } from 'phone';
import { navigate } from '../Navigation/mainNavigation'

const NewInviteScreen = () => {

  const [loading, setLoading] = useState(true)
  const [refreshingLoader, setRefreshingLoader] = useState(false)
  const mergedContacts = useMergedContacts()


  useEffect(() => {
      ContactsController.getAllContactsFromPhone((value) => {
        setLoading(false)
        setRefreshingLoader(false)
      })
  }, [refreshingLoader])




  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={"white"} barStyle={'dark-content'} />

      {loading ?

        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', backgroundColor: "rgba(220,220,220,0.1)" }} >
          <View style={{ marginBottom: 70 }}>
            <ActivityIndicator size={'large'} color={Colors.primaryGreen} />
            <View style={{ alignItems: 'center' }}>
              <View style={{ marginVertical: 10 }}>
                <Text style={{ color: "grey" }}>Please wait..</Text>
              </View>
              <View>
                <Text style={{ color: "grey" }}>We are synchronizing your contacts</Text>
              </View>
            </View>
          </View>
        </View>

        :

        <View style={{ width: '90%', alignSelf: 'center' }}>
          <View style={{ marginTop: 10 }} />

          <View style={{ height: '100%' }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={mergedContacts ? mergedContacts : []}
              renderItem={({ item }) => <AbstractContactItem item={item} onPress={()=>navigate('Chat',{userData:item})} />}
              keyExtractor={(item) => item._id}
              ListEmptyComponent={() => (
                <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                  <Text>No Contacts</Text>
                </View>
              )}
              refreshControl={
                <RefreshControl
                  color={'black'}
                  tintColor="black"
                  progressBackgroundColor="grey"
                  refreshing={loading}
                  onRefresh={()=>{
                    setRefreshingLoader(true)
                  }}
                />
              }
            />
          </View>

        </View>
      }

      {refreshingLoader ?
        <View style={{ ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }}>
          <ActivityIndicator size={'large'} color={Colors.primaryGreen} />
          <View style={{ marginTop: 5 }}>
            <Text style={{ color: 'white', fontWeight: '600' }}>Refreshing Results for you...</Text>
          </View>

        </View>
        : false}

    </View >
  )
}

export default NewInviteScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  }
})