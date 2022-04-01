import { createGlobalStyle, keyframes } from 'styled-components';
import reset from 'styled-reset';

export const FadeInTopToBottom = keyframes`
  from {
    top: -30px;
    opacity:0;
  }
  to {
    top: 0px;
    opacity:1;
  }
`;

export const FadeIn = keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
`;

export const lightTheme = {
  originAccent: '#0095f6',
  accent: '#33658A',
  fontColor: 'rgb(38,38,38)',
  bgColor: '#fffef2',
  beige2: '#f6f5e8',
  deepGreen: '#204a23',
  contentBg: 'rgba(246, 245, 232, 1)',
  contentBorder: '1px solid rgb(219, 219, 219)',
  borderColor: 'rgba(219, 219, 219,0.5)',
  red: '#db9393',
  green: '#a9c7ab',
  waterColor: 'rgba(92, 184, 255,0.3)',
  sunlightColor: 'rgba(255, 208, 99,0.3)',
  temperatureColor: 'rgba(255, 212, 217,0.3)',
  waterAccentColor: 'rgba(92, 184, 255,0.8)',
  sunlightAccentColor: 'rgba(255, 208, 99,0.8)',
  temperatureAccentColor: 'rgba(255, 212, 217,0.8)',
  waterGradient:
    'linear-gradient(90deg, rgba(180,238,255,1) 19%, rgba(92,184,255,1) 75%)',
  sunlightGradient:
    'linear-gradient(90deg, rgba(255,231,160,1) 16%, rgba(253,200,151,1) 84%)',
  temperatureGradient:
    'linear-gradient(90deg, rgba(183,219,255,1) 16%, rgba(255,212,217,1) 69%)',
  borderColor1: 'rgba(219,219,219)',
  borderColor2: 'rgba(51,51,51,.2)',
};

export const darkTheme = {
  fontColor: '#fff',
  bgColor: '#2c2c2c',
};

export const GlobalStyles = createGlobalStyle`
    ${reset}

    * {
      box-sizing:border-box;
    }

    html{
      background-color:${props => props.theme.bgColor};
      height:100%;
    }

    body{
      background-color:${props => props.theme.bgColor};      
      height:auto;
      font-size:14px;
      /* font-family: 'Spoqa Han Sans Neo', 'Noto Sans KR','Open Sans', 'Malgun Gothic',
    '맑은 고딕', 'Apple SD Gothic Neo', '돋움', dotum, sans-serif; */
      font-family: 'Noto Sans KR','Open Sans', 'Malgun Gothic',
    '맑은 고딕', 'Apple SD Gothic Neo', '돋움', dotum, sans-serif;
      color: ${props => props.theme.fontColor};

      &::-webkit-scrollbar {
        width: 7px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0,0,0,0.5);
        border-radius:5px;
      }
      &::-webkit-scrollbar-track {
        background-color: ${props => props.theme.beige2};
      }

    }

    a {
      text-decoration: none;
      color: #333;
    }


    .infinite-scroll-component{
      overflow:unset !important;
    } 

    img{
      display:block;
    }
    input {
      all:unset;
    }
    button{
      all:unset;
    }
  
  	.blind {
    overflow: hidden;
    display: inline-block;
    position: absolute;
    z-index: -1;
    border: 0;
    width: 1px;
    height: 1px;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
	}

`;
