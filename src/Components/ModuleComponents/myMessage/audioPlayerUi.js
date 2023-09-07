import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSourceAndroidType,
    OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import {
    Dimensions,
    PermissionsAndroid,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { Component } from 'react';

import RNFetchBlob from 'rn-fetch-blob';
import TickSvg from '../../../Assets/Icons/tickSvg';
import MicSvg from '../../../Assets/Icons/micSvg';
import StopSvg from '../../../Assets/Icons/stopSvg';
import PlaySvg from '../../../Assets/Icons/playSvg';
import PauseSvg from '../../../Assets/Icons/pauseSvg';
import { Colors } from '../../../theme';
import MyPermissionsController from '../../../Permissions/permissionController';
import { SheetManager } from 'react-native-actions-sheet';

const screenWidth = Dimensions.get('screen').width;

class AudioPlayerUi extends Component {
    dirs = RNFetchBlob.fs.dirs;
    path = Platform.select({
        ios: 'hello.m4a',
        android: `${this.dirs.CacheDir}/hello.mp3`,
        // Discussion: https://github.com/hyochan/react-native-audio-recorder-player/discussions/479
        // ios: 'https://firebasestorage.googleapis.com/v0/b/cooni-ebee8.appspot.com/o/test-audio.mp3?alt=media&token=d05a2150-2e52-4a2e-9c8c-d906450be20b',
        // ios: 'https://staging.media.ensembl.fr/original/uploads/26403543-c7d0-4d44-82c2-eb8364c614d0',
        // ios: 'hello.m4a',
        // android: `${this.dirs.CacheDir}/hello.mp3`,
    });


    constructor(props) {
        super(props);
        this.state = {
            isLoggingIn: false,
            recordSecs: 0,
            recordTime: '00:00:00',
            currentPositionSec: 0,
            currentDurationSec: 0,
            playTime: '00:00:00',
            duration: '00:00:00',
            recordButtonActive: true,
            pausePlay: false,
            recordedFile: ""
        };

        this.audioRecorderPlayer = new AudioRecorderPlayer();
        this.audioRecorderPlayer.setSubscriptionDuration(0.1); // optional. Default is 0.5

    }


    onStatusPress = (e) => {
        const touchX = e.nativeEvent.locationX;
        console.log(`touchX: ${touchX}`);

        const playWidth =
            (this.state.currentPositionSec / this.state.currentDurationSec) *
            (screenWidth - 56);
        console.log(`currentPlayWidth: ${playWidth}`);

        const currentPosition = Math.round(this.state.currentPositionSec);

        if (playWidth && playWidth < touchX) {
            const addSecs = Math.round(currentPosition + 1000);
            this.audioRecorderPlayer.seekToPlayer(addSecs);
            console.log(`addSecs: ${addSecs}`);
        } else {
            const subSecs = Math.round(currentPosition - 1000);
            this.audioRecorderPlayer.seekToPlayer(subSecs);
            console.log(`subSecs: ${subSecs}`);
        }
    };

    onStartRecord = () => {
        MyPermissionsController.resolveAudioPermission()
            .then((granted) => {
                if (granted) {

                    const audioSet = {
                        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
                        AudioSourceAndroid: AudioSourceAndroidType.MIC,
                        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
                        AVNumberOfChannelsKeyIOS: 2,
                        AVFormatIDKeyIOS: AVEncodingOption.aac,
                        OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
                    };

                    console.log('audioSet', audioSet);
                    this.audioRecorderPlayer.startRecorder(
                        this.path,
                        audioSet,
                    )
                        .then((uri) => {
                            console.log(`uri: ${uri}`);
                            this.audioRecorderPlayer.addRecordBackListener((e) => {
                                // console.log('record-back', e);
                                this.setState({
                                    recordSecs: e.currentPosition,
                                    recordTime: this.audioRecorderPlayer.mmssss(
                                        Math.floor(e.currentPosition),
                                    ),
                                    recordButtonActive: false,
                                    pausePlay: true
                                });
                            });
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            })
            .catch((error) => {
                console.log(error)
            })

    };

    onPauseRecord = async () => {
        try {
            const r = await this.audioRecorderPlayer.pauseRecorder();
            this.setState({
                pausePlay: false
            })
            console.log(r);
        } catch (err) {
            console.log('pauseRecord', err);
        }
    };

    onResumeRecord = async () => {
        await this.audioRecorderPlayer.resumeRecorder();
        this.setState({
            pausePlay: false
        })
    };

    onStopRecord = async () => {
        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        this.setState({
            recordSecs: 0,
            recordButtonActive: true,
            recordedFile: result
        });
        this.props.audioFileCaptured(this.state.recordedFile)
        SheetManager.hideAll()
    };


    onPressFinishButton = () => {
        if(this.state.recordedFile == ""){
           console.log('Nothing Captured')
           SheetManager.hideAll()
        }
        else{
            this.props.audioFileCaptured(this.state.recordedFile)
        }
        // this.onStopRecord()
        // .then((res)=>{
        //     this.props.audioFileCaptured(this.state.recordedFile)
        // })
        // .catch((error)=>{
        //    console.log(error)
        // })
    }


    render() {


        return (
            <View style={styles.mainContainer}>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <View style={{ alignSelf: 'center', marginBottom: 10 }}>
                        <Text>Record Voice Message</Text>
                    </View>

                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 45 }}>{this.state.recordTime}</Text>
                    </View>

                    <View style={{ alignSelf: 'center', marginTop: 35, justifyContent: "space-between", flexDirection: "row", width: "80%", alignItems: 'center' }}>

                        <View style={[styles.smallButton,{backgroundColor:'white'}]}>
                            {/* <TouchableOpacity
                                onPress={this.onPressFinishButton}
                                style={[styles.smallButton]}>
                                <TickSvg />
                            </TouchableOpacity> */}
                        </View>

                        {this.state.recordButtonActive ?
                            <View>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={this.onStartRecord}
                                    style={[styles.button, { backgroundColor: Colors.primaryGreen }]}
                                >
                                    <View>
                                        <MicSvg />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            :
                            this.state.pausePlay ?

                                <View>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={this.onPauseRecord}
                                        style={[styles.button, { backgroundColor: Colors.primaryGreen }]}
                                    >
                                        <View>
                                            <PauseSvg />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={this.onResumeRecord}
                                        style={[styles.button, { backgroundColor: Colors.primaryGreen }]}
                                    >
                                        <View style={{ marginLeft: 4 }}>
                                            <PlaySvg />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                        }

                        <View>
                            <TouchableOpacity
                                onPress={this.onStopRecord}
                                style={[styles.smallButton, { backgroundColor: 'red' }]}>
                                <StopSvg />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        );
    }


}

export default AudioPlayerUi;


const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 230,
    },
    smallButton: {
        width: 45,
        height: 45,
        borderRadius: 50,
        backgroundColor: Colors.primaryGreen,
        justifyContent: "center",
        alignItems: 'center'
    },
    button: {
        width: 70,
        height: 70,
        borderRadius: 80,
        backgroundColor: Colors.primaryGreen,
        justifyContent: "center",
        alignItems: 'center'
    }
})
