import { ActivityIndicator, StatusBar, StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import ChatHeader from '../Components/ModuleComponents/chatHeader'
import ChatFooter from '../Components/ModuleComponents/chatFooter'
import MyMessage from '../Components/ModuleComponents/myMessage'
import { dummyMessages } from '../Utils/moc'
import MessgaeBody from '../Components/ModuleComponents/myMessage/messgaeBody'
import ConversationController, { useSingleConversation } from '../Controllers/conversationController'
import { Colors } from '../theme'
import AuthController from '../Controllers/authController'
import AbstractBottomSheet from '../Components/abstractComponents/abstractBottomSheet'

const ChatScreen = ({ route }) => {

    const conversationData = route.params?.conversationData
    const userData = route.params?.userData
    const [refreshLoader, setRefreshLoader] = useState(false)
    const flatListRef = useRef(null)
    const { conversationDetails, conversationLoading, requestForSingleConversation } = useSingleConversation(ConversationController.idPicker(userData,conversationData))

    // console.log(conversationDetails,'conversationDetailsconversationDetails')
    // console.log(conversationDetails._id,'conversationDetailsconversationDetails')

    return (
        <>
            <View style={styles.mainContainer}>
                <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
                <ChatHeader headerDetails={conversationData ? conversationData : userData} />
                <View style={{ width: '95%', alignSelf: "center", flex: 1 }}>

                    <FlatList
                        ref={flatListRef}
                        // onContentSizeChange={() => flatListRef.current.scrollToEnd({animated:false})}
                        // contentContainerStyle={{ flexDirection: 'column-reverse' }}
                        showsVerticalScrollIndicator={false}
                        // data={conversationDetails.messages ? conversationDetails.messages.slice() : []}
                        inverted={-1}
                        data={conversationDetails?.messages?.slice()?.reverse() || []}
                        renderItem={({ item }) => {
                            return (
                                <MyMessage
                                    conversationDetails={conversationDetails}
                                    message={item}
                                >
                                    <MessgaeBody item={item} />
                                </MyMessage>
                            )
                        }}
                        keyExtractor={(item) => item._id}
                        // refreshControl={
                        //     <RefreshControl
                        //         color={'black'}
                        //         tintColor="black"
                        //         progressBackgroundColor="grey"
                        //         refreshing={refreshLoader}
                        //         onRefresh={() => {
                        //             setRefreshLoader(true)
                        //             requestForSingleConversation(() => {
                        //                 setRefreshLoader(false)
                        //             })
                        //         }}
                        //     />
                        // }
                    />

                </View>
                <ChatFooter userDetails={userData} conversationData={conversationData} conversationDetails={conversationDetails} />
            </View>

            {conversationLoading ?
                <View style={{ ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }} >
                    <ActivityIndicator size={'large'} color={Colors.primaryGreen} />
                </View>
                : false
            }
        </>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
})