import { StyleSheet, Text, View, Animated,Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'


const EyePart = ({ scaleValue,eyePupilValue }) => {

    const interPolatedPupilValue = eyePupilValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0,0,1],
        extrapolate: 'clamp',
    })

    return (
        <Animated.View style={[styles.eyeView, { transform: [{ scale: scaleValue }] }]}>
            <Animated.View style={[{ width: 15, height: 15, borderRadius: 30, backgroundColor: 'white',transform: [{ scale: interPolatedPupilValue }] }]} />
        </Animated.View>
    )
}


const ThirdiSplashScreen = () => {

    const eyeValue = useRef(new Animated.Value(1)).current;
    const eyePupilValue = useRef(new Animated.Value(0)).current;
    const raysValue = useRef(new Animated.Value(0)).current;
    const tA = useRef(new Animated.Value(0)).current;
    const vibrateAnimatedValue = useRef(new Animated.Value(0)).current;

    const tAOpacity = tA.interpolate({
        inputRange: [0,10 ,50],
        outputRange: [0 ,0, 1], 
        extrapolate:"clamp"
    })

    const vibrationDelta = 7
    const vibrateTranaformInterpolated = vibrateAnimatedValue.interpolate({
        inputRange: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45 ,50],
        outputRange: [0, vibrationDelta, -vibrationDelta, vibrationDelta, -vibrationDelta, vibrationDelta, -vibrationDelta, vibrationDelta, -vibrationDelta, vibrationDelta ,0], 
        extrapolate:"clamp"
    })
    

    const useNativeDriver = false
    useEffect(() => {
        Animated.loop(Animated.sequence([
            Animated.spring(eyeValue, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: useNativeDriver
            }),
            Animated.parallel([
                Animated.spring(eyeValue, {
                    toValue: 0.5,
                    duration: 2000,
                    // friction: 2,
                    // damping: 8,
                    friction: 100,
                    useNativeDriver: useNativeDriver
                }),
                Animated.spring(eyePupilValue, {
                    toValue: 0,
                    duration: 2000,
                    // friction: 2,
                    // damping: 8,
                    friction: 100,
                    useNativeDriver: useNativeDriver
                }),
                Animated.spring(tA, {
                    toValue: 0,
                    duration: 2000,
                    // friction: 2,
                    // damping: 8,
                    friction: 100,
                    useNativeDriver: useNativeDriver
                }),
            ]),
            Animated.parallel([
                Animated.spring(eyeValue, {
                    toValue: 1,
                    duration: 2000,
                    // friction: 2,
                    damping: 8,
                    useNativeDriver: useNativeDriver
                }),
                Animated.spring(eyePupilValue, {
                    toValue: 1,
                    duration: 2000,
                    // friction: 2,
                    damping: 8,
                    useNativeDriver: useNativeDriver
                }),
                Animated.spring(raysValue, {
                    toValue: 1,
                    duration: 2000,
                    friction: 100,
                    // damping: 8,
                    useNativeDriver: useNativeDriver
                }),
                Animated.spring(tA, {
                    toValue: 50,
                    duration: 2000,
                    friction: 4,
                    // damping: 8,
                    useNativeDriver: useNativeDriver
                }),
            ]),
            Animated.timing(vibrateAnimatedValue, {
                toValue: 50,
                duration: 800,
                // friction: 5,
                useNativeDriver: useNativeDriver
            })
       
        ])).start();
    }, [])

    return (
        <View style={styles.mainContainer}>
            <View style={{ width: 120, height: 120, justifyContent: 'center', alignItems: 'center' }}>                
                <Animated.View style={{width: 35, height: 15, justifyContent:"center", alignItems:"center", transform: [{translateX: vibrateTranaformInterpolated}, {scale: 0.6}]}}>
                    <EyePart scaleValue={eyeValue} eyePupilValue={eyePupilValue} />
                    <Animated.View style={{ ...StyleSheet.absoluteFill, borderRadius: 10 ,backgroundColor:"black", opacity: tAOpacity, transform:[{rotate: "0deg"}, {translateX: tA}]}}/>
                    <Animated.View style={{ ...StyleSheet.absoluteFill, borderRadius: 10 ,backgroundColor:"black", opacity: tAOpacity, transform:[{rotate: "45deg"}, {translateX: tA}]}}/>
                    <Animated.View style={{ ...StyleSheet.absoluteFill, borderRadius: 10 ,backgroundColor:"black", opacity: tAOpacity, transform:[{rotate: "90deg"}, {translateX: tA}]}}/>
                    <Animated.View style={{ ...StyleSheet.absoluteFill, borderRadius: 10 ,backgroundColor:"black", opacity: tAOpacity, transform:[{rotate: "135deg"}, {translateX: tA}]}}/>
                    <Animated.View style={{ ...StyleSheet.absoluteFill, borderRadius: 10 ,backgroundColor:"black", opacity: tAOpacity, transform:[{rotate: "180deg"}, {translateX: tA}]}}/>
                    <Animated.View style={{ ...StyleSheet.absoluteFill, borderRadius: 10 ,backgroundColor:"black", opacity: tAOpacity, transform:[{rotate: "225deg"}, {translateX: tA}]}}/>
                    <Animated.View style={{ ...StyleSheet.absoluteFill, borderRadius: 10 ,backgroundColor:"black", opacity: tAOpacity, transform:[{rotate: "270deg"}, {translateX: tA}]}}/>
                    <Animated.View style={{ ...StyleSheet.absoluteFill, borderRadius: 10 ,backgroundColor:"black", opacity: tAOpacity, transform:[{rotate: "315deg"}, {translateX: tA}]}}/>
                </Animated.View>
            </View>

        </View>
    )
}

export default ThirdiSplashScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    eyeView: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: "black",
        justifyContent: 'center',
        alignItems: 'center'
    },
    raysView: {
        width: 10,
        height: 30,
        borderRadius: 20,
        backgroundColor: 'black',
    }
})