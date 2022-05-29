import styled from "styled-components";
import BoxRecCalculator from "../atom-components/BoxRecCalculator.js";
import Pagination from "./Pagination.js";
import styles from "../styles.js";
import { useEffect, useState } from "react";

// 기본 레이아웃
const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;
// 추천 계산기 모듈 + 페이지 넘기는 버튼 감싼거
const Positioner = styled(StyledDiv)`
  flex-direction: column;
  align-items: center;
  gap: ${styles.styleLayout.basic300};
`;
// 추천 계산기 모듈 감싼거
const Wrapper = styled(StyledDiv)`
  ${styles.sizes.desktop};
  justify-content: space-around;
`;

/**
 *
 * 추천 계산기 렌더하는 함수 (Recommend 내에서 처리하는 함수에요)
 *
 * @param {object, boolean}
 * calculets : 추천 계산기 전체 정보
 * loading : 렌더할 준비 되었는지 (정보 잘 가져왔는지)
 *
 */
function RenderCalculet({ calculets, loading }) {
  return (
    <>
      {loading && <Wrapper> loading... </Wrapper>}
      <Wrapper>
        {calculets.map((item) => (
          <BoxRecCalculator
            key={item.id}
            name={item.title}
            description={item.body}
            profile="/img/ori.png"
          />
        ))}
      </Wrapper>
    </>
  );
}
/**
 *
 * 원하는 네비게이션 바에 따라, 추천 계산기 페이지를 렌더하는 함수
 * 한 번에 계산기들 fetch 후, KEY_MAX 만큼 자름 -> 추천 계산기 전체 수
 * 한 페이지 당 KEY_PAGE 만큼 렌더하도록 함
 *
 */
function Recommend() {
  // 추천 계산기 최대 개수
  const KEY_MAX = 15;
  // 한 페이지 당 렌더할 계산기 개수
  const KEY_PAGE = 3;

  // 로딩 상태
  const [loading, setLoading] = useState(false);
  // 전체 추천 계산기 정보
  const [calculets, setCalculets] = useState([]);
  // 현재 페이지 네비
  const [currentPage, setCurrentPage] = useState(1);

  // 계산기 정보 15개 가져오고 로딩 품
  // 우선, 예제 api 가져옴
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await (
        await fetch("https://jsonplaceholder.typicode.com/posts")
      ).json();
      setCalculets(response.slice(0, KEY_MAX));
      setLoading(false);
    }
    fetchData();
  }, []);

  // 예를 들어, 2 페이지 네비버튼을 누르면, 4~6 번째 계산기가 렌더
  const indexOfLast = currentPage * KEY_PAGE;
  const indexOfFirst = indexOfLast - KEY_PAGE;
  function currentCalculets(tmp) {
    return tmp.slice(indexOfFirst, indexOfLast);
  }

  // currentPage는 Pagination에서 onClick에 따라 네비됨
  return (
    <Positioner className="Recommend">
      <RenderCalculet
        calculets={currentCalculets(calculets)}
        loading={loading}
      ></RenderCalculet>
      <Pagination
        renderPerPage={KEY_PAGE}
        renderTotal={calculets.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      ></Pagination>
    </Positioner>
  );
}

export default Recommend;
