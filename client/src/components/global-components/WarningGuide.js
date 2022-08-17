import styled from "styled-components";
import { FlexRowLayout } from "../Layout";
import styles from "../styles";
import { IconColorBox } from "../atom-components/BoxIcon";

/**
 * WarningGuide 컴포넌트의 스타일 정의
 */
const StyledWarningGuide = styled.div`
  color: ${styles.styleColor.red500};
  ${styles.sytleText.text100};
`;

const Wrapper = styled(FlexRowLayout)`
  align-items: center;
`;

/**
 * 경고 메세지 컴포넌트
 *
 * @param {string, string} param0
 * content : 경고 안내
 */
function WarningGuide({ content }) {
  return (
    <Wrapper gap="10px">
      <IconColorBox
        icon="ExclamationCircleFill"
        color={styles.styleColor.red500}
      />
      <StyledWarningGuide>{content}</StyledWarningGuide>
    </Wrapper>
  );
}
export default WarningGuide;
