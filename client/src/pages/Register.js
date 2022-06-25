import styled from "styled-components";
import styles from "../components/styles";
import TabMenu from "../components/register/TabMenu";
import StyledTitle from "../components/register/Title";
import WriteInform from "../components/register/WriteInform";
import PreviewBanner from "../components/register/PreviewBanner";

// 계산기 저작 배경 색
const Positioner = styled.div`
  background: ${styles.styleColor.white300};
`;

// 계산기 저작 배경 컴포넌트 사이즈 고정
const Wrapper = styled.div`
  margin: 0 auto;
  gap: ${styles.styleLayout.basic300};
  ${styles.sizes.desktop};
  padding: ${styles.styleLayout.basic350};
`;

//정보칸 + 배너 미리보기 감싸는 컴포넌트
const WrapperInformBanner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 0px 38px;
  gap: ${styles.styleLayout.basic300};
  border-bottom: 1px solid ${styles.styleColor.blue50};
`;

const WrapperRatio2dot05 = styled.div`
  flex: 2.05;
`;

const WrapperRatio1 = styled.div`
  flex: 1;
`;

function Register() {
  return (
    <>
      <Positioner>
        <Wrapper>
          <WrapperInformBanner>
            <WrapperRatio2dot05>
              <WriteInform />
            </WrapperRatio2dot05>
            <WrapperRatio1>
              <PreviewBanner />
            </WrapperRatio1>
          </WrapperInformBanner>
          <StyledTitle>계산기 코드 입력하기</StyledTitle>
          <TabMenu></TabMenu>
        </Wrapper>
      </Positioner>
    </>
  );
}
export default Register;
