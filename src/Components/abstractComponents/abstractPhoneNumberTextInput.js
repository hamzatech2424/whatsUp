import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import CountryPicker, {FlagButton} from 'react-native-country-picker-modal';
import {phone} from 'phone';
import ArrowDownSvg from '../../Assets/Icons/ArrowDownSvg';
import { Colors } from '../../theme';


const SW = Dimensions.get('window').width
const SH = Dimensions.get('window').height

const AbstractPhoneNumberTextInput = React.forwardRef((props, ref) => {
    const defLabel = props.label ? props.label : 'TextHere';
    const defplaceHolder = props.placeHolder ? props.placeHolder : 'Text';
    const [modalVisible, setModalVisible] = useState(false);
    const [postalCode, setPostalCode] = useState('92');
    const [flagOfCountry, setFlagOfCountry] = useState('PK');
    const [focus, setFocus] = useState(false);
    const [isValidNo, setIsValidNo] = useState(true);
  
    const _selected = country => {
      setPostalCode(country.callingCode);
      setFlagOfCountry(country.cca2);
    };
  
    const validate = () => {
      return new Promise((resolve, reject) => {
        const isItAValidNumber = phone(`+${postalCode}${props.value}`, {
          country: flagOfCountry,
        }).isValid;
        setIsValidNo(isItAValidNumber);
        if (isItAValidNumber) {
          resolve(`${postalCode}${props.value}`);
        } else {
          reject(`InValid PhoneNumber`);
        }
      });
    };
  
    ref.current = {validate};
  
    return (
      <View style={styles.mainContainer}>
        <View style={[styles.viewTwo]}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.flagSurroundingButton}>
            <CountryPicker
              withModal
              withFlag
              withFilter
              renderFlagButton={flagProps =>
                flagOfCountry ? (
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      marginHorizontal: 5,
                      borderRadius: 25,
                      overflow: 'hidden',
                      marginLeft: 10,
                    }}>
                    <View
                      style={{
                        transform: [
                          {scale: 1.6},
                          {translateY: Platform.OS == "ios" ? -5.5 : -2.3},
                          {translateX: Platform.OS == "ios" ? -5 : -2},
                        ],
                      }}>
                      <FlagButton countryCode={flagOfCountry} />
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      backgroundColor: 'black',
                      marginLeft: 5,
                      borderRadius: 15,
                    }}
                  />
                )
              }
              onSelect={_selected}
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
            />
            <View style={styles.countryCodeView}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 15,
                }}>{` +${postalCode}`}</Text>
            </View>
  
            <View style={{marginLeft: 6}}>
              <ArrowDownSvg />
            </View>
  
            <View
              style={{
                width: 1,
                height: '70%',
                backgroundColor: '#FFFFFF',
                marginLeft: 10,
              }}
            />
          </TouchableOpacity>
  
          <View
            style={{width: SW * 0.6, height: '100%', justifyContent: 'center'}}>
            <TextInput
              placeholder={defplaceHolder}
              selectionColor={'#828282'}
              placeholderTextColor={'#FFFFFF'}
              style={{
                color: '#FFFFFF',
                paddingLeft: 10,
                fontSize: 15,
              }}
              keyboardType="phone-pad"
              value={props.value}
              onChangeText={props.onChangeText}
              returnKeyType="done"
            />
          </View>
        </View>
  
        {isValidNo ? (
          false
        ) : (
          <Text style={[styles.errorStyle]}>*Not a Valid Number</Text>
        )}
      </View>
    );
  });
  
  export default AbstractPhoneNumberTextInput;
  
  const styles = StyleSheet.create({
    mainContainer: {
      height: 80,
      width: '100%',
    },
  
    viewTwo: {
      width: '100%',
      height: 55,
      borderRadius: 16,
      flexDirection: 'row',
      backgroundColor: Colors.primaryGreen,
    },
  
    flagSurroundingButton: {
      alignItems: 'center',
      flexDirection: 'row',
      zIndex: 1,
      justifyContent: 'space-between',
      marginLeft: 5,
    },
  
    countryCodeView: {
      height: '38%',
      alignItems: 'center',
      flexDirection: 'row',
      zIndex: 0,
      justifyContent: 'space-between',
      marginBottom: 2,
    },
    errorStyle: {
    //   fontFamily: 'Manrope-Regular',
      fontSize: 13,
      color: 'red',
      fontWeight: '600',
      paddingTop:3,
      paddingLeft: 10,
    },
    txtOne: {
      fontSize:13,
    //   fontFamily: 'Manrope-Regular',
      fontWeight: '900',
    },
    txtTwo: {
      fontSize:13,
    //   fontFamily: 'Manrope-Regular',
      fontWeight: '900',
    },
  });
  