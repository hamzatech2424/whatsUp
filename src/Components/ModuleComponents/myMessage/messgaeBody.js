import { StyleSheet, Text, View, Image,TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { SenderText, ReceiverText } from '../../ModuleComponents/myMessage/messageStyles'
import AuthController from '../../../Controllers/authController'
import ImageContainer from './mediaContainers/imageContainer'
import VideoContainer from './mediaContainers/videoContainer'
import { navigate } from '../../../Navigation/mainNavigation'
import AudioPlayerChatUi from "../myMessage/mediaContainers/audioPlayerChatUi"


const MessageMedia = ({ message }) => {
    const isSender = message.senderId == AuthController.currentUser()._id
    if (message.files) {
        return message.files.map((item) => {
            if (item.filetype == "image/png" || item.type == "image/png") {
                return (
                    <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={()=> navigate('MediaPreview', { mediaDetails: { mediaType: "Image", source: item.url,purpose:'preview' } })}
                    style={{ width: 200, maxHeight: 200, margin: 2, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                        <ImageContainer loading={message.loading} url={item.url || item.uri} />
                    </TouchableOpacity>
                )
            }
            else if (item.filetype == "audio/mp3" || item.type == "audio/mp3") {
                return (
                   <AudioPlayerChatUi loading={message.loading} url={item.url || item.uri} isSender={isSender} senderData={AuthController.currentUser()} />
                )
            }
            else if (item.filetype == "video/mp4" || item.type == "video/mp4") {
                return (
                    <View style={{ width: 200, maxHeight: 200, margin: 2, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                        <VideoContainer loading={message.loading} url={item.url || item.uri} />
                    </View>
                )
            }
            else {
                return (
                    <View style={{ width: 200, maxHeight: 200, margin: 2, borderTopLeftRadius: 16, borderTopRightRadius: 16,justifyContent:'center',alignItems:'center' }}>
                        <ImageContainer loading={message.loading} url={item.url || item.uri} />
                        {/* <ActivityIndicator size={'small'} color={'white'} /> */}
                    </View>
                )
            }
        })

    }

}


const MessageText = ({ message }) => {

    const isSender = message.senderId == AuthController.currentUser()._id

    return (
        <View>
            <Text style={isSender ? SenderText : ReceiverText}>{message?.msg}</Text>
        </View>
    )
}


const MessgaeBody = ({ item }) => {

    switch (item.messageType) {
        case 'media':
            return <MessageMedia message={item} />
            break;
        case 'Text':
            return <MessageText message={item} />
            break
        default: return <MessageText message={item} />
    }

}

export default MessgaeBody

const styles = StyleSheet.create({})