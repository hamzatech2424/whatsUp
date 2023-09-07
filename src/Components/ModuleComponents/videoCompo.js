import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import Video from 'react-native-video';
import { Colors } from '../../theme';

const VideoCompo = ({ mediaDetails }) => {

    const videoRef = useRef()
    const [pauseVideo, setPauseVideo] = useState(false)
    const [mutedVideo, setMutedVideo] = useState(false)
    const [videoLoading, setVideoLoading] = useState(true)
    const [videoBuffer, setVideoBuffer] = useState(false)
    const [videoPlayerRender, setVideoPlayerRender] = useState(true)
    const [errorModal, setErrorModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    // console.log()

    return (
        <>
            <View style={styles.mainContainer}>
                <Video
                    ref={videoRef}
                    source={{ uri: mediaDetails.source.uri || mediaDetails.source  }}
                    style={{ flex: 1 }}
                    onBuffer={(buffer) => {
                        setVideoBuffer(buffer.isBuffering)
                    }}
                    onError={(error) => {
                        if (error.error.errorString) {
                            setVideoLoading(false)
                            setErrorModal(true)
                            setErrorMessage("Internet not available")
                        }
                        else {
                            setVideoLoading(false)
                            setErrorModal(true)
                            setErrorMessage(error.error.errorString)
                        }
                    }}
                    paused={pauseVideo}
                    muted={mutedVideo}
                    controls={true}
                    preventsDisplaySleepDuringVideoPlayback={true}
                    disableFocus={true}
                    // fullscreen={true}
                    fullscreenOrientation={"all"}
                    resizeMode={"cover"}
                    onLoadStart={() => {
                        setVideoLoading(true)
                    }}
                    onLoad={() => {
                        setErrorModal(false)
                        setErrorMessage('')
                        setVideoLoading(false)
                    }}
                    pictureInPicture={true}
                    playInBackground={false}
                />
            </View>

            {videoLoading ?
                <View style={{ ...StyleSheet.absoluteFillObject }}>
                    <View style={{ flex: 1, backgroundColor: 'black', justifyContent: "center", alignItems: 'center', zIndex: 1111 }}>
                        <ActivityIndicator size={'large'} color={Colors.primaryGreen} />
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: 'white' }}>Your video is preparing...</Text>
                        </View>
                    </View>
                </View>
                : false}
        </>
    )
}

export default VideoCompo

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 300,
        backgroundColor: 'red'
    }
})