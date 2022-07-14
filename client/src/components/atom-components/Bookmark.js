import styled from "styled-components";
import { Link } from "react-router-dom";
import styles from "../styles";

const Positioner = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${styles.styleLayout.basic700};
`;
// 해당 계산기 페이지로 넘어갈 수 있도록 Link를 스타일드 했다.
const StyledLink = styled(Link)`
  color: ${styles.styleColor.white300};
  ${styles.sytleText.text100};
  text-decoration-line: none;
`;

/**
 * 북마크한 계산기 리스트 컴포넌트
 *
 * @param {object} param0
 *
 * info : <배열> 북마크한 계산기 배열
 * -> id : 계산기 ID
 * -> title : 계산기 이름
 *
 */
function Bookmark({ info }) {
  return (
    <Positioner>
      {info.map((conts, index) => (
        <StyledLink to={"/calculet/" + conts.id} key={index}>
          {conts.title}
        </StyledLink>
      ))}
    </Positioner>
  );
}

export default Bookmark;
