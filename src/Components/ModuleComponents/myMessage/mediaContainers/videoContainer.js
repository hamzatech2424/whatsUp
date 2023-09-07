import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import PlaySvg from '../../../../Assets/Icons/playSvg'
import { Thumbnail } from 'react-native-thumbnail-video';
import Video from 'react-native-video';
import { navigate } from '../../../../Navigation/mainNavigation';

const VideoContainer = ({ url, loading }) => {

    return (
        <>
            <View>

                {/* <Image source={{ uri: thumbnailPath }} resizeMethod='resize' resizeMode="contain" style={{ width: 200, height: 200, borderTopLeftRadius: 16, borderTopRightRadius: 16 }} /> */}
                <Video
                    style={{ width: 200, height: 200 }}
                    source={{ uri: url }}
                    paused={true}
                    controls={false}
                />

            </View>
            {loading ?
                <View style={{ ...StyleSheet.absoluteFillObject, borderTopLeftRadius: 16, borderTopRightRadius: 16, justifyContent: "center", alignItems: 'center' }}>
                    <ActivityIndicator size={"large"} color={'white'} />
                </View>
                :
                <TouchableOpacity
                    activeOpacity={0.9}

                    onPress={() => navigate('MediaPreview', { mediaDetails: { mediaType: "Video", source: url, purpose: 'preview' } })}
                    style={{ ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: 'center', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                    <PlaySvg />
                </TouchableOpacity>
            }
        </>

    )
}

export default VideoContainer

const styles = StyleSheet.create({})