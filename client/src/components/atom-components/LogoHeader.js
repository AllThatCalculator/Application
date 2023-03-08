import { ButtonBase } from "@mui/material";

/**
 *
 * 헤더에 놓을 로고를 반환하는 함수
 * -> 클릭 시, 홈페이지로 이동
 */
export default function LogoHeader() {
  return (
    <ButtonBase
      disableRipple
      sx={{
        fontFamily: "S-CoreDream-7ExtraBold",
        minWidth: "max-content",
        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.3)",
        fontSize: { xs: 16, sm: 20, md: 24 },
      }}
      onClick={() => (window.location.href = "/")}
    >
      All That Calculator
    </ButtonBase>
  );
}
