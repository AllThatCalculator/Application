import { Button, Typography } from "@mui/material";
import useSx from "../../hooks/useSx";
import { FlexBox } from "../global-components/FlexBox";
import { styled } from "@mui/material/styles";
/**
 * 카운트 버튼 컴포넌트
 * @param {string} text : 버튼 내용
 * @param {component} icon : 클릭 전 아이콘
 * @param {component} clickedIcon : 클릭 후 아이콘
 * @param {int} number : 클릭 횟수
 * @param {bool} isClicked : 버튼 클릭 여부
 * @param {function} onClick : 이벤트 함수
 */
function CountButton({ text, icon, clickedIcon, number, isClicked, onClick }) {
  const { boxSx } = useSx();
  // 내용 컴포넌트
  function Typo({ content }) {
    return <Typography variant="button">{content}</Typography>;
  }
  return (
    <Button onClick={onClick} disableRipple={true}>
      <FlexBox sx={boxSx}>
        {isClicked ? clickedIcon : icon}
        <Typo content={text} />
        <Typo content={number} />
      </FlexBox>
    </Button>
  );
}
/** 가장 중요한 버튼 : 계산기 등록 */
const MainButton = styled(Button)(({ theme }) => ({
  fontWeight: "bold",
  padding: "1.2rem 2.0rem",
  color: theme.palette.secondary.main,
  borderColor: theme.palette.secondary.main,
}));
export { CountButton, MainButton };
