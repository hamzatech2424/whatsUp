import { StyleSheet, Text, View, TouchableOpacity, Alert, Platform } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../theme'
import ImageSvg from '../../Assets/Icons/imageSvg'
import AudioSvg from '../../Assets/Icons/audioSvg'
import CameraSvg from '../../Assets/Icons/cameraSvg'
import ImagePicker from 'react-native-image-crop-picker';
import { SheetManager } from "react-native-actions-sheet";
import { MEDIA_PICKER_SHEET } from './chatFooter'
import { navigate } from '../../Navigation/mainNavigation'
import AbstractBottomSheet from '../abstractComponents/abstractBottomSheet'
import AudioPlayerUi from '../ModuleComponents/myMessage/audioPlayerUi'
import ConversationController from '../../Controllers/conversationController'

const VOICE_RECORDER_SHEET = "VoiceRecorderSheet"


const MediaButton = ({ icon, label, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={styles.viewButtonOne}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={styles.buttonCircle}>
                    {icon ? icon() : false}
                </View>
                <View style={{ marginTop: 5 }}>
                    <Text style={{ color: "black" }}>{label ? label : "text"}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}




const MediaPickerSheet = ({ userDetails, conversationData, conversationDetails }) => {

    const [imageUrl, setImageUrl] = useState("")
    const [videoUrl, setVideoUrl] = useState("")


    const onPressImage = () => {
        SheetManager.hide(MEDIA_PICKER_SHEET)
        ImagePicker.openPicker({
            width: 400,
            height: 500,
            cropping: false
        }).then(image => {
            console.log(image)
            setImageUrl(image.path)
            const fileObj = {
                uri: image.path,
                type: image.mime,
                name: `profile-${Math.random() * Math.random() * 10000000000000}.jpg`,
            }
            navigate('MediaPreview',
                {
                    mediaDetails: {
                        mediaType: "Image",
                        source: fileObj,
                        userDetails,
                        conversationData,
                        conversationDetails
                    }
                }
            )
        }).catch((error) => {
            console.log(error, 'Error in picking Image')
            Alert.alert('Error in loading Image')
        })
    }


    const onPressVideo = () => {
        SheetManager.hide(MEDIA_PICKER_SHEET)
        ImagePicker.openPicker({
            mediaType: "video",
        }).then((video) => {
            setVideoUrl(video.path)
            const fileObj = {
                uri: video.path,
                type: video.mime,
                name: `profile-${Math.random() * Math.random() * 10000000000000}.mp4`,
            }
            navigate('MediaPreview', {
                mediaDetails: {
                    mediaType: "Video",
                    source: fileObj,
                    userDetails,
                    conversationData,
                    conversationDetails
                }
            })
            console.log(video);
        }).catch((error) => {
            console.log(error, 'Error in picking Video')
            Alert.alert('Error in loading video')
        })
    }


    const onPressAudio = () => {
        // SheetManager.hide(MEDIA_PICKER_SHEET)
        SheetManager.show(VOICE_RECORDER_SHEET)
    }

    const audioFileCaptured = (finalResult) => {
        console.log(finalResult,'finalResult')
        const fileObj = {
            uri: finalResult,
            type:"audio/mp3",
            name:Platform.OS == "android" ?`profile-${Math.random() * Math.random() * 10000000000000}.mp3` :`profile-${Math.random() * Math.random() * 10000000000000}.m4a` ,
        }
        ConversationController.onSendMessage(
             userDetails,
             conversationData,
             conversationDetails,
            "voiceNote",
            [fileObj]
        )
            .then((result) => {
                console.log(result, 'resultresult')
                SheetManager.hideAll()
                // goBack()
            })
            .catch((error) => {
                console.log(error, 'Error in onSenMessage audioFileCapturedMediaPickerSheet')
            })
    }





    return (
        <>
            <View style={styles.mainContainer}>

                <View style={{ width: '85%', alignSelf: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <MediaButton label={'Image'} icon={() => <ImageSvg />} onPress={onPressImage} />
                        <MediaButton label={'Video'} icon={() => <CameraSvg />} onPress={onPressVideo} />
                        <MediaButton label={'Voice'} icon={() => <AudioSvg />} onPress={onPressAudio} />
                    </View>
                </View>

            </View>

            <AbstractBottomSheet
                id={VOICE_RECORDER_SHEET}
            >
                <AudioPlayerUi audioFileCaptured={audioFileCaptured} />
            </AbstractBottomSheet>
        </>

    )
}

export default MediaPickerSheet

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: 130,
    },
    viewButtonOne: {
        width: 90,
        height: 100,
        // backgroundColor: 'red',
        justifyContent: "center",
        alignItems: 'center'
    },
    buttonCircle: {
        width: 65,
        height: 65,
        backgroundColor: Colors.primaryGreen,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: 'center'
    }
})