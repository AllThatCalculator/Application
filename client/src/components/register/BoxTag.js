import styled from "styled-components";
import { FlexRowLayout } from "../Layout";
import styles from "../styles";

const Wrapper = styled(FlexRowLayout)`
  align-items: center;
  padding: 18px 10px;
  gap: ${styles.styleLayout.basic700};
  width: 100%;
`;

const TagBox = styled.div`
  ${styles.sytleText.buttonWhite};
  color: ${styles.styleColor.blue300};
`;

const NameBox = styled(FlexRowLayout)`
  justify-content: space-between;
  align-items: center;
  padding: ${styles.styleLayout.basic700};

  width: 100%;

  background: ${styles.styleColor.blue30};
  border-radius: 7px;
`;

function BoxTag() {
  return;
}

export default BoxTag;
