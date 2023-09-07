import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import { Colors } from '../theme'
import SendBtnSvg from '../Assets/Icons/sendBtnSvg'
import BackButtonSvg from '../Assets/Icons/backButtonSvg'
import { goBack } from '../Navigation/mainNavigation'
import ImageCompo from '../Components/ModuleComponents/imageCompo'
import VideoCompo from '../Components/ModuleComponents/videoCompo'
import ConversationController from '../Controllers/conversationController'

const SH = Dimensions.get('window').height

const MediaPreviewScreen = ({ route }) => {

    const { mediaDetails } = route.params
    // const [loading, setLoading] = useState(false)


    const onPreviewScreenSendButton = () => {
        goBack()
        // setLoading(true)
        ConversationController.onSendMessage(
            mediaDetails.userDetails,
            mediaDetails.conversationData,
            mediaDetails.conversationDetails,
            "bodyOfMessage",
            [mediaDetails.source]
        )
            .then((result) => {
                console.log(result, 'resultresult')
                // setLoading(false)
            })
            .catch((error) => {
                // setLoading(false)
                console.log(error, 'Error in onSenMessage PreviewScreen')
            })
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.viewOne}>

                {mediaDetails.mediaType == "Image" ?
                    <ImageCompo mediaDetails={mediaDetails} />
                    : false}

                {mediaDetails.mediaType == "Video" ?
                    <VideoCompo mediaDetails={mediaDetails} />
                    : false}

            </View>

            <View style={{ position: 'absolute', left: 10, top: 20 }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{ padding: 10 }}
                    onPress={() => goBack()}
                >
                    <BackButtonSvg color={'white'} />
                </TouchableOpacity>
            </View>

            {mediaDetails.purpose == "preview" ? false :
                <View style={{ position: 'absolute', right: 20, bottom: 20 }}>
                    <TouchableOpacity
                        // disabled={loading}
                        activeOpacity={0.9}
                        onPress={onPreviewScreenSendButton}
                        style={styles.sendButton}>
                        {/* {loading ?
                            <ActivityIndicator size={"small"} color={'white'} /> :
                            <SendBtnSvg size={22} color={'white'} />
                        } */}
                     <SendBtnSvg size={22} color={'white'} />
                    </TouchableOpacity>
                </View>
            }

        </View>
    )
}

export default MediaPreviewScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: "center",
        alignItems: 'center'
    },
    viewOne: {
        width: '100%',
        height: 400,
        backgroundColor: 'black'
    },
    sendButton: {
        width: 50,
        height: 50,
        backgroundColor: Colors.primaryGreen,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: 'center'
    }
})