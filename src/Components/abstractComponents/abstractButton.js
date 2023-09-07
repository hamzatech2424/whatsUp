import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '../../theme'

const AbstractButton = ({ label, onPress, width, processing,backgroundColor }) => {

    const defaultLabel = label ? label : 'text'
    const defaultWidth = width ? width : '100%'
    const defaultBackgroundColor = backgroundColor ? backgroundColor : Colors.greyPrimary

    return (
        <TouchableOpacity
            disabled={processing}
            onPress={onPress}
            style={[styles.mainContainer, { width: defaultWidth,backgroundColor:defaultBackgroundColor }]}>
            {processing ?
                <ActivityIndicator color={'black'} size={'small'} />
                :
                <Text style={{color:"black"}}>{defaultLabel}</Text>
            }
        </TouchableOpacity>
    )
}

export default AbstractButton

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 50,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10,
    }
})