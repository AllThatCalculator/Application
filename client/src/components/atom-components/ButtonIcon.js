import { useState } from "react";
import styled from "styled-components";
import styles from "../styles.js";
import { Icons } from "./Icons.js";
//스타일드 기본 버튼
const StyledButton = styled.button`
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.color === "blue"
      ? `${styles.styleColor.blue900}`
      : `${styles.styleColor.white300}`};
  background-color: transparent;
  padding: 0;
  border: none;
  ${styles.styleEffect.opacity100};
  cursor: pointer;
`;
// 스타일드 기본 아이콘
const StyledIcon = (props) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      xmlns="http://www.w3.org/2000/svg"
      height={Icons[props.name].height}
      width={Icons[props.name].width}
      viewBox={Icons[props.name].viewBox}
    >
      <path d={Icons[props.name].path[0]} />
      {Icons[props.name].path[1] && <path d={Icons[props.name].path[1]} />}
    </svg>
  );
};
//========================================================
//작은 아이콘 스타일
const StyledBtnSmallIcon = styled(StyledButton)`
  ${styles.styleSize.small};
`;
//중간 아이콘 스타일
const StyledBtnMiddleIcon = styled(StyledButton)`
  ${styles.styleSize.middle};
`;

// 통계버튼 스타일
const StyledBtnStatisticsIcon = styled(StyledButton)`
  color: ${styles.styleColor.blue900};
  gap: ${styles.styleLayout.basic50};
`;
// 통계용 텍스트 - 버튼 이름
const StyledNameText = styled.div`
  display: flex;
  color: ${styles.styleColor.blue900};
  min-width: max-content;
  align-items: center;
  ${styles.sytleText.text50}
`;
// 통계용 텍스트 - 통계수
const StyledNumberText = styled(StyledNameText)`
  color: ${styles.styleColor.gray100};
`;
// 토글 닫는 버튼 스타일
const StyledBtnToggle = styled(StyledBtnSmallIcon)`
  background: ${styles.styleColor.blue50};
  color: ${styles.styleColor.blue900};
  border-radius: 50%;
  filter: none;
`;
//========================================================
/**
 *
 * @param {무슨 용도, 아이콘 이름, 파란색?하얀색?, 클릭이벤트} param0
 * @returns
 */
function BtnSmallIcon({ text, icon, color, onClick }) {
  return (
    <StyledBtnSmallIcon id={text} name={icon} color={color} onClick={onClick}>
      <StyledIcon name={icon}></StyledIcon>
    </StyledBtnSmallIcon>
  );
}
function BtnMiddleIcon({ text, icon, color, onClick }) {
  return (
    <StyledBtnMiddleIcon id={text} name={icon} color={color} onClick={onClick}>
      <StyledIcon name={icon}></StyledIcon>
    </StyledBtnMiddleIcon>
  );
}
/**
 *
 * @param {버튼 이름, 아이콘, 통계수, 눌러져 있는지, 클릭이벤트} param0
 * @returns
 */
function BtnStatisticsIcon({ text, icon, number, isClicked, onClick }) {
  // 현재 아이콘 상태 (not fill, fill)
  const [btnIcon, setBtnIcon] = useState(icon);
  // 현재 통계수
  const [num, setNum] = useState(parseInt(number));
  // true: 눌림, false: 안 눌림
  const [click, setClick] = useState(JSON.parse(isClicked));

  const numberChange = () => {
    // 눌렀을 때 {눌러져있다면 -1, not fill} {안 눌러져 있다면 +1, fill}
    if (click === true) {
      setNum((current) => current - 1);
      setBtnIcon((current) => current.replace("Fill", ""));
    } else {
      setNum((current) => current + 1);
      setBtnIcon((current) => current + "Fill");
    }
    setClick((current) => !current);
  };

  return (
    <StyledBtnStatisticsIcon id={text} name={btnIcon} onClick={numberChange}>
      <StyledIcon id={btnIcon} name={btnIcon}></StyledIcon>
      <StyledNameText>{text}</StyledNameText>
      <StyledNumberText>{num}</StyledNumberText>
    </StyledBtnStatisticsIcon>
  );
}
/**
 *
 * 토글 닫기 버튼
 */
function BtnToggle() {
  const icon = "CaretUpFill";
  return (
    <StyledBtnToggle>
      <StyledIcon id={icon} name={icon}></StyledIcon>
    </StyledBtnToggle>
  );
}
export { BtnSmallIcon, BtnMiddleIcon, BtnStatisticsIcon, BtnToggle };
