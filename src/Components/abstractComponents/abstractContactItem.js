import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../theme'

const AbstractContactItem = ({ item, onPress }) => {

    const defaultName = item?.fullName ? item?.fullName : 'Unknown'
    const defaultPhone = item?.phoneNumber ? `${item.countryCode}${item?.phoneNumber}` : "33*********"
    function rgb() {// rgb color random
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        var rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
        return rgb;
    }


    if (item.onPlatform) {
        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
                style={[styles.mainContainer, { borderWidth: 1, borderColor: item.onPlatform ? "rgba(30, 190, 113, 1)" : Colors.greySecondary }]}>
                <View style={styles.viewOne}>

                    <View>
                        <View style={[styles.nameAvatar, { backgroundColor: item.onPlatform ? Colors.primaryGreen : Colors.greyPrimary, borderWidth: 1, borderColor: 'lightgrey' }]}>
                            <Text style={{ fontWeight: '800', fontSize: 24, color: 'white', textTransform: 'capitalize' }}>{defaultName.slice(0, 1)}</Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <View>
                                <Text style={{ fontWeight: '700', color: 'black' }}>
                                    {((item?.fullName)?.length > 20) ?
                                        (((item?.fullName).substring(0, 20 - 3)) + '...') :
                                        defaultName}
                                </Text>
                            </View>

                            <View>
                                <Text>{`${defaultPhone}`}</Text>
                            </View>
                        </View>

                        {item.onPlatform ? false :
                            <View style={{ position: 'absolute', right: 0 }}>
                                <TouchableOpacity style={styles.inviteButtonContainer} >
                                    <Text style={{ color: "white" }}>Invite</Text>
                                </TouchableOpacity>
                            </View>
                        }

                    </View>
                    {item.onPlatform ?
                        <View style={{ position: 'absolute', right: -10, bottom: 0 }}>
                            <Text style={styles.memberText}>already on whatsUp</Text>
                        </View>
                        : false}

                    {item.isUserOnline &&
                        <View style={{ position: 'absolute', right: -10, top: 0, flexDirection: 'row', alignItems: "center" }}>
                            <View style={{ width: 7, height: 7, borderRadius: 10, backgroundColor: "#66FF66" }} />
                            <View style={{ marginLeft: 3 }}>
                                <Text style={{ fontSize: 12,fontWeight:"500" }}>Online</Text>
                            </View>
                        </View>
                    }

                </View>
            </TouchableOpacity>
        )
    }
    else {
        return (
            <View
                style={[styles.mainContainer, { borderWidth: 1, borderColor: item.onPlatform ? "rgba(30, 190, 113, 1)" : Colors.greySecondary }]}>
                <View style={styles.viewOne}>

                    <View>
                        <View style={[styles.nameAvatar, { backgroundColor: item.onPlatform ? Colors.primaryGreen : Colors.greyPrimary, borderWidth: 1, borderColor: 'lightgrey' }]}>
                            <Text style={{ fontWeight: '800', fontSize: 24, color: 'white', textTransform: 'capitalize' }}>{defaultName.slice(0, 1)}</Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <View>
                                <Text style={{ fontWeight: '700', color: 'black' }}>
                                    {((item?.fullName)?.length > 20) ?
                                        (((item?.fullName).substring(0, 20 - 3)) + '...') :
                                        defaultName}
                                </Text>
                            </View>

                            <View>
                                <Text>{`${defaultPhone}`}</Text>
                            </View>
                        </View>

                        {item.onPlatform ? false :
                            <View style={{ position: 'absolute', right: 0 }}>
                                <TouchableOpacity style={styles.inviteButtonContainer} >
                                    <Text style={{ color: "white" }}>Invite</Text>
                                </TouchableOpacity>
                            </View>
                        }

                    </View>
                    {item.onPlatform ?
                        <View style={{ position: 'absolute', right: -10, bottom: 0 }}>
                            <Text style={styles.memberText}>already on whatsUp</Text>
                        </View>
                        : false}

                </View>
            </View>
        )
    }

}

export default AbstractContactItem

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 75,
        backgroundColor: Colors.greySecondary,
        borderRadius: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    viewOne: {
        width: '90%',
        height: "90%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
        // backgroundColor:'pink'
    },
    memberText: {
        color: Colors.primaryGreen,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 10
    },
    nameAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: 'center',
    },
    inviteButtonContainer: {
        width: 70,
        height: 30,
        backgroundColor: Colors.primaryGreen,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 5,
    }
})