import styled from "styled-components";
import styles from "../styles";
import Bookmark from "../atom-components/Bookmark";

const Positioner = styled.div`
  ${styles.sizes.desktopWidth200};
  position: absolute;
  right: 0;
  top: 60px;
`;
/**
 *
 * 오른쪽 고정바 (북마크된 계산기들 + 나중에 추가할 약간의 부가적인 기능들)
 * -> 너무 고정적이어서, 크기를 flex로 하고 토글로 없앨 수 있도록 고려
 */
function BookmarkBar() {
  return (
    <Positioner>
      <Bookmark />
    </Positioner>
  );
}

export default BookmarkBar;
