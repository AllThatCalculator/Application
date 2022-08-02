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

function GuideText({ content }) {
  return <StyledGuideText>{content}</StyledGuideText>;
}

export default GuideText;
