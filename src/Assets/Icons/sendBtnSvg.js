import React from 'react';
import {SvgXml} from 'react-native-svg';
import { Colors } from '../../theme';

const SendBtnSvg = ({color,size}) => {

  const defaultColor = color ? color : Colors.primaryGreen
  const defaultSize = size ? size : 27

  return (
    <SvgXml
     width={defaultSize}
     height={defaultSize}
      xml={`<svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M26.4702 14.3911L1.68058 26.2629C1.38686 26.4025 1.03716 26.3432 0.805917 26.1145L0.630234 25.9406C0.414654 25.7272 0.340773 25.4089 0.440278 25.1224L3.28227 17.0678C3.70172 15.8808 4.79943 15.067 6.05711 15.0106L12.9154 14.6691C13.3275 14.6571 13.6575 14.3236 13.6652 13.9115L13.6609 13.0813C13.6489 12.6692 13.3154 12.3392 12.9033 12.3315L6.04178 12.0613C4.78359 12.018 3.67747 11.2157 3.24571 10.0331L0.320155 2.00849C0.187327 1.71925 0.241584 1.3785 0.457674 1.14481L0.631539 0.969127C0.856587 0.702836 1.23213 0.620318 1.54808 0.767737L26.4598 12.3812C26.7294 12.5043 26.9048 12.7708 26.9112 13.0671L26.9142 13.6351C26.9374 13.9548 26.7608 14.2556 26.4702 14.3911Z" fill=${defaultColor}/>
      </svg>
      
       `}
    />
  );
};

export default SendBtnSvg;