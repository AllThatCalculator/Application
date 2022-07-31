import styled from "styled-components";
import styles from "../styles.js";
import { BtnSmallIcon } from "../atom-components/ButtonIcon.js";
import { FlexRowLayout } from "../Layout.js";

/**
 * 네비 버튼
 */
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
/**
 * blue 네비 버튼
 */
const StyledButtonBlue = styled(StyledButton)`
  background: ${styles.styleColor.blue30};
  opacity: 1;
  border: ${styles.styleColor.blue900} 0.5px solid;

  cursor: pointer;
  &:hover {
    background: ${styles.styleColor.blue300};
    opacity: 1;
    ${styles.styleEffect.opacity100};
    border-width: 1px;
  }
`;
/**
 * 네비 버튼 활성화 됐을 때
 */
const active = {
  background: `${styles.styleColor.green200.color}`,
  opacity: `${styles.styleColor.green200.opacity}`,
};
/**
 * blue 네비 버튼 활성화 됐을 때
 */
const activeBlue = {
  background: `${styles.styleColor.blue300}`,
  filter: `drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25))`,
  "border-width": `1px`,
};

/**
 * 가운데 정렬
 */
const Wrapper = styled(FlexRowLayout)`
  justify-content: center;
`;

/**
 * 왼쪽, 오른쪽, 동그라미 네비버튼 눌러서 원하는 페이지 보이게 하는 네비게이션 바
 *
 * @param {int , int, function, int}
 * renderPerPage : 한 페이지 당 렌더할 계산기 개수
 * renderTotal : 계산기 전체 개수 (처음~끝 페이지)
 * paginate : onClick에 따라 현재 페이지를 네비할 함수 -> paginate에 의해 currentPage 바뀜
 * currentPage : 현재 페이지
 * isBlue : 파란색 네이게이션 바인지 여부
 *
 */
function Pagination({
  renderPerPage,
  renderTotal,
  paginate,
  currentPage,
  isBlue,
}) {
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
    <Wrapper gap="10px">
      <BtnSmallIcon
        text="왼쪽페이지"
        icon="ChevronLeft"
        color={isBlue && "blue"}
        onClick={() => prvPage()}
      />
      {pageNumbers.map((number, index) =>
        isBlue ? (
          <StyledButtonBlue
            style={index + 1 === currentPage ? activeBlue : null}
            key={number}
            onClick={() => paginate(number)}
          />
        ) : (
          <StyledButton
            style={index + 1 === currentPage ? active : null}
            key={number}
            onClick={() => paginate(number)}
          />
        )
      )}
      <BtnSmallIcon
        text="오른쪽페이지"
        icon="ChevronRight"
        color={isBlue && "blue"}
        onClick={() => nextPage()}
      />
    </Wrapper>
  );
}
export default Pagination;
