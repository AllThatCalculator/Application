import styled from "styled-components";
import styles from "../styles";
import StyledTitle from "./Title";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: ${styles.styleLayout.basic900};
`;

const BannerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0px;
`;

const BannerBg = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 18px 22px;
  width: 100%;
  gap: ${styles.styleLayout.basic700};
  background: linear-gradient(
    137.73deg,
    rgba(255, 255, 255, 0.75) 38.1%,
    rgba(255, 255, 255, 0) 122.62%
  );
  /* opacity100 */
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  border-radius: 10px;
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

function PreviewBanner({ profile, title, description }) {
  return (
    <Wrapper>
      <StyledTitle>배너 미리보기</StyledTitle>
      <BannerBox>
        <BannerBg>
          <Positioner>
            <StyledProfileImg src={profile}></StyledProfileImg>

            {title.length <= 20 ? (
              <StyledName>{title}</StyledName>
            ) : (
              <StyledNameOF>{title}</StyledNameOF>
            )}
          </Positioner>
          <StyledDescriptionOF>{description}</StyledDescriptionOF>
        </BannerBg>
      </BannerBox>
    </Wrapper>
  );
}

export default PreviewBanner;
