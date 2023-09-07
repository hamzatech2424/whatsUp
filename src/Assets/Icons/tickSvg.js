import React from 'react';
import {SvgXml} from 'react-native-svg';
import { Colors } from '../../theme';

const TickSvg = () => {
  return (
    <SvgXml
    width={16}
    height={16}
      xml={`<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27.8072 1.07402C27.2784 0.779243 26.6968 0.591785 26.0956 0.522363C25.4945 0.452942 24.8855 0.502918 24.3037 0.669434C23.7218 0.835951 23.1784 1.11574 22.7046 1.49281C22.2307 1.86987 21.8357 2.33681 21.5421 2.86692L12.9899 18.2855L8.09536 13.3821C7.67041 12.9413 7.16209 12.5897 6.60007 12.3479C6.03804 12.106 5.43355 11.9787 4.82189 11.9734C4.21022 11.968 3.60362 12.0848 3.03748 12.3169C2.47134 12.5489 1.957 12.8916 1.52447 13.3249C1.09194 13.7582 0.749883 14.2735 0.518257 14.8406C0.286631 15.4078 0.170075 16.0155 0.175391 16.6283C0.180706 17.241 0.307786 17.8466 0.549215 18.4096C0.790645 18.9727 1.14159 19.4819 1.58157 19.9076L10.7949 29.1375C11.6655 30.0121 12.8402 30.492 14.0517 30.492L14.6898 30.4459C15.3958 30.3469 16.0694 30.0851 16.6573 29.6811C17.2452 29.2771 17.7316 28.7419 18.078 28.1176L29.5946 7.35035C29.8886 6.82067 30.0756 6.23816 30.1449 5.63608C30.2142 5.034 30.1644 4.42414 29.9985 3.84132C29.8325 3.2585 29.5535 2.71414 29.1776 2.23933C28.8016 1.76451 28.3359 1.36854 27.8072 1.07402V1.07402Z" fill="white"/>
      </svg>
      
       `}
    />
  );
};

export default TickSvg;