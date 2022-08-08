import styled from "styled-components";
import {
  ContentLayout,
  DESKTOP,
  FlexColumnLayout,
  PHONE,
  TABLET,
  White300Layout,
} from "../components/Layout";
import styles from "../components/styles";
import BigTitle from "../components/atom-components/BigTitle";
import CalculetItemList from "../components/calculet-list/CalculetItemList";
import { CALCULETS } from "../components/calculet-list/Calculets";
import Shortcut from "../components/calculet-list/Shortcut";
import UseMoveScroll from "../user-hooks/UseMoveScroll";

/**
 * 흰색 뒷 배경
 */
const StyledWhite300 = styled(White300Layout)`
  position: fixed;
  top: 60px;
  bottom: 0;
  z-index: -1;
`;
/**
 * ContentLayout을 상속하는 CalculetListLayout
 * - flex와 gap, padding 설정을 새로 함
 */
const CalculetListLayout = styled(ContentLayout)`
  display: flex;
  gap: ${styles.styleLayout.basic300};
  padding: ${styles.styleLayout.basic350};
`;
/**
 * 바로가기 너비
 * 계산기 전체 목록 너비
 */
const Wrapper = styled(FlexColumnLayout)`
  @media (min-width: ${PHONE}) and (max-width: ${TABLET}) {
    width: ${(props) => props.phone};
  }
  @media (min-width: ${TABLET}) and (max-width: ${DESKTOP}) {
    width: ${(props) => props.tablet};
  }
  @media screen and (min-width: ${DESKTOP}) {
    width: ${(props) => props.desktop};
  }
`;
/**
 * 바로가기 고정
 */
const WrapperFix = styled(FlexColumnLayout)`
  position: fixed;
`;

/**
 * 계산기 전체 목록 페이지
 */
function CalculetList() {
  /**
   * 바로가기를 위한 ref
   */
  const math = UseMoveScroll();
  const science = UseMoveScroll();
  const economy = UseMoveScroll();
  const daily = UseMoveScroll();
  const etc = UseMoveScroll();

  return (
    <>
      <StyledWhite300 />
      <CalculetListLayout>
        <Wrapper phone="56px" tablet="78px" desktop="72px">
          <WrapperFix>
            <Shortcut
              math={math}
              science={science}
              economy={economy}
              daily={daily}
              etc={etc}
            />
          </WrapperFix>
        </Wrapper>
        <Wrapper phone="284px" tablet="669px" desktop="988px" gap="28px">
          <BigTitle content="계산기 전체 목록" />
          <CalculetItemList
            item={CALCULETS}
            math={math}
            science={science}
            economy={economy}
            daily={daily}
            etc={etc}
          />
        </Wrapper>
      </CalculetListLayout>
    </>
  );
}
export default CalculetList;
