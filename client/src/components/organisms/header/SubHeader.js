import { AppBar, Toolbar, styled } from "@mui/material";

/**
 * styled header
 */
const FloatingAppBar = styled((props) => {
  return (
    <AppBar
      {...props}
      elevation={1}
      position="fixed"
      sx={{
        backgroundColor: "white",
        opacity: "95%",
        zIndex: (theme) => theme.zIndex.appBar - 1,
      }}
    />
  );
})(({ theme }) => ({}));

// sub header component
const SubHeader = styled(({ children, ...props }) => {
  return (
    <FloatingAppBar {...props}>
      <Toolbar /** 제일 위에 있는 Header 가 있는 자리 */ />
      <Toolbar
        disableGutters
        sx={{
          flexDirection: "column",
        }}
      >
        {children}
      </Toolbar>
    </FloatingAppBar>
  );
})(({ theme }) => ({}));

export { SubHeader };
