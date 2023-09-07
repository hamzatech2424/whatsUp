import React from 'react';
import {SvgXml} from 'react-native-svg';

const PauseSvg = ({color, size}) => {

    const iconColor = color ? color : 'white'
    const mSize = size? size: 50;
  return (
    <SvgXml
      width={mSize}
      height={mSize}
      xml={`<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_102_4)">
      <path d="M12.5 39.5833H20.8333V10.4167H12.5V39.5833ZM29.1667 10.4167V39.5833H37.5V10.4167H29.1667Z" fill="${iconColor}"/>
      </g>
      <defs>
      <clipPath id="clip0_102_4">
      <rect width="50" height="50" fill="${iconColor}"/>
      </clipPath>
      </defs>
      </svg>
      
      `}
    />
  );
};

export default PauseSvg;
