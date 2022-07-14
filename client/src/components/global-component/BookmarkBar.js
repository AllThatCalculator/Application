import styled from "styled-components";
import Bookmark from "../atom-components/Bookmark";
import styles from "../styles";

const Positioner = styled.div`
  position: fixed;
  right: 0;
  top: 60px;
  height: 100%;
  background: ${styles.styleColor.black50a};
  padding: ${styles.styleLayout.basic300};
  max-width: 163px;
  z-index: 101;
`;
/**
 *
 * 오른쪽 고정바 (북마크된 계산기들 + 나중에 추가할 약간의 부가적인 기능들)
 * -> width가 고정이어서 불편할 수 있기에, 토글로 숨길 수 있도록 고려
 *
 */
function BookmarkBar() {
  // 북마크한 계산기들
  const contents_bookmark = [
    { id: 4, title: "사칙연산계산기" },
    { id: 1, title: "계산기" },
    { id: 13, title: "사칙연산계산기ㅁㅁㅁㅁㅁㅁㅁㅁㅁ" },
    { id: 43, title: "사칙연산계산기" },
    { id: 52, title: "진법계산기" },
    { id: 6, title: "사칙연산계산ㅇㄹㄴㅁㄴ기" },
    { id: 7, title: "사칙연산계산기" },
  ];

  return (
    <Positioner>
      <Bookmark info={contents_bookmark} />
    </Positioner>
  );
}

export default BookmarkBar;
