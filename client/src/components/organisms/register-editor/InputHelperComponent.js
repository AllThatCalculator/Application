import { Button, Typography } from "@mui/material";
import { FlexBox } from "../common/FlexBox";

/**
 *
 * @param {*} props 컴포넌트 속성 정보들
 * label: 설명
 * options: 각 버튼들에 대한 정보
 *    - value: 버튼 변수명
 *    - label: 버튼 값 (버튼 클릭 시, 복사될 값)
 * @returns
 */
function InputHelperComponent(props) {
  function OnClickButton(event) {
    const target = document.getElementById(props.target);
    if (target != null) {
      props.updateValue((target.value += event.target.innerText));
    }
  }
  return (
    <>
      <Typography variant="caption">{props.label}</Typography>
      <FlexBox
        sx={{
          width: "100%",
          padding: "1rem",
          gap: "0.5rem",
          borderRadius: "0.25rem",
          backgroundColor: "#E6EBF4",
        }}
        id={props.id}
      >
        {Object.entries(props.options).map(([id, option], index) => (
          <Button
            sx={{ textTransform: "none" }}
            key={index}
            id={option.value}
            variant="contained"
            onClick={OnClickButton}
          >
            {option.label}
          </Button>
        ))}
      </FlexBox>
    </>
  );
}

export default InputHelperComponent;
