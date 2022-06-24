import styled from "styled-components";
import styles from "../styles.js";

const StyledTitle = styled.div`
  padding: 0px 0px 0px ${styles.styleLayout.basic900};
  border-left: 3px solid ${styles.styleColor.blue400};
  height: 19px;
  color: ${styles.styleColor.blue900};
  ${styles.sytleText.text300};
`;

export default StyledTitle;
