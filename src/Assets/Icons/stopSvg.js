import React from 'react';
import {SvgXml} from 'react-native-svg';
import { Colors } from '../../theme';

const StopSvg = () => {
  return (
    <SvgXml
      xml={`<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_105_7)">
      <path d="M7.5 7.5H22.5V22.5H7.5V7.5Z" fill="white"/>
      </g>
      <defs>
      <clipPath id="clip0_105_7">
      <rect width="30" height="30" fill="white"/>
      </clipPath>
      </defs>
      </svg>
      
       `}
    />
  );
};

export default StopSvg;