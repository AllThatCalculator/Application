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
 * @param {버튼 내용, 아이콘 유무(아이콘 정의), 클릭이벤트} param0
 * @returns
 */
function ButtonTemplate({ text, icon, onClick }) {
  return (
    <StyledBtnBlue id={text} onClick={onClick}>
      {icon && <StyledIcon name={icon}></StyledIcon>}
      <StyledText>{text}</StyledText>
    </StyledBtnBlue>
  );
}
function BtnWhite({ text, icon, onClick }) {
  return (
    <StyledBtnWhite id={text} onClick={onClick}>
      {icon && <StyledIcon name={icon}></StyledIcon>}
      <StyledBtnWhiteText>{text}</StyledBtnWhiteText>
    </StyledBtnWhite>
  );
}
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
 * @param {버튼 내용, 토글 상태, 클릭이벤트} param0
 * @returns
 */
function BtnGray({ text, toggle, onClick }) {
  return (
    <StyledBtnGray id={text} onClick={onClick}>
      {JSON.parse(toggle) ? (
        <StyledIcon name={`CaretDownFill`}></StyledIcon>
      ) : (
        <StyledIcon name={`CaretRightFill`}></StyledIcon>
      )}
      <StyledBtnGrayText>{text}</StyledBtnGrayText>
    </StyledBtnGray>
  );
}
export { ButtonTemplate, BtnWhite, BtnBlue, BtnGray };
