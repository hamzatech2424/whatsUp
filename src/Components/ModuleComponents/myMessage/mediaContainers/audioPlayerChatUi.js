import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import {
  ActivityIndicator,
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
import { Colors } from '../../../../theme';
import MicSvg from '../../../../Assets/Icons/micSvg';
import PlaySvg from '../../../../Assets/Icons/playSvg';
import PauseSvg from '../../../../Assets/Icons/pauseSvg';

const screenWidth = Dimensions.get('screen').width;

class AudioPlayerChatUi extends Component {
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
      shufflePlayAndPausePlay: true,
      pausePlay: true
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.1); // optional. Default is 0.5

  }

  // getMP3Duration = async (url) => {
  //   const bufferStr = await FileSystem.readFile(url, 'base64')
  //   const duration = await getMP3Duration(bufferStr)
  // }

  // componentDidMount() {
  //   if (this.props.url) {
  //     getMP3Duration(this.props.url)
  //       .then((result) => {
  //         console.log(result)
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })

  //   }
  // }


  onStatusPress = (e) => {
    const touchX = e.nativeEvent.locationX;
    console.log(`touchX: ${touchX}`);

    // const playWidth = (this.state.currentPositionSec / this.state.currentDurationSec) * (screenWidth - 56);
    const playWidth = (this.state.currentPositionSec / this.state.currentDurationSec) * 157;
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


  onStartPlay = async () => {
    console.log('onStartPlay');
    //? Custom path
    // const msg = await this.audioRecorderPlayer.startPlayer(this.path);

    //? Default path
    const msg = await this.audioRecorderPlayer.startPlayer(this.props.url);
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
        shufflePlayAndPausePlay: false
      });

      if (this.state.playTime > "00:00:00" && this.state.playTime == this.state.duration) {
        this.onStopPlay()
      }

    });
  };

  onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
    this.setState({ pausePlay: false })
  };

  onResumePlay = async () => {
    await this.audioRecorderPlayer.resumePlayer();
    this.setState({ pausePlay: true })
  };

  onStopPlay = async () => {
    console.log('onStopPlay');
    await this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
    this.setState({ shufflePlayAndPausePlay: true })

  };


  onPressFinishButton = () => {
    this.props.audioFileCaptured(this.state.recordedFile)
  }



  render() {
    let playWidth =
      // (this.state.currentPositionSec / this.state.currentDurationSec) * (screenWidth - 56);
      (this.state.currentPositionSec / this.state.currentDurationSec) * 157;

    if (!playWidth) {
      playWidth = 0;
    }

    // console.log(this.props.senderData,'asdasda')

    return (
      <View style={styles.mainContainer}>
        {this.props.isSender ?
          <View style={styles.viewOne} >

            <View style={{ width: '20%', height: "100%" }}>
              <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
                <View style={styles.imageContainer}>

                  <View style={styles.micContainerReceiver}>
                    <MicSvg color={'black'} size={15} />
                  </View>

                </View>
              </View>
            </View>

            <View style={{ width: '80%', height: "100%", flexDirection: "row" }}>
              <View style={{ width: "15%", height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                {this.props.loading ?
                <ActivityIndicator size={'small'} color={'white'} />
                :
                this.state.shufflePlayAndPausePlay ?
                  <TouchableOpacity
                    onPress={this.onStartPlay}
                    activeOpacity={0.8}
                    style={{ width: 30, height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                    <PlaySvg size={25} />
                  </TouchableOpacity>

                  :
                  <>
                    {this.state.pausePlay ?
                      <TouchableOpacity
                        onPress={this.onPausePlay}
                        activeOpacity={0.8}
                        style={{ width: 30, height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                        <PauseSvg size={25} />
                      </TouchableOpacity>
                      :
                      <TouchableOpacity
                        onPress={this.onResumePlay}
                        activeOpacity={0.8}
                        style={{ width: 30, height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                        <PlaySvg size={25} />
                      </TouchableOpacity>
                    }
                  </>
                }
              </View>


              <View style={{ width: "80%", height: '100%', }}>
                <View style={{ height: '80%', width: '100%' }}>
                  <View
                    style={styles.viewBarWrapper}
                  // onPress={this.onStatusPress}
                  >
                    <View style={[styles.viewBar]}>
                      <View style={[styles.viewBarPlay, { width: playWidth, backgroundColor: "white" }]} />
                    </View>
                  </View>
                </View>

                <View style={{ height: '20%', width: '100%', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 10, fontWeight: '500', color: "white" }}>{this.state.playTime} / <Text style={{ color: "white" }}>{this.state.duration}</Text></Text>
                </View>

              </View>
            </View>


          </View>
          :
          <View style={styles.viewOne} >

            <View style={{ width: '80%', height: "100%", flexDirection: 'row' }}>

              <View style={{ width: "20%", height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                {this.state.shufflePlayAndPausePlay ?
                  <TouchableOpacity
                    onPress={this.onStartPlay}
                    activeOpacity={0.8}
                    style={{ width: 30, height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                    <PlaySvg size={25} />
                  </TouchableOpacity>

                  :
                  <>
                    {this.state.pausePlay ?
                      <TouchableOpacity
                        onPress={this.onPausePlay}
                        activeOpacity={0.8}
                        style={{ width: 30, height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                        <PauseSvg size={25} />
                      </TouchableOpacity>
                      :
                      <TouchableOpacity
                        onPress={this.onResumePlay}
                        activeOpacity={0.8}
                        style={{ width: 30, height: "100%", justifyContent: 'center', alignItems: 'center' }}>
                        <PlaySvg size={25} />
                      </TouchableOpacity>
                    }
                  </>
                }
              </View>


              <View style={{ width: "80%", height: '100%', }}>
                <View style={{ height: '80%', width: '100%' }}>
                  <View
                    style={styles.viewBarWrapper}
                  // onPress={this.onStatusPress}
                  >
                    <View style={[styles.viewBar]}>
                      <View style={[styles.viewBarPlay, { width: playWidth, backgroundColor: Colors.primaryGreen }]} />
                    </View>
                  </View>
                </View>

                <View style={{ height: '20%', width: '100%', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 10, fontWeight: '500', color: "white" }}>{this.state.playTime} / <Text style={{ color: "white" }}>{this.state.duration}</Text></Text>
                </View>

              </View>


            </View>

            <View style={{ width: '20%', height: "100%" }}>
              <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
                <View style={styles.imageContainer}>

                  <View style={styles.micContainerSender}>
                    <MicSvg color={'black'} size={15} />
                  </View>

                </View>
              </View>
            </View>
          </View>
        }
      </View>
    );
  }


}

export default AudioPlayerChatUi;


const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 55,
  },
  viewOne: {
    width: 245,
    // backgroundColor: 'red',
    height: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  micContainerSender: {
    width: 10,
    height: 20,
    // backgroundColor:Colors.primaryGreen,
    position: 'absolute',
    bottom: 0,
    left: 3,
    justifyContent: "flex-end",
    alignItems: 'center'
  },
  micContainerReceiver: {
    width: 10,
    height: 20,
    // backgroundColor:Colors.primaryGreen,
    position: 'absolute',
    bottom: 0,
    right: 3,
    justifyContent: "flex-end",
    alignItems: 'center'
  },
  imageContainer: {
    width: 40,
    height: 40,
    backgroundColor: "grey",
    borderRadius: 40
  },
  viewBarPlay: {
    backgroundColor: 'white',
    height: 4,
    width: 0,
  },
  viewBar: {
    backgroundColor: '#ccc',
    height: 4,
    alignSelf: 'stretch',
  },
  viewBarWrapper: {
    marginTop: 6,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})







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