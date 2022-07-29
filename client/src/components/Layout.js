import styled from "styled-components";
import styles from "./styles";

const DESKTOP = "1080px";
const TABLET = "768px";
const PHONE = "360px";

/**
 * 헤더 감싸는 최상위 레이아웃
 */
const HeaderLayout = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 60px;
  padding: ${styles.styleLayout.basic600};
  z-index: 100;
`;

/**
 * 컨텐트 감싸는 최상위 레이아웃
 */
const ContentLayout = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;

  @media (min-width: ${PHONE}) and (max-width: ${TABLET}) {
    ${styles.sizes.phone};
  }
  @media (min-width: ${TABLET}) and (max-width: ${DESKTOP}) {
    ${styles.sizes.tablet};
  }
  @media screen and (min-width: ${DESKTOP}) {
    ${styles.sizes.desktop};
  }
`;

/**
 * 배경색 없는 width 100% 레이아웃
 */
const TransparentLayout = styled.div`
  width: 100%;
`;

/**
 * TransparentLayout을 상속한 배경색 레이아웃
 */
const White300Layout = styled(TransparentLayout)`
  background: ${styles.styleColor.white300};
`;

/**
 * TransparnetLayout을 상속한 배경색 레이아웃
 */
const Blue100Layout = styled(TransparentLayout)`
  background: ${styles.styleColor.blue100};
`;

/**
 * 테블릿 너비에 따라 flex-direction을 바꿔주는 레이아웃
 */
const ResponsiveTabletLayout = styled.div`
  display: flex;
  @media screen and (max-width: ${DESKTOP}) {
    flex-direction: column;
    gap: ${(props) => (props.columnGap ? `${props.columnGap}` : `0px`)};
  }
  @media screen and (min-width: ${DESKTOP}) {
    flex-direction: row;
    gap: ${(props) => (props.rowGap ? `${props.rowGap}` : `0px`)};
  }
`;

/**
 * 폰 너비에 따라 flex-direction을 바꿔주는 레이아웃
 */
const ResponsivePhoneLayout = styled.div`
  display: flex;
  @media screen and (max-width: ${TABLET}) {
    flex-direction: column;
    gap: ${(props) => (props.columnGap ? `${props.columnGap}` : `0px`)};
  }
  @media screen and (min-width: ${TABLET}) {
    flex-direction: row;
    gap: ${(props) => (props.rowGap ? `${props.rowGap}` : `0px`)};
  }
`;

/**
 * row 방향 flex 레이아웃
 */
const FlexRowLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${(props) => (props.gap ? `${props.gap}` : `0px`)};
`;

/**
 * column 방향 flex 레이아웃
 */
const FlexColumnLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.gap ? `${props.gap}` : `0px`)};
`;

export {
  HeaderLayout,
  ContentLayout,
  TransparentLayout,
  White300Layout,
  Blue100Layout,
  ResponsivePhoneLayout,
  ResponsiveTabletLayout,
  FlexRowLayout,
  FlexColumnLayout,
};
