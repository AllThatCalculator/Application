import styled from "styled-components";
import { BtnWhite } from "../atom-components/ButtonTemplate";
import TextWhite from "../atom-components/TextWhite";
import { ContentLayout, FlexColumnLayout, FlexRowLayout } from "../Layout";
import styles from "../styles";
import Recommend from "./Recommend";

/**
 * ContentLayout을 상속하는 계산기 추천 모듈 감쌈
 * - padding을 새로 설정
 */
const Wrapper = styled(ContentLayout)`
  padding: ${styles.styleLayout.basic350};
`;

function FooterRecommend() {
  return (
    <Wrapper>
      <FlexColumnLayout gap="20px">
        <TextWhite text="다른 계산기들도 있어요 🤗" />
        <FlexRowLayout>
          <BtnWhite text="더보기" />
        </FlexRowLayout>
        <Recommend />
      </FlexColumnLayout>
    </Wrapper>
  );
}
export default FooterRecommend;
