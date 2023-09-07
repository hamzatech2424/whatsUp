import { StyleSheet, Text, View,Image, ActivityIndicator } from 'react-native'
import React from 'react'

const ImageContainer = ({url,loading}) => {
  return (
    <>
    <Image source={{uri:url}} resizeMethod='resize' resizeMode="contain" style={{ width: 200, height: 200, borderTopLeftRadius: 16, borderTopRightRadius: 16 }} />
    {loading?
    <View style={{...StyleSheet.absoluteFillObject,borderTopLeftRadius: 16, borderTopRightRadius: 16,justifyContent:"center",alignItems:'center'}}>
      <ActivityIndicator size={"large"} color={'white'} />
    </View>
    :false}
    </>
  )
}

export default ImageContainer

const styles = StyleSheet.create({})