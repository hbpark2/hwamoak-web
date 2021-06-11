import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const lightTheme = {
  accent: '#0095f6',
  borderColor: 'rgba(219,219,219)',
  fontColor: 'rgb(383838)',
  bgColor: '#FAFAFA',
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

    body{
        background-color:${props => props.theme.bgColor};
        font-size:14px;
        font-family:'Open Sans', sans-serif;
        color: ${props => props.theme.fontColor};
    }

    input {
      all:unset;
    }
    
    a {
      text-decoration: none;
      color:inherit;
    }

`;
