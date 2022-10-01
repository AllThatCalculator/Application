import styled, { keyframes } from "styled-components";
import styles from "../styles.js";
import { Icons } from "./Icons.js";

// 스타일드 폰트
// Text100
const StyledFont100 = styled.div`
  ${styles.sytleText.text100}
`;
// button_white
const StyledFontButtonW = styled.div`
  ${styles.sytleText.buttonWhite};
`;
// button_blue
const StyledFontButtonB = styled.div`
  ${styles.sytleText.buttonBlue}
`;
// Text200b
const StyledFont200b = styled.div`
  ${styles.sytleText.text200b}
`;
//========================================================
/**
 * 아이콘 상하좌우 각도 변환을 위한 StyledSvg
 * 현재는, Y축 중심으로 회전
 */
const StyledSvg = styled.svg`
  transform: rotateY(${(props) => (props.degree ? props.degree : 0)}deg);
`;
/**
 * 스타일드 아이콘
 * @param {*} props
 * -> name : 아이콘 이름
 * -> degree : 회전할 각도
 */
function StyledIcon(props) {
  return (
    <StyledSvg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      xmlns="http://www.w3.org/2000/svg"
      height={Icons[props.name].height}
      width={Icons[props.name].width}
      viewBox={Icons[props.name].viewBox}
      degree={props.degree}
    >
      {Icons[props.name].path.map((d, i) => {
        return <path d={d} key={i} />;
      })}
    </StyledSvg>
  );
}
/**
 * 버튼 내에서 아이콘 눌렀을 때, 버튼 전체로 접근하는 게 아니라 아이콘에만 접근되는 것을 막음.
 */
const StyledNoneIcon = styled.div`
  pointer-events: none;
`;
//========================================================
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
// 스타일드 버튼
// 기본 버튼
const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  min-width: max-content;
  align-items: center;
  justify-content: center;
  gap: ${styles.styleLayout.basic700};

  padding: ${styles.styleLayout.basic100};

  background: ${styles.styleColor.white300};
  color: ${styles.styleColor.blue900};
  ${styles.styleBorder.basic100};

  cursor: pointer;
`;
// 흰색 버튼
const StyledBtnWhite = styled(StyledButton)`
  ${styles.styleEffect.opacity100};
  &:hover {
    background: ${styles.styleColor.blue900};
    color: ${styles.styleColor.white300};
  }
`;
// 파란 버튼
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
// 회색 버튼
const StyledBtnGray = styled(StyledButton)`
  padding: ${styles.styleLayout.basic700};
  background: ${styles.styleColor.blue50};
  color: ${styles.styleColor.blue900};
  ${styles.styleBorder.basic100};
`;
// 투명 버튼(형식은 회색버튼)
const StyledBtnTrans = styled(StyledBtnGray)`
  flex-direction: ${(props) => props.isColumn && "column"};
  color: ${(props) => props.isColumn && `${styles.styleColor.gray100}`};
  justify-content: ${(props) => !props.isCenter && `flex-start`};
  background: ${(props) =>
    props.isActive ? `${styles.styleColor.blue30}` : `transparent`};
  ${(props) =>
    props.isActive
      ? `${styles.sytleText.buttonWhite}`
      : `${styles.sytleText.text100}`};

  width: 100%;
  white-space: pre;
  &:hover {
    background: ${styles.styleColor.blue30};
  }
`;
// 남색 버튼
const StyledBtnIndigo = styled(StyledButton)`
  ${styles.styleEffect.opacity100};
  background: ${styles.styleColor.blue900};
  color: ${styles.styleColor.white300};
  &:hover {
    background: ${styles.styleColor.blue950};
  }
`;
// 기본 디폴트 스타일 제거 버튼
const StyledDefaultButton = styled(StyledButton)`
  padding: ${styles.styleLayout.basic50};
  background: transparent;
  color: ${styles.styleColor.blue500};
  gap: ${styles.styleLayout.basic75};
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
      {icon && <StyledIcon name={icon} />}
      <StyledFont100>{text}</StyledFont100>
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
      {icon && <StyledIcon name={icon} />}
      <StyledFontButtonW>{text}</StyledFontButtonW>
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
      {icon && <StyledIcon name={icon} />}
      <StyledFontButtonB>{text}</StyledFontButtonB>
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
  const name = isToggle ? `CaretDownFill` : `CaretRightFill`;
  return (
    <StyledBtnGray id={text} onClick={onClick}>
      <StyledIcon name={name} />
      <StyledFont100>{text}</StyledFont100>
    </StyledBtnGray>
  );
}

/**
 *
 * 투명 버튼 반환하는 함수 (토글)
 * -> 버튼 눌렀을 때 {눌러져있다면 ▶️로 변환}, {안 눌러져 있다면 🔽로 변환}
 *
 * @param {string, boolean, function}
 * text : 버튼에 들어갈 내용
 * isToggle : 버튼이 눌러져 있는지 상태 (토글 되어져 있는지 상태)
 * onClick : 해당 버튼 눌렀을 때 일어나는 이벤트
 * isCenter : content가 버튼에서 가운데 정렬인지 (기본값 true 이니까, 가운데 정렬 안 할 때만 false로)
 *
 */
function BtnTransToggle({ text, isToggle, onClick, isCenter = true }) {
  const name = isToggle ? `CaretDownFill` : `CaretRightFill`;
  return (
    <StyledBtnTrans id={text} onClick={onClick} isCenter={isCenter}>
      <StyledIcon name={name} />
      <StyledFont100>{text}</StyledFont100>
    </StyledBtnTrans>
  );
}
/**
 *
 * 투명 버튼 반환하는 함수
 *
 * @param {string, string, function}
 * text : 버튼에 들어갈 내용
 * id : 버튼의 id (기본값 text)
 * icon : 아이콘 넣기 -> 아이콘 이름 작성 || 아이콘 안 넣기 -> 인자 없음
 * onClick : 해당 버튼 눌렀을 때 일어나는 이벤트
 * isCenter : content가 버튼에서 가운데 정렬인지 (기본값 true 이니까, 가운데 정렬 안 할 때만 false로)
 * isColumn : 방향 (true : column) (기본값 false 이니까, 방향 바꿀 때만 true로)
 * isActive : click 되었는지 (true : 누름, false : 안 누름) (기본값 false)
 *
 */
function BtnTrans({
  text,
  id = text,
  icon,
  onClick,
  isCenter = true,
  isColumn = false,
  isActive = false,
  degree = 0,
}) {
  return (
    <StyledBtnTrans
      id={id}
      onClick={onClick}
      isCenter={isCenter}
      isColumn={isColumn}
      isActive={isActive}
    >
      {icon && (
        <StyledNoneIcon>
          <StyledIcon name={icon} degree={degree} />
        </StyledNoneIcon>
      )}
      {text}
    </StyledBtnTrans>
  );
}
/**
 * 남색 버튼 반환하는 함수
 *
 * @param {string, string, function}
 * text : 버튼에 들어갈 내용
 * icon : 아이콘 넣기 -> 아이콘 이름 작성 || 아이콘 안 넣기 -> 인자 없음
 * onClick : 해당 버튼 눌렀을 때 일어나는 이벤트
 *
 */
function BtnIndigo({ text, icon, onClick }) {
  return (
    <StyledBtnIndigo id={text} onClick={onClick}>
      {icon && <StyledIcon name={icon} />}
      <StyledFont200b>{text}</StyledFont200b>
    </StyledBtnIndigo>
  );
}
/**
 * 글씨만 있는 버튼 반환하는 함수
 *
 * @param {string, function}
 * text : 버튼에 들어갈 내용
 * onClick : 해당 버튼 눌렀을 때 일어나는 이벤트
 *
 */
function BtnText({ text, icon, onClick }) {
  return (
    <StyledDefaultButton id={text} onClick={onClick}>
      {icon && <StyledIcon name={icon} />}
      <StyledFont100>{text}</StyledFont100>
    </StyledDefaultButton>
  );
}
export {
  StyledButton,
  StyledIcon,
  ButtonTemplate,
  BtnWhite,
  BtnBlue,
  BtnGray,
  BtnTransToggle,
  BtnTrans,
  BtnIndigo,
  BtnText,
};
