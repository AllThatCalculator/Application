import styled from "styled-components";
import styles from "../styles";
import Bookmark from "../atom-components/Bookmark";

const Positioner = styled.div`
  ${styles.sizes.desktopWidth200};
  position: absolute;
  right: 0;
  top: 60px;
`;
// 북마크된 계산기 리스트 바
function BookmarkBar() {
  return (
    <Positioner>
      <Bookmark />
    </Positioner>
  );
}

export default BookmarkBar;
