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
// 프로필 큰 사진
const StyledProfileImgBig = styled.img`
  background: ${styles.styleColor.blue900};
  ${styles.styleSize.big};
  border-radius: 50%;
`;
/**
 *
 * 버튼이 아닌! 아이콘 + 정보 를 나타내는 컴포넌트 반환 함수
 *
 * @param {string, string, int, string}
 * text : 버튼 정보 (조회수, 제작자닉네임)
 * icon : 아이콘 이름
 * number : 통계수
 * profile : 프로필 이미지 경로
 *
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
export { BoxIcon, StyledIcon, StyledProfileImgBig };
