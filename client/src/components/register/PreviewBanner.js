import styled from "styled-components";
import BoxRecCalculator from "../atom-components/BoxRecCalculator";
import styles from "../styles";
import BigTitle from "./BigTitle";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  padding: 0px;
  background: ${styles.styleColor.white300};
  gap: ${styles.styleLayout.basic900};
`;

const BannerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 100%;
`;

const Banner = styled.div`
  display: flex:
  flex-direction: row;
  align-items: flex-start;
  pointer-events: none;
  ${styles.styleEffect.opacity100};
`;

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
