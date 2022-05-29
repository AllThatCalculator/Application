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
  color: ${styles.styleColor.blue900};
  border-radius: 50%;
  filter: none;
  padding: 0px 0px 1px 0px;
  &:hover {
    background: ${styles.styleColor.blue50};
  }
`;
//========================================================
/**
 *
 * 아이콘으로만 된 작은 크기의 버튼을 반환하는 함수
 *
 * @param {string, string, string, function}
 * text : 해당 아이콘이 무슨 용도인지 작성
 * icon : 아이콘 이름
 * color : 해당 아이콘 색이 파란색인지, 하얀색인지 (파란색 - "blue", 하얀색 - 인자없음)
 * onClick : 해당 버튼 눌렀을 때 일어나는 이벤트
 *
 */
function BtnSmallIcon({ text, icon, color, onClick }) {
  return (
    <StyledBtnSmallIcon id={text} name={icon} color={color} onClick={onClick}>
      <StyledIcon name={icon}></StyledIcon>
    </StyledBtnSmallIcon>
  );
}
/**
 *
 * 아이콘으로만 된 중간 크기의 버튼을 반환하는 함수
 *
 * @param {string, string, string, function}
 * text : 해당 아이콘이 무슨 용도인지 작성
 * icon : 아이콘 이름
 * color : 해당 아이콘 색이 파란색인지, 하얀색인지 (파란색 - "blue", 하얀색 - 인자없음)
 * onClick : 해당 버튼 눌렀을 때 일어나는 이벤트
 *
 */
function BtnMiddleIcon({ text, icon, color, onClick }) {
  return (
    <StyledBtnMiddleIcon id={text} name={icon} color={color} onClick={onClick}>
      <StyledIcon name={icon}></StyledIcon>
    </StyledBtnMiddleIcon>
  );
}
/**
 *
 * 아이콘 + 정보 를 나타내는 컴포넌트 반환 함수
 * -> 버튼 눌렀을 때 {눌러져있다면 not fill로 변환}, {안 눌러져 있다면 fill로 변환}
 *
 * @param {string, string, int, boolean, function}
 * text : 버튼 정보 (좋아요, 북마크, 신고)
 * icon : 아이콘 이름
 * number : 통계수
 * isClicked : 버튼이 눌러져 있는지 상태
 * onClick : 해당 버튼 눌렀을 때 일어나는 이벤트
 *
 */
function BtnStatisticsIcon({ text, icon, number, isClicked, onClick }) {
  return (
    <StyledBtnStatisticsIcon id={text} name={icon} onClick={onClick}>
      <StyledIcon
        id={icon}
        name={isClicked ? icon + "Fill" : icon}
      ></StyledIcon>
      <StyledNameText>{text}</StyledNameText>
      <StyledNumberText>{number}</StyledNumberText>
    </StyledBtnStatisticsIcon>
  );
}
/**
 *
 * 토글 닫기 동그란 작은 버튼 반환 함수
 *
 * @param {function}
 * onClick : 해당 버튼 눌렀을 때 일어나는 이벤트
 *
 */
function BtnToggle({ onClick }) {
  const icon = "CaretUpFill";
  return (
    <StyledBtnToggle>
      <StyledIcon id={icon} name={icon} onClick={onClick}></StyledIcon>
    </StyledBtnToggle>
  );
}
export { BtnSmallIcon, BtnMiddleIcon, BtnStatisticsIcon, BtnToggle };
