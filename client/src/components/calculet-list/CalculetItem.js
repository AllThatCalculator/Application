import styled from "styled-components";
import { DESKTOP, PHONE, TABLET } from "../Layout";
import styles from "../styles";

/**
 * 스크린 크기에 따른 렌더 개수
 * 데스크탑 : 3개
 * 타블렛 : 2개
 * 핸드폰 : 1개
 */
const DESKTOP_RENDER_KEY = "33%";
const TABLET_RENDER_KEY = "50%";
const PHONE_RENDER_KEY = "100%";

/**
 * 계산기 컴포넌트 스타일
 */
const StyledCalculetItem = styled.button`
  display: flex;
  background: transparent;

  ${styles.styleBorder.basic100};
  padding: ${styles.styleLayout.basic300} ${styles.styleLayout.basic700}
    ${styles.styleLayout.basic300} 0;

  ${styles.sytleText.text100};

  min-width: max-content;
  @media (min-width: ${PHONE}) and (max-width: ${TABLET}) {
    width: ${PHONE_RENDER_KEY};
  }
  @media (min-width: ${TABLET}) and (max-width: ${DESKTOP}) {
    width: ${TABLET_RENDER_KEY};
  }
  @media screen and (min-width: ${DESKTOP}) {
    width: ${DESKTOP_RENDER_KEY};
  }

  ${(props) =>
    props.item
      ? `
    cursor: pointer;
    &:hover {
      ${styles.sytleText.buttonWhite};
      color: ${styles.styleColor.blue500};
    }}`
      : `color: ${styles.styleColor.gray50};`}
`;
/**
 * 계산기 전체 목록에서 각 계산기 컴포넌트 스타일
 * @param {string, boolean} param0
 * content : 계산기 이름
 * onClick : 이벤트
 * item : 존재 여부 (기본값 true)
 */
function CalculetItem({ content, onClick, item = true }) {
  return (
    <StyledCalculetItem onClick={onClick} item={item}>
      {content}
    </StyledCalculetItem>
  );
}
export default CalculetItem;
