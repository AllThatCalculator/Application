import styled from "styled-components";
import { Font } from "../atom-components/StyledText";
import { FlexRowLayout } from "../Layout";
import styles from "../styles";

const WrapperCenter = styled(FlexRowLayout)`
  gap: ${styles.styleLayout.basic300};
  align-items: center;
`;

const StyledLine = styled.div`
  height: 0px;
  border-bottom: 1px solid ${styles.styleColor.blue50};
  flex-grow: 1;
`;

function OtherLine() {
  return (
    <WrapperCenter>
      <StyledLine />
      <Font font="text200" color={styles.styleColor.blue50}>
        또는
      </Font>
      <StyledLine />
    </WrapperCenter>
  );
}

export default OtherLine;
