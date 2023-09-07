import React, {useEffect, useRef, useState} from 'react';
import ActionSheet from 'react-native-actions-sheet';
import {View} from 'react-native'

const CustomHeaderComponent = () => {
  return(
    <View style={{width:'100%',height:30,borderTopLeftRadius:20,borderTopRightRadius:20,backgroundColor:'white'}} />
  )
}


const AbstractBottomSheet = ({id,onBeforeShow,children}) => {
    return (
      <ActionSheet
        id={id}
        onBeforeShow={onBeforeShow}
        containerStyle={{borderTopRightRadius:20,borderTopLeftRadius:20}}
        initialOffsetFromBottom={1}
        statusBarTranslucent={false}
        bounceOnOpen={true}
        bounciness={2}
        gestureEnabled={true}
        keyboardShouldPersistTaps="always"
        overlayColor={'grey'}
        defaultOverlayOpacity={0.4}
        CustomHeaderComponent={<CustomHeaderComponent/>}
      >
        {children}
      </ActionSheet>
    )
};
export default AbstractBottomSheet;
