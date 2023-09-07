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
import RNFetchBlob from 'rn-fetch-blob';


class AudioPlayerController {
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

    constructor() {
        this.audioRecorderPlayer = new AudioRecorderPlayer();
        this.audioRecorderPlayer.setSubscriptionDuration(0.1); // optional. Default is 0.5
    }

    onStartRecord = () => {
        return new Promise((resolve, reject) => {
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
                                // resolve(e)
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

        })
    };

}
const AudioPlayerControllerInstance = new AudioPlayerController()

export default AudioPlayerControllerInstance