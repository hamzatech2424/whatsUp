import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions,Keyboard } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Colors } from '../../theme';


const ScreenWidth = Dimensions.get('window').width;

const AbstractTextInput = React.forwardRef((props, ref) => {
  const defplaceHolder = props.placeHolder ? props.placeHolder : 'Text';
  
  return (
    <React.Fragment>
    <View style={{width:'100%',height:72}}>  
    <View style={[styles.mainContainer, { width: ScreenWidth * 0.9 }]}>

              {/* <View style={styles.viewOne}>{props.Icon ? props.Icon() : null}</View>  */}
              <View style={styles.viewTwo}>
                <TextInput
                  onSubmitEditing={()=>Keyboard.dismiss()}
                  blurOnSubmit={false}
                  ref={ref}
                  placeholder={defplaceHolder}
                  placeholderTextColor={"white"}
                  selectionColor={Colors.whitePrimary}
                  keyboardType={props.keyboradName}
                  // autoCapitalize='false'
                  keyboardAppearance="dark"
                  style={{
                    color: "white",
                    paddingLeft:0,
                    fontSize:15,
                    // fontFamily: 'Manrope-Regular',
                  }}
                  value={props.value}
                  onChangeText={props.onChangeText}
                  onBlur={props.onBlur}
                />
              </View>
      </View>
      {props.error ?
      <Text style={[styles.errorStyle]} >{props.error}</Text>
      :
      <Text style={[styles.errorStyle]} >{''}</Text>
      }
      </View>
    </React.Fragment>
  );
});

export default AbstractTextInput;

const styles = StyleSheet.create({
  mainContainer: {
    height:55,
    backgroundColor: Colors.primaryGreen,
    borderRadius: 16,
    flexDirection: 'row',
    width:'100%',
  },
  viewOne: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTwo: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingLeft:15
  },
  errorStyle: {
    // fontFamily: 'Manrope-Regular',
    fontSize:12.5,
    color: 'red',
    fontWeight: '600',
    paddingLeft:10
},
});





