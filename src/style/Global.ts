import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 16px;
  }
  html {
    // scroll-behavior: smooth;
    scroll-padding-top: 100px;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background} !important;
    color: ${({ theme }) => theme.colors.text} !important;
    img {
      object-fit: contain;
      // height: auto;
      // max-width: 100%;
    }
  }
  ::selection {
    color: #000 !important;
    background: ${({ theme }) => theme.colors.primary} !important;
  }
  div {
    line-height: 1.5;
  }
  p {
    line-height: 1.5;
    margin: 0;
  }
  
  input {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.text};
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.text} !important;
  }

  button {
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }

  ul {
    margin: 0;
    padding-inline-start: 10px;
  }
  
  button {
    cursor: pointer;
    border: none;
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    // width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.text}; 
    border-radius: 8px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px ${({ theme }) => theme.colors.input}; 
    border-radius: 10px;
  }
`

export default GlobalStyle
