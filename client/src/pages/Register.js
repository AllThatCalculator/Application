import styled from "styled-components";
import styles from "../components/styles";
import TabMenu from "../components/register/TabMenu";
import StyledTitle from "../components/register/Title";

// 계산기 저작 배경 색
const Positioner = styled.div`
  background: ${styles.styleColor.white300};
`;

// 계산기 저작 배경 컴포넌트 사이즈 고정
const Wrapper = styled.div`
  margin: 0 auto;
  ${styles.sizes.desktop};
  padding: ${styles.styleLayout.basic350};
`;

function Register() {
  return (
    <>
      <Positioner>
        <Wrapper>
          <StyledTitle>계산기 코드 입력하기</StyledTitle>
          <TabMenu></TabMenu>
        </Wrapper>
      </Positioner>
    </>
  );
}
export default Register;
