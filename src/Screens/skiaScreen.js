import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Canvas, Image, useCanvasRef, Circle } from "@shopify/react-native-skia";

const SkiaScreen = () => {

    const ref = useCanvasRef();

    return (
        <Canvas style={{ flex: 1 }} ref={ref}>
            <Circle r={128} cx={128} cy={128} color="red" />
        </Canvas>
    )
}

export default SkiaScreen

const styles = StyleSheet.create({})