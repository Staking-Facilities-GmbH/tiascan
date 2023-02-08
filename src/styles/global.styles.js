import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

  *, *:before, *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
    scroll-snap-type: y proximity;
  }
  body {
    line-height: 1.5;
    font-size: 1.6rem;
    font-family: "Inter", sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.fontColor};
  }


  h1, h2, h3, h4, h5, h6 {
    font-weight: 300;
  }
  
  
  a {
    cursor: pointer;
    text-decoration: none;
  }

  ul, ol {
    list-style: none;
  }
  
  input, button {
    border: none;
    outline: none;
    font-family: inherit;
    &:focus {
      outline: none;
    }
  }

  input {
    font-size: 1.8rem;
  }
  
  #root {
    position: relative;
    min-height: 100vh;
    overflow: hidden;

    @media all and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding-bottom: 10rem;
    }
  }
  
  main {
    max-width: ${({ theme }) => theme.const.containerWidth};
    margin: 4rem auto;
  }
  
  .contentSection {
    margin-bottom: 4rem;
    padding: 3.8rem;
    border: 1px solid rgba(255,255,255,0.5);
    background-color: ${({ theme }) => theme.colors.contentBg};
    border-radius: ${({ theme }) => theme.border.mediumRadius};
    box-shadow: ${({ theme }) => theme.shadows.boxShadow};
    backdrop-filter: blur(4rem);
    position: relative;
    z-index: 1;
    
    > div {
      max-width: ${({ theme }) => theme.const.contentWidth};
      margin: 0 auto;
    }
  }
  
  .hero {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .map {
      width: 100%;
      
      path {
        outline: none;
      }
    }
    .stats {
      width: 100%;
    }

    @media all and (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-bottom: -10rem !important;
      
      .map {
        width: 55%;
      }
      .stats {
        margin-top: -10rem;
        width: 40%;
      }
    }
  }
  
  .pagination {
    display: inline-block;
    background-color: ${({ theme }) => theme.colors.contentBg};
    border-radius: ${({ theme }) => theme.border.mediumRadius};
    padding: 0.8rem 0.5rem 0.5rem 2rem;

    .rc-pagination-item {
      border-radius: ${({ theme }) => theme.border.smallRadius};
    }
    
    .rc-pagination-item:focus a, .rc-pagination-item:hover a {
      color: #000000;
    }
    .rc-pagination-item-active {
      color: #ffffff;
      background-color: ${({ theme }) => theme.colors.paginationBg};
    }
    .rc-pagination-item-active a {
      color: #ffffff;
      text-decoration: underline;
    }
    .rc-pagination-item-active:focus a, .rc-pagination-item-active:hover a {
      color: #ffffff;
    }
  }
  
  hr {
    border-style: solid;
    border-width: 0.05rem;
  }
`
