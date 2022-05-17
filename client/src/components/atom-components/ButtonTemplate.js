import styled, { keyframes } from "styled-components";
import styles from "../styles.js";
import { Icons } from "./Icons.js";
// 스타일드 기본 버튼
const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  min-width: max-content;
  align-items: center;
  gap: ${styles.styleLayout.basic700};

  padding: ${styles.styleLayout.basic100};

  background: ${styles.styleColor.white300};
  color: ${styles.styleColor.blue900};
  ${styles.styleBorder.basic100};

  cursor: pointer;
`;
// 스타일드 기본 텍스트
const StyledText = styled.div`
  flex: none;
  ${styles.sytleText.text100}
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
//스타일드 애니메이션
const transform = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.95);
  }
`;
//========================================================
// 흰색버튼 스타일
const StyledBtnWhite = styled(StyledButton)`
  ${styles.styleEffect.opacity100};
  &:hover {
    background: ${styles.styleColor.blue900};
    color: ${styles.styleColor.white300};
  }
`;
const StyledBtnWhiteText = styled(StyledText)`
  ${styles.sytleText.buttonWhite};
`;
//========================================================
// 파란버튼 스타일
const StyledBtnBlue = styled(StyledButton)`
  padding: ${styles.styleLayout.basic400};

  background: ${styles.styleColor.blue900};
  color: ${styles.styleColor.green100};

  ${styles.styleBorder.basic300};
  ${styles.styleEffect.opacity100};

  &:active {
    animation-duration: 0.7s;
    animation-timing-function: ease-out;
    animation-name: ${transform};
    animation-fill-mode: forwards;
  }
`;
const StyledBtnBlueText = styled(StyledText)`
  ${styles.sytleText.buttonBlue}
`;
//========================================================
// 회색버튼 스타일
const StyledBtnGray = styled(StyledButton)`
  padding: ${styles.styleLayout.basic700};
  background: ${styles.styleColor.blue50};
  color: ${styles.styleColor.blue900};
  ${styles.styleBorder.basic100};
`;
const StyledBtnGrayText = styled(StyledText)`
  ${styles.sytleText.text100};
`;
//========================================================
/**
 *
 * 완전 쌩 기본 버튼 템플릿 반환하는 함수
 *
 * @param {string, string, function}
 * text : 버튼에 들어갈 내용
 * icon : 아이콘 넣기 -> 아이콘 이름 작성 || 아이콘 안 넣기 -> 인자 없음
 * onClick : 해당 버튼 눌렀을 때 일어나는 이벤트
 *
 */
function ButtonTemplate({ text, icon, onClick }) {
  return (
    <StyledBtnBlue id={text} onClick={onClick}>
      {icon && <StyledIcon name={icon}></StyledIcon>}
      <StyledText>{text}</StyledText>
    </StyledBtnBlue>
  );
}
/**
 * 흰색 버튼 반환하는 함수
 *
 * @param {string, string, function}
 * text : 버튼에 들어갈 내용
 * icon : 아이콘 넣기 -> 아이콘 이름 작성 || 아이콘 안 넣기 -> 인자 없음
 * onClick : 해당 버튼 눌렀을 때 일어나는 이벤트
 *
 */
function BtnWhite({ text, icon, onClick }) {
  return (
    <StyledBtnWhite id={text} onClick={onClick}>
      {icon && <StyledIcon name={icon}></StyledIcon>}
      <StyledBtnWhiteText>{text}</StyledBtnWhiteText>
    </StyledBtnWhite>
  );
}

/**
 *
 * 파란 버튼 반환하는 함수
 *
 * @param {string, string, function}
 * text : 버튼에 들어갈 내용
 * icon : 아이콘 넣기 -> 아이콘 이름 작성 || 아이콘 안 넣기 -> 인자 없음
 * onClick : 해당 버튼 눌렀을 때 일어나는 이벤트
 *
 */
function BtnBlue({ text, icon, onClick }) {
  return (
    <StyledBtnBlue id={text} onClick={onClick}>
      {icon && <StyledIcon name={icon}></StyledIcon>}
      <StyledBtnBlueText>{text}</StyledBtnBlueText>
    </StyledBtnBlue>
  );
}
/**
 *
 * 회색 버튼 반환하는 함수 (토글 함수)
 * -> 버튼 눌렀을 때 {눌러져있다면 ▶️로 변환}, {안 눌러져 있다면 🔽로 변환}
 *
 * @param {string, boolean, function}
 * text : 버튼에 들어갈 내용
 * isToggle : 버튼이 눌러져 있는지 상태 (토글 되어져 있는지 상태)
 * onClick : 해당 버튼 눌렀을 때 일어나는 이벤트
 *
 */
function BtnGray({ text, isToggle, onClick }) {
  return (
    <StyledBtnGray id={text} onClick={onClick}>
      {isToggle ? (
        <StyledIcon name={`CaretDownFill`}></StyledIcon>
      ) : (
        <StyledIcon name={`CaretRightFill`}></StyledIcon>
      )}
      <StyledBtnGrayText>{text}</StyledBtnGrayText>
    </StyledBtnGray>
  );
}
export { ButtonTemplate, BtnWhite, BtnBlue, BtnGray };
