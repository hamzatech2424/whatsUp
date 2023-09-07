import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ImageCompo = ({mediaDetails}) => {
    return (
        <View style={styles.mainContainer}>
            <Image source={{ uri: mediaDetails?.source.uri }} resizeMethod={"auto"} resizeMode={"contain"} style={{ flex: 1, aspectRatio: 1 }} />
        </View>
    )
}

export default ImageCompo

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: 400,
        backgroundColor: 'black'
    }
})