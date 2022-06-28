import styled from "styled-components";
import BoxRecCalculator from "../atom-components/BoxRecCalculator";
import styles from "../styles";
import BigTitle from "./BigTitle";

// 배너 미리보기 감싸는 가장 바깥 스타일 정의
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  padding: 0px;
  background: ${styles.styleColor.white300};
  gap: ${styles.styleLayout.basic900};
`;

// 배너 박스 스타일 정의
const BannerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 100%;
`;

// 배너에 그림자 효과 주기 위한 스타일 정의
const Banner = styled.div`
  display: flex:
  flex-direction: row;
  align-items: flex-start;
  pointer-events: none;
  ${styles.styleEffect.opacity100};
`;

/**
 * 배너 미리보기 컴포넌트
 * @param {image, string, string} param0
 * profile: 사용자 프로필
 * title: 계산기 제목
 * description: 계산기 설명
 */
function PreviewBanner({ profile, title, description }) {
  return (
    <Wrapper>
      <BigTitle content="배너 미리보기" />
      <BannerBox>
        <Banner>
          <BoxRecCalculator
            profile={profile}
            name={title}
            description={description}
          />
        </Banner>
      </BannerBox>
    </Wrapper>
  );
}

export default PreviewBanner;
