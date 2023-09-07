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

import Button from '../Components/button';
import RNFetchBlob from 'rn-fetch-blob';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import TickSvg from '../Assets/Icons/tickSvg';
import MicSvg from '../Assets/Icons/micSvg';
import StopSvg from '../Assets/Icons/stopSvg';

const screenWidth = Dimensions.get('screen').width;

class PlayerUi extends Component {
    dirs = RNFetchBlob.fs.dirs;
    path = Platform.select({
        ios: undefined,
        android: undefined,

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

    onStartRecord = async () => {
        if (Platform.OS === 'android') {
            try {
                const grants = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ]);

                console.log('write external stroage', grants);

                if (
                    grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.READ_EXTERNAL_STORAGE'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.RECORD_AUDIO'] ===
                    PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log('permissions granted');
                } else {
                    console.log('All required permissions not granted');

                    return;
                }
            } catch (err) {
                console.warn(err);

                return;
            }
        }

        const audioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
            OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
        };

        console.log('audioSet', audioSet);

        const uri = await this.audioRecorderPlayer.startRecorder(
            this.path,
            audioSet,
        );

        this.audioRecorderPlayer.addRecordBackListener((e) => {
            // console.log('record-back', e);
            this.setState({
                recordSecs: e.currentPosition,
                recordTime: this.audioRecorderPlayer.mmssss(
                    Math.floor(e.currentPosition),
                ),
            });
        });
        console.log(`uri: ${uri}`);
    };

    onPauseRecord = async () => {
        try {
            const r = await this.audioRecorderPlayer.pauseRecorder();
            console.log(r);
        } catch (err) {
            console.log('pauseRecord', err);
        }
    };

    onResumeRecord = async () => {
        await this.audioRecorderPlayer.resumeRecorder();
    };

    onStopRecord = async () => {
        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        this.setState({
            recordSecs: 0,
        });
        console.log(result);
    };

    onStartPlay = async () => {
        console.log('onStartPlay');
        //? Custom path
        // const msg = await this.audioRecorderPlayer.startPlayer(this.path);

        //? Default path
        const msg = await this.audioRecorderPlayer.startPlayer();
        const volume = await this.audioRecorderPlayer.setVolume(1.0);
        console.log(`file: ${msg}`, `volume: ${volume}`);

        this.audioRecorderPlayer.addPlayBackListener((e) => {
            this.setState({
                currentPositionSec: e.currentPosition,
                currentDurationSec: e.duration,
                playTime: this.audioRecorderPlayer.mmssss(
                    Math.floor(e.currentPosition),
                ),
                duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
            });
        });
    };

    onPausePlay = async () => {
        await this.audioRecorderPlayer.pausePlayer();
    };

    onResumePlay = async () => {
        await this.audioRecorderPlayer.resumePlayer();
    };

    onStopPlay = async () => {
        console.log('onStopPlay');
        this.audioRecorderPlayer.stopPlayer();
        this.audioRecorderPlayer.removePlayBackListener();
    };




    render() {
        let playWidth =
            (this.state.currentPositionSec / this.state.currentDurationSec) *
            (screenWidth - 56);

        if (!playWidth) {
            playWidth = 0;
        }

        return (
            <SafeAreaView style={styles.mainContainer}>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <View style={{ alignSelf: 'center', marginBottom: 10 }}>
                        {/* {playPauseButton ?
            <Text>Record</Text>
            :
            <Text>On Recording</Text>
          } */}
                    </View>

                    <View style={{ alignSelf: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 45 }}>{this.state.recordTime}</Text>
                    </View>

                    <View style={{ alignSelf: 'center', marginTop: 35, justifyContent: "space-between", flexDirection: "row", width: "80%", alignItems: 'center' }}>

                        <View>
                            <TouchableOpacity style={styles.smallButton}>
                                <TickSvg />
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                // disabled={recordButtonState}
                                onPress={this.onStartRecord}
                                // style={[styles.button, { backgroundColor: recordButtonState ? "grey" : Colors.primaryGreen }]} 
                                style={[styles.button]}
                            >
                                <View>
                                    <MicSvg />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity
                                onPress={this.onStopRecord}
                                style={[styles.smallButton, { backgroundColor: 'red' }]}>
                                <StopSvg />
                            </TouchableOpacity>
                        </View>



                    </View>


                </View>
                {/* <Text style={styles.titleTxt}>Audio Recorder Player</Text>
          <Text style={styles.txtRecordCounter}>{this.state.recordTime}</Text>
          <View style={styles.viewRecorder}>
            <View style={styles.recordBtnWrapper}>
              <Button
                style={styles.btn}
                onPress={this.onStartRecord}
                textStyle={styles.txt}>
                Record
              </Button>
              <Button
                style={[
                  styles.btn,
                  {
                    marginLeft: 12,
                  },
                ]}
                onPress={this.onPauseRecord}
                textStyle={styles.txt}>
                Pause
              </Button>
              <Button
                style={[
                  styles.btn,
                  {
                    marginLeft: 12,
                  },
                ]}
                onPress={this.onResumeRecord}
                textStyle={styles.txt}>
                Resume
              </Button>
              <Button
                style={[styles.btn, {marginLeft: 12}]}
                onPress={this.onStopRecord}
                textStyle={styles.txt}>
                Stop
              </Button>
            </View>
          </View>
          <View style={styles.viewPlayer}>
            <TouchableOpacity
              style={styles.viewBarWrapper}
              onPress={this.onStatusPress}>
              <View style={styles.viewBar}>
                <View style={[styles.viewBarPlay, {width: playWidth}]} />
              </View>
            </TouchableOpacity>
            <Text style={styles.txtCounter}>
              {this.state.playTime} / {this.state.duration}
            </Text>
            <View style={styles.playBtnWrapper}>
              <Button
                style={styles.btn}
                onPress={this.onStartPlay}
                textStyle={styles.txt}>
                Play
              </Button>
              <Button
                style={[
                  styles.btn,
                  {
                    marginLeft: 12,
                  },
                ]}
                onPress={this.onPausePlay}
                textStyle={styles.txt}>
                Pause
              </Button>
              <Button
                style={[
                  styles.btn,
                  {
                    marginLeft: 12,
                  },
                ]}
                onPress={this.onResumePlay}
                textStyle={styles.txt}>
                Resume
              </Button>
              <Button
                style={[
                  styles.btn,
                  {
                    marginLeft: 12,
                  },
                ]}
                onPress={this.onStopPlay}
                textStyle={styles.txt}>
                Stop
              </Button>
            </View>
          </View> */}
            </SafeAreaView>
        );
    }


}

export default PlayerUi;


const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 230,
        // backgroundColor: "red"
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