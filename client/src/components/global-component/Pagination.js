import styled from "styled-components";
import styles from "../styles.js";
import { BtnSmallIcon } from "../atom-components/ButtonIcon.js";

// 네비 감싼거
const Positioner = styled.div`
  display: flex;
  gap: ${styles.styleLayout.basic700};
`;
// 네비 버튼
const StyledButton = styled.button`
  ${styles.styleSize.small};
  width: 16px;

  background: ${styles.styleColor.green25.color};
  opacity: ${styles.styleColor.green25.opacity};
  border-radius: 50%;
  border: ${styles.styleColor.white50.color} 0.5px solid;

  cursor: pointer;
  &:hover {
    background: ${styles.styleColor.green200.color};
    opacity: ${styles.styleColor.green200.opacity};
  }
`;
// 네비 버튼 활성화 됐을 때
const StyledActiveButton = styled(StyledButton)`
  background: ${styles.styleColor.green200.color};
  opacity: ${styles.styleColor.green200.opacity};
`;
/**
 *
 * @param {한 페이지 당 계산기 개수, 전체 개수, onClick에 따라 현재 페이지를 네비할 함수} param0
 * @returns
 */
const Pagination = ({ renderPerPage, renderTotal, paginate, currentPage }) => {
  // 동그라미 개수(페이지 개수)
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(renderTotal / renderPerPage); i++) {
    pageNumbers.push(i);
  }
  const pages = pageNumbers.length;

  // 왼쪽 페이지 버튼 이벤트
  function prvPage() {
    paginate(currentPage - 1 <= 0 ? pages : currentPage - 1);
  }
  // 오른쪽 페이지 버튼 이벤트
  function nextPage() {
    paginate((currentPage % pages) + 1);
  }
  // 네비버튼 클릭하면, Recommend의 currentPage 상태값이 변경되고
  // Recommned에서 작성한 대로 배열 데이터 값이 분할되어 추천 계산기가 렌더됨
  return (
    <Positioner className="Pagination">
      <BtnSmallIcon
        text="왼쪽페이지"
        icon="ChevronLeft"
        onClick={() => prvPage()}
      />
      {pageNumbers.map((number) => (
        <StyledButton
          key={number}
          className="page-link"
          onClick={() => paginate(number)}
        />
      ))}
      <BtnSmallIcon
        text="오른쪽페이지"
        icon="ChevronRight"
        onClick={() => nextPage()}
      />
    </Positioner>
  );
};
export default Pagination;
