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
