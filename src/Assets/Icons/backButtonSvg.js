import React from 'react';
import { SvgXml } from 'react-native-svg';

const BackButtonSvg = ({color}) => {
  const defaultColor = color ? color : "black"
  return (
    <SvgXml
      xml={`
      <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.375 1.25L1.625 8L8.375 14.75" stroke=${defaultColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
 `}
    />
  );
};

export default BackButtonSvg;