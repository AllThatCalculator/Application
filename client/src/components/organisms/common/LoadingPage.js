import { Box, CircularProgress } from "@mui/material";

/** 로딩화면 */
function LoadingPage() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress size={64} />
      </Box>
    </Box>
  );
}
export default LoadingPage;
