import "../css/font.css";
const sizes = {
  desktop: "1080px",
  tablet: "768px",
  phone: "360px",
};
const styleColor = {
  blue900: "#143578",
  blue400: "#6F8AC3",
  blue200: "#9CB2DF",
  blue50: "#CFD5DE",
  blue30: "#ECF2FF",
  white300: "#ffffff",
  white100: { color: "#ffffff", opacity: 0.75 },
  white50: { color: "#ffffff", opacity: 0.65 },
  green100: "#C3EED2",
  black: "#000000",
  black25: { color: "#BEBEBE", opacity: 0.25 },
};
const styleLayout = {
  basic100: "10px 14px",
  basic200: "8px",
  basic300: "10px",
  basic400: "18px 22px",
  basic500: "8px 14px",
  basic600: "12px 35px",
};
const styleSize = {
  buttonOperator: `heigth: 46px;
width: 46px`,
};
const sytleText = {
  text400: `font-family: "S-CoreDream-4Regular";
font-size: 18px;`,
  text300: `font-family: "S-CoreDream-5Medium";
font-size: 16px;`,
  text200: `font-family: "S-CoreDream-3Light";
font-size: 14px;`,
  text100: `font-family: "S-CoreDream-3Light";
font-size: 12px;`,
  buttonWhite: `font-family: "S-CoreDream-5Medium";
font-size: 14px;`,
  buttonBlue: `font-family: "S-CoreDream-6Bold";
font-size: 14px;`,
  LogoTitle: `"S-CoreDream-7ExtraBold";
font-size: 24px;`,
};
const styleBorder = {
  basic100: `  border-radius: 7px;
border: none;`,
  basic200: `  border-radius: 10px;
border: none;`,
};
const styleEffect = {
  opacity100: `filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));`,
  opacity200: `filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3));`,
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
