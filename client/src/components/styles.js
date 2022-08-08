import "../css/font.css";
const sizes = {
  desktop: `width: 1080px`,
  tablet: `width:768px`,
  phone: `width:360px`,
};
const styleColor = {
  blue950: "#082868",
  blue900: "#143578",
  blue500: "#0969DA",
  blue400: "#6F8AC3",
  blue300: "#546EA4",
  blue200: "#9CB2DF",
  blue100: "#3F68B9",
  blue50: "#CFD5DE",
  blue30: "#ECF2FF",
  white300: "#ffffff",
  white200: { color: "#ffffff", opacity: 0.85 },
  white100: `
  background: linear-gradient(
    137deg,
    rgba(255, 255, 255, 0.75) 38%,
    rgba(255, 255, 255, 0) 122%
  );`,
  white50: { color: "#ffffff", opacity: 0.65 },
  green200: { color: "#A4ECBD", opacity: 0.8 },
  green100: "#C3EED2",
  green25: { color: "#C3EED2", opacity: 0.25 },
  green25a: "#C3EED240",
  black: "#000000",
  black50: { color: "#000000", opacity: 0.6 },
  black50a: "#00000099",
  black25: { color: "#BEBEBE", opacity: 0.25 },
  gray100: "#5E5E5E",
  gray50: "#929292BF",
  red500: "#DB0918",
};
const styleLayout = {
  basic25: "1px",
  basic50: "3px",
  basic75: "5px",
  basic100: "10px 14px",
  basic200: "8px",
  basic300: "20px",
  basic350: "20px 0px",
  basic400: "18px 22px",
  basic500: "8px 14px",
  basic600: "12px 35px",
  basic700: "10px",
  basic750: "10px 0px",
  basic800: "12px 14px",
  basic900: "14px",
  basic950: "18px",
  basic1000: "38px",
  basic1050: "48px",
};
const styleSize = {
  buttonOperator: `heigth: 46px; width: 46px;`,
  small: `heigth: 18px; width: 18px;`,
  middle: `heigth: 32px; width: 32px;`,
  big: `heigth: 38px; width: 38px;`,
  buttonRecommend: `height: 118px; width: 280px;`,
  input: `width: 25em;`,
  modalCalculetInfo: `width: 529px; height: 550px;`,
  categoryDesktop: `width: 253px;`,
  categoryTablet: `width: 276px;`,
  categoryPhone: `width: 208px;`,
};
const sytleText = {
  text400: `font-family: "S-CoreDream-4Regular";
font-size: 20px;`,
  text300: `font-family: "S-CoreDream-5Medium";
font-size: 18px;`,
  text250b: `font-family: "S-CoreDream-5Medium";
font-size: 17px;`,
  text200: `font-family: "S-CoreDream-3Light";
font-size: 16px;`,
  text200b: `font-family: "S-CoreDream-4Regular";
font-size: 16px;`,
  text100: `font-family: "S-CoreDream-3Light";
font-size: 14px;`,
  text50: `font-family: "S-CoreDream-3Light";
font-size: 12px;`,
  buttonWhite: `font-family: "S-CoreDream-5Medium";
font-size: 14px;`,
  buttonBlue: `font-family: "S-CoreDream-6Bold";
font-size: 16px;`,
  LogoTitle: `font-family: "S-CoreDream-7ExtraBold";
font-size: 24px;`,
};
const styleBorder = {
  basic100: `border-radius: 7px;  border: none;`,
  basic200: `border-radius: 10px; border: none;`,
  basic300: `border-radius: 10px; border: 1px solid;`,
};
const styleEffect = {
  opacity50: `box-shadow: inset 0px 1px 5px rgba(0, 0, 0, 0.25);`,
  opacity100: `filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));`,
  opacity200: `filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3));`,
  opacity300: `filter: drop-shadow(0px 15px 35px rgba(0, 0, 0, 0.25));`,
};
export default {
  sizes,
  styleColor,
  styleLayout,
  sytleText,
  styleBorder,
  styleEffect,
  styleSize,
};
