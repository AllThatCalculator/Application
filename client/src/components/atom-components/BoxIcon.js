import styled from "styled-components";
import { FlexRowLayout } from "../Layout";
import styles from "../styles";
import { StyledIcon } from "./ButtonTemplate";
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
 * 사진 width x height
 */
const StyledImg = styled.img`
  display: flex;
  align-self: center;
  width: ${(props) => props.width};
  height: ${(props) => props.heigth};
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
/**
 * 아이콘 색 바꾸기
 * props.color
 * -> {styles.styleColor.blue400}
 */
const StyledColor = styled(FlexRowLayout)`
  color: ${(props) => props.color};
`;
/**
 * 색을 입힌 아이콘
 *
 * @param {string, string} param0
 *
 * icon : 아이콘 이름
 * color : 아이콘 색
 */
function IconColorBox({ icon, color }) {
  return (
    <StyledColor color={color}>
      <StyledIcon name={icon} />
    </StyledColor>
  );
}
export { BoxIcon, StyledIcon, StyledProfileImgBig, IconColorBox, StyledImg };
