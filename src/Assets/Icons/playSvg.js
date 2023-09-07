import React from 'react';
import { SvgXml } from 'react-native-svg';
import { Colors } from '../../theme';

const PlaySvg = ({ color, size }) => {

  const defaultSize = size ? size : 50
  const defaultColor = color ? color : "white"

  return (
    <SvgXml
      height={defaultSize}
      width={defaultSize}
      xml={`<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 40.625C11.9281 40.625 11.3594 40.4688 10.8562 40.1594C10.4037 39.8785 10.0302 39.487 9.77098 39.0217C9.5118 38.5563 9.37552 38.0326 9.375 37.5V12.5C9.375 11.4156 9.9375 10.4094 10.8562 9.84063C11.3098 9.56176 11.8269 9.40282 12.3588 9.37877C12.8907 9.35472 13.42 9.46633 13.8969 9.70313L38.8969 22.2031C39.4159 22.4631 39.8524 22.8625 40.1575 23.3564C40.4625 23.8504 40.624 24.4195 40.624 25C40.624 25.5806 40.4625 26.1496 40.1575 26.6436C39.8524 27.1376 39.4159 27.5369 38.8969 27.7969L13.8969 40.2969C13.4594 40.5156 12.975 40.625 12.5 40.625V40.625Z" fill="${defaultColor}"/>
      </svg>
      
       `}
    />
  );
};

export default PlaySvg;