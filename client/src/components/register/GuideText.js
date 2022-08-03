import styled from "styled-components";
import { FlexRowLayout } from "../Layout";
import styles from "../styles";

const StyledGuideText = styled(FlexRowLayout)`
  align-items: flex-start;
  padding: ${styles.styleLayout.basic700};
  color: ${styles.styleColor.gray100};
  ${styles.sytleText.text100};
  white-space: pre-line;
`;

/**
 * 디자인 패널의 역할과 사용법을 가이드하는 텍스트 컴포넌트
 * @param {string}
 * content: 가이드 텍스트
 */
function GuideText({ content }) {
  return <StyledGuideText>{content}</StyledGuideText>;
}

export default GuideText;
