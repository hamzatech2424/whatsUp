import React from 'react';
import { SvgXml } from 'react-native-svg';
import { Colors } from '../../theme';

const CursorSvg = () => {


  return (
    <SvgXml
      xml={`<svg width="2" height="30" viewBox="0 0 2 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="1" y1="1" x2="1" y2="29" stroke='${Colors.primaryGreen}' stroke-width="2" stroke-linecap="round"/>
      </svg>
       `}
    />
  );
};

export default CursorSvg;
