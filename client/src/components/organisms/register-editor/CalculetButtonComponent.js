import { Button } from "@mui/material";

/**
 * 사용자가 저작한 계산기의 계산하기 버튼 컴포넌트
 * @param {*} props
 * [TODO] onClick함수 props에서 받아와서 사용
 * @returns
 */
function CalculetButtonComponent(props) {
  return (
    <Button
      variant="contained"
      onClick={props.onClick}
      sx={{ width: "fit-content", height: "fit-content" }}
    >
      계산하기
    </Button>
  );
}

export default CalculetButtonComponent;
