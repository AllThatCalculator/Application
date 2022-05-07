import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import App from "./pages/App";

const GlobalStyles = createGlobalStyle` 
    html, body {
      padding : 0;
      margin : 0;
      scroll-behavior: smooth;
    }
    body{
      background: rgb(63, 104, 185);
      background: linear-gradient(
        152deg,
        rgba(63, 104, 185, 1) 0%,
        rgba(122, 160, 169, 1) 63%,
        rgba(195, 238, 210, 1) 100%
      );
      background-attachment: fixed;
      background-size: cover;
    }
    *{
        box-sizing: border-box;
    }
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
