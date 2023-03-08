import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import { ThemeComponent } from "./components/theme";
import App from "./pages/App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./modules/index";

// rootReducer 를 가진 Store 생성
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const GlobalStyles = createGlobalStyle` 
    html, body {
      padding : 0;
      margin : 0;
      scroll-behavior: smooth;
    }
    body{
      // padding-top: 60px;
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
    
    html {
      font-size: 62.5%; 
    }
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles />
      <ThemeComponent component={<App />} />
    </Provider>
  </React.StrictMode>
);
