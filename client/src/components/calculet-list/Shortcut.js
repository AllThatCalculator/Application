import { Button, Divider, Typography } from "@mui/material";
import useSx from "../../hooks/useSx";
import { FlexColumnBox } from "../global-components/FlexBox";

/**
 * 클릭 시, 각 대분류로 바로가기
 * @param {object} contentsShortcut 바로가기 버튼에 대한 정보
 * @param {int} isActive 어떤 바로가기 버튼이 활성화 되었는지 알기위한 state
 * @param {function} setIsActive 바로가기 버튼 활성화 함수
 */
function Shortcut({ contentsShortcut, isActive, setIsActive }) {
  const { atcBlue } = useSx();
  /**
   * 바로가기 버튼에서 활성화된 값
   * - 각 버튼마다 id부여하여 index로 접근해서 활성화 여부 알기
   * - 각 버튼에 맞는 대분류 ref로 가기
   */
  function onClickShortcut(event, currentRef) {
    setIsActive(parseInt(event.target.id));
    currentRef.onMoveToElement();
  }
  return (
    <FlexColumnBox gap="1.4rem">
      <Typography variant="body1">바로가기</Typography>
      <Divider />
      {contentsShortcut.map((cont, index) => (
        <Button
          key={index}
          sx={{
            backgroundColor: index === isActive && atcBlue[100],

            color: index !== isActive && "grey.600",
          }}
          onClick={(event) => onClickShortcut(event, cont.itemRef)}
        >
          <FlexColumnBox
            sx={{ alignItems: "center", whiteSpace: "pre-wrap", gap: "0.4rem" }}
          >
            {cont.icon}
            <Typography
              variant="body2"
              sx={{ fontWeight: index === isActive && "bold" }}
            >
              {cont.text}
            </Typography>
          </FlexColumnBox>
        </Button>
      ))}
    </FlexColumnBox>
  );
}
export default Shortcut;
