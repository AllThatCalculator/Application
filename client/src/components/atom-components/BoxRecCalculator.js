import styled, { keyframes } from "styled-components";
import styles from "../styles.js";
//스타일드 애니메이션
const fadein = keyframes`
  to {
    background: ${styles.styleColor.white200.color};
    opacity: ${styles.styleColor.white200.opacity};
  }
`;
const transform = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.97);
  }
`;
//스타일드 버튼
const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  padding: ${styles.styleLayout.basic400};
  ${styles.styleSize.buttonRecommend};

  ${styles.styleColor.white100};
  color: ${styles.styleColor.black};
  gap: ${styles.styleLayout.basic700};
  ${styles.styleBorder.basic200};
  text-align: left;
  cursor: pointer;
  &:hover {
    animation-duration: 0.3s;
    animation-name: ${fadein};
    animation-fill-mode: forwards;
  }
  &:active {
    animation-duration: 0.5s;
    animation-name: ${transform};
    animation-fill-mode: forwards;
    background: ${styles.styleColor.white200.color};
    opacity: ${styles.styleColor.white200.opacity};
  }
`;
// 프로필, 계산기이름 감쌈
const Positioner = styled.div`
  display: flex;
  align-items: center;
  height: ${styles.styleLayout.basic1000};
  width: 100%;
  gap: ${styles.styleLayout.basic700};
`;
// 프로필
const StyledProfileImg = styled.img`
  background: ${styles.styleColor.blue900};
  ${styles.styleSize.big};
  border-radius: 50%;
`;
// 계산기 이름
const StyledName = styled.div`
  display: flex;
  align-items: center;
  ${styles.sytleText.text300};
`;
// 계산기 이름 - overflow
const StyledNameOF = styled.div`
  ${styles.sytleText.text300};
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  white-space: normal;
  line-height: 1;
  height: 2em;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
// 계산기 설명
const StyledDescriptionOF = styled(StyledNameOF)`
  ${styles.sytleText.text100};
`;
/**
 *
 * @param {계산기 이름, 간단 설명, 프로필이미지} param0
 * @returns
 */
function BoxRecCalculator({ name, description, profile }) {
  return (
    <StyledButton id={name} description={description}>
      <Positioner>
        <StyledProfileImg src={profile}></StyledProfileImg>

        {name.length <= 20 ? (
          <StyledName>{name}</StyledName>
        ) : (
          <StyledNameOF>{name}</StyledNameOF>
        )}
      </Positioner>
      <StyledDescriptionOF>{description}</StyledDescriptionOF>
    </StyledButton>
  );
}

export default BoxRecCalculator;
