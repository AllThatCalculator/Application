import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import BigTitle from "../components/atom-components/BigTitle";
import Pagination from "../components/global-component/Pagination";
import {
  ContentLayout,
  FlexColumnLayout,
  FlexRowLayout,
  White300Layout,
} from "../components/Layout";
import { CALCULET } from "../components/search/Calculet";
import SearchCalculet from "../components/search/SearchCalculet";
import styles from "../components/styles";
import { Font } from "../components/atom-components/StyledText";
import Recommend from "../components/global-component/Recommend";
import { BtnWhite } from "../components/atom-components/ButtonTemplate";
import TextWhite from "../components/atom-components/TextWhite";
/**
 * ContentLayout을 상속하는 SearchLayout
 * - flex와 gap, padding 을 새로 설정
 */
const SearchLayout = styled(ContentLayout)`
  flex-direction: column;
  gap: ${styles.styleLayout.basic300};
  padding: ${styles.styleLayout.basic350};
`;
/**
 * ContentLayout을 상속하는 계산기 추천 모듈 감쌈
 * - padding을 새로 설정
 */
const Wrapper = styled(ContentLayout)`
  padding: ${styles.styleLayout.basic350};
`;

/**
 * 검색된 계산기 렌더하는 함수
 *
 * @param {object, boolean}
 * calculets : 추천 계산기 전체 정보
 * loading : 렌더할 준비 되었는지 (정보 잘 가져왔는지)
 *
 */
function RenderCalculet({ calculets, loading }) {
  return (
    <>
      {loading && <div> loading... </div>}
      {
        <FlexColumnLayout>
          {calculets.map((item, index) => (
            <SearchCalculet
              key={index}
              id={item.id}
              title={item.title}
              description={item.description}
              categoryMain={item.category_main}
              categorySub={item.category_sub}
              userName={item.user_name}
              viewCnt={item.view_cnt}
              likeCnt={item.like_cnt}
              bookmarkCnt={item.bookmark_cnt}
              index={index}
            />
          ))}
        </FlexColumnLayout>
      }
    </>
  );
}
/**
 * 검색 리스트 페이지
 */
function Search() {
  // 검색된 계산기 개수
  const KEY_MAX = CALCULET.length;
  // 한 페이지 당 렌더할 계산기 개수
  const KEY_PAGE = 10;
  // 로딩 상태
  const [loading, setLoading] = useState(false);
  // 전체 계산기 정보
  const [calculets, setCalculets] = useState([]);
  // 현재 페이지 네비
  const [currentPage, setCurrentPage] = useState(1);

  // 검색된 계산기 정보 가져오고 로딩 품
  // 우선, 검색 결과로 관련된 계산기 더미 가져옴.
  useEffect(() => {
    setLoading(true);
    const response = CALCULET;
    setCalculets(response.slice(0, KEY_MAX));
    setLoading(false);
  }, []);

  // 예를 들어/ 한 페이지당 3 일 때, 2 페이지 네비버튼을 누르면, 4~6 번째 계산기가 렌더
  const indexOfLast = currentPage * KEY_PAGE;
  const indexOfFirst = indexOfLast - KEY_PAGE;
  function currentCalculets(tmp) {
    return tmp.slice(indexOfFirst, indexOfLast);
  }

  return (
    <>
      <White300Layout>
        <SearchLayout>
          <BigTitle content="관련된 계산기들" />
          {KEY_MAX ? (
            <>
              <RenderCalculet
                calculets={currentCalculets(calculets)}
                loading={loading}
              />
              <Pagination
                renderPerPage={KEY_PAGE}
                renderTotal={calculets.length}
                paginate={setCurrentPage}
                currentPage={currentPage}
                isBlue={true}
              />
            </>
          ) : (
            <Font font="text200" color={styles.styleColor.gray100}>
              검색된 결과가 없습니다.
            </Font>
          )}
        </SearchLayout>
      </White300Layout>
      {!KEY_MAX && (
        <Wrapper>
          <FlexColumnLayout gap="20px">
            <TextWhite text="다른 계산기들도 있어요 🤗" />
            <FlexRowLayout>
              <BtnWhite text="더보기" />
            </FlexRowLayout>
            <Recommend />
          </FlexColumnLayout>
        </Wrapper>
      )}
    </>
  );
}
export default Search;
