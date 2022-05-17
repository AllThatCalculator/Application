import styled from "styled-components";
import styles from "../styles";
import { Icons } from "./Icons";
//스타일드 기본 박스
const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  min-width: max-content;
  color: ${styles.styleColor.blue900};
  gap: ${styles.styleLayout.basic50};

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
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
// 통계용 텍스트 - 버튼 이름
const StyledNameText = styled.div`
  display: flex;
  min-width: max-content;
  align-items: center;
  color: ${styles.styleColor.blue900};
  ${styles.sytleText.text50};
`;
// 통계용 텍스트 - 통계수
const StyledNumberText = styled(StyledNameText)`
  color: ${styles.styleColor.gray100};
`;
// 프로필 사진
const StyledProfileImg = styled.img`
  ${styles.styleSize.small};
  border-radius: 50%;
`;
/**
 *
 * @param {정보이름, 아이콘, 통계수, 프로필 이미지} param0
 * @returns
 */
function BoxIcon({ text, icon, number, profile }) {
  return (
    <StyledDiv id={text} name={icon}>
      {profile ? (
        <StyledProfileImg src={profile}></StyledProfileImg>
      ) : (
        <StyledIcon name={icon}></StyledIcon>
      )}
      <StyledNameText>{text}</StyledNameText>
      <StyledNumberText>{number}</StyledNumberText>
    </StyledDiv>
  );
}
export { BoxIcon };
