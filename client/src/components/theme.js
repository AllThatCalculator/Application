import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

/**
 * 테마 정의
 * - 고유색, 글꼴 등
 */
let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      // main: "#3F68B9",
      main: "#143578",
    },
    secondary: {
      main: "#C3EED2",
    },
    // backgroundColor :
    // (theme) => theme.palette.atcLinearBlue[100],
    // 혹은, "atcBlue.100"
    atcBlue: {
      50: "#F6F8FD",
      100: "#ECF2FF",
      200: "#E6EBF4",
    },
    // background :
    // (theme) => theme.palette.atcLinearBlue[100],
    atcLinearBlue: {
      100: `linear-gradient(#ECF2FF, transparent)`,
    },
    atcOrange: {
      100: "#FB8C00",
    },
  },
  typography: {
    fontFamily: "S-CoreDream-4Regular",
    htmlFontSize: 10,
  },
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1040,
      xl: 1920,
    },
  },

  // shape: { borderRadius: "0.8rem" },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // The props to change the default for.
          minWidth: "fit-content",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: "4.4rem",
          height: "4.4rem",
        },
      },
    },
  },
});

/**
 * (반응형) 사용자가 정의한 theme의 글꼴 크기가 화면 크기에 맞게 변해야 함.
 * 따라서, responsiveFontSizes로 theme를 감싸줌.
 */
theme = responsiveFontSizes(theme);

/**
 * 반응형을 위해 사용자가 정의한 theme를 컴포넌트에 적용하기 위해선 ThemeProvider로 감싸줘야 함.
 * 따라서, ThemeProvider로 컴포넌트를 감싸주는 함수
 *
 * @param {Function} component : 사용자가 정의한 theme를 적용할 컴포넌트
 */
function ThemeComponent({ component }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {component}
    </ThemeProvider>
  );
}
export { theme, ThemeComponent };
