import styled from "styled-components";
import styles from "../components/styles";
import TabMenu from "../components/register/TabMenu";
import WriteInform from "../components/register/WriteInform";
import UploadDoneBtn from "../components/register/UploadDoneBtn";

// 계산기 저작 배경 색
const Positioner = styled.div`
  background: ${styles.styleColor.white300};
`;

// 계산기 저작 배경 컴포넌트 사이즈 고정
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: ${styles.styleLayout.basic300};
  ${styles.sizes.desktop};
  padding: ${styles.styleLayout.basic350};
`;

function Register() {
  return (
    <>
      <Positioner>
        <Wrapper>
          <WriteInform />
          <TabMenu />
          <UploadDoneBtn />
        </Wrapper>
      </Positioner>
    </>
  );
}
export default Register;
