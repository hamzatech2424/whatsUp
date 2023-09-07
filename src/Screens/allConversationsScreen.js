import { StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import AbstractConversationItem from '../Components/abstractComponents/abstractConversationItem'
import { navigate } from '../Navigation/mainNavigation'
import ContactsController, { useOnPlatformContacts } from '../Controllers/contactController'
import ConversationController, { useAllConversations } from '../Controllers/conversationController'
import ReduxDispatchController from '../Controllers/reduxDispatchController'
import { Colors } from '../theme'

const conversation = [{
  _id: 0,
  fullName: 'Ali Akbar',
  lastMessage: "Can we meet today? "
}]

const AllConversationsScreen = () => {

  const allConversations = useAllConversations()
  const [refreshingLoader, setRefreshingLoader] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ConversationController.allConversationsController(() => {
      setLoading(false)
      setRefreshingLoader(false)
    })
  }, [refreshingLoader])  

  // console.log(allConversations,'allConversationsallConversations')


  return (
    <View style={styles.mainContainer}>


      {loading ?
        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', backgroundColor: "rgba(220,220,220,0.1)" }} >
          <View style={{ marginBottom: 70 }}>
            <ActivityIndicator size={'large'} color={Colors.primaryGreen} />
            <View style={{ alignItems: 'center' }}>
              <View style={{ marginVertical: 10 }}>
                <Text style={{ color: "grey" }}>Please wait..</Text>
              </View>
              <View>
                <Text style={{ color: "grey" }}>Your Conversations are loading...</Text>
              </View>
            </View>
          </View>
        </View>
        :
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <View style={{ height: 10 }} />


          <View style={{ height: '100%' }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={allConversations ? allConversations : []}
              renderItem={({ item }) => <AbstractConversationItem item={item} onPress={() => navigate('Chat', { conversationData: item })} />}
              keyExtractor={(item) => item._id}
              ListEmptyComponent={() => (
                <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                  <Text>No Conversations</Text>
                </View>
              )}
              refreshControl={
                <RefreshControl
                  color={'black'}
                  tintColor="black"
                  progressBackgroundColor="grey"
                  refreshing={loading}
                  onRefresh={() => {
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

    </View>
  )
}

export default AllConversationsScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
})