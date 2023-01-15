import BoxRecCalculator from "../atom-components/BoxRecCalculator.js";
import { useEffect, useState } from "react";
import { Grid, Pagination } from "@mui/material";
import useSx from "../../hooks/useSx.js";

/**
 *
 * 원하는 네비게이션 바에 따라, 추천 계산기 페이지를 렌더하는 함수
 * 한 번에 계산기들 fetch 후, KEY_MAX 만큼 자름 -> 추천 계산기 전체 수
 * 한 페이지 당 KEY_PAGE 만큼 렌더하도록 함
 *
 */
function Recommend() {
  const { isWindowMdDown, isWindowSmDown } = useSx();
  // 추천 계산기 최대 개수
  const KEY_MAX = 15;
  // 한 페이지 당 렌더할 계산기 개수
  const KEY_PAGE = 4;
  const [keyCurPage, setkeyCurPage] = useState(KEY_PAGE);
  useEffect(() => {
    if (isWindowSmDown) {
      setkeyCurPage(3);
    } else if (isWindowMdDown) {
      setkeyCurPage(4);
    } else {
      setkeyCurPage(3);
    }
  }, [isWindowMdDown, isWindowSmDown]);

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
  const indexOfLast = currentPage * keyCurPage;
  const indexOfFirst = indexOfLast - keyCurPage;
  function currentCalculets(tmp) {
    return tmp.slice(indexOfFirst, indexOfLast);
  }

  // currentPage는 Pagination에서 onClick에 따라 네비됨

  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        columns={{ xs: 1, sm: 2, md: 3 }}
        sx={{ salignContent: "stretch" }}
      >
        {loading ? (
          <div> loading... </div>
        ) : (
          currentCalculets(calculets).map((item, index) => (
            <Grid item xs={1} sm={1} md={1} key={index}>
              <BoxRecCalculator
                name={item.title}
                nickName="닉네임"
                description={item.body}
                profile="/img/ori.png"
              />
            </Grid>
          ))
        )}
      </Grid>
      <Grid container sx={{ w: 1, justifyContent: "center" }}>
        <Pagination
          count={Math.ceil(KEY_MAX / keyCurPage)}
          page={page}
          onChange={handlePageChange}
          color="secondary"
        />
      </Grid>
    </>
    // <Wrapper gap="15px">
    //   <ResponsivePhoneLayout columnGap="20px" rowGap="20px">
    //     <RenderCalculet
    //       calculets={currentCalculets(calculets)}
    //       loading={loading}
    //     />
    //   </ResponsivePhoneLayout>
    //   <Pagination
    //     renderPerPage={KEY_PAGE}
    //     renderTotal={calculets.length}
    //     paginate={setCurrentPage}
    //     currentPage={currentPage}
    //   />
    // </Wrapper>
  );
}

export default Recommend;

// import styled from "styled-components";
// import BoxRecCalculator from "../atom-components/BoxRecCalculator.js";
// import Pagination from "./Pagination.js";
// import { useEffect, useState } from "react";
// import { FlexColumnLayout, ResponsivePhoneLayout } from "../Layout.js";

// /**
//  * 가운데 정렬 스타일 정의
//  */
// const Wrapper = styled(FlexColumnLayout)`
//   align-items: center;
// `;

// /**
//  *
//  * 추천 계산기 렌더하는 함수 (Recommend 내에서 처리하는 함수에요)
//  *
//  * @param {object, boolean}
//  * calculets : 추천 계산기 전체 정보
//  * loading : 렌더할 준비 되었는지 (정보 잘 가져왔는지)
//  *
//  */
// function RenderCalculet({ calculets, loading }) {
//   return (
//     <>
//       {loading && <div> loading... </div>}
//       {calculets.map((item) => (
//         <BoxRecCalculator
//           key={item.id}
//           name={item.title}
//           description={item.body}
//           profile="/img/ori.png"
//         />
//       ))}
//     </>
//   );
// }
// /**
//  *
//  * 원하는 네비게이션 바에 따라, 추천 계산기 페이지를 렌더하는 함수
//  * 한 번에 계산기들 fetch 후, KEY_MAX 만큼 자름 -> 추천 계산기 전체 수
//  * 한 페이지 당 KEY_PAGE 만큼 렌더하도록 함
//  *
//  */
// function Recommend() {
//   // 추천 계산기 최대 개수
//   const KEY_MAX = 15;
//   // 한 페이지 당 렌더할 계산기 개수
//   const KEY_PAGE = 3;

//   // 로딩 상태
//   const [loading, setLoading] = useState(false);
//   // 전체 추천 계산기 정보
//   const [calculets, setCalculets] = useState([]);
//   // 현재 페이지 네비
//   const [currentPage, setCurrentPage] = useState(1);

//   // 계산기 정보 15개 가져오고 로딩 품
//   // 우선, 예제 api 가져옴
//   useEffect(() => {
//     async function fetchData() {
//       setLoading(true);
//       const response = await (
//         await fetch("https://jsonplaceholder.typicode.com/posts")
//       ).json();
//       setCalculets(response.slice(0, KEY_MAX));
//       setLoading(false);
//     }
//     fetchData();
//   }, []);

//   // 예를 들어, 2 페이지 네비버튼을 누르면, 4~6 번째 계산기가 렌더
//   const indexOfLast = currentPage * KEY_PAGE;
//   const indexOfFirst = indexOfLast - KEY_PAGE;
//   function currentCalculets(tmp) {
//     return tmp.slice(indexOfFirst, indexOfLast);
//   }

//   // currentPage는 Pagination에서 onClick에 따라 네비됨
//   return (
//     <Wrapper gap="15px">
//       <ResponsivePhoneLayout columnGap="20px" rowGap="20px">
//         <RenderCalculet
//           calculets={currentCalculets(calculets)}
//           loading={loading}
//         />
//       </ResponsivePhoneLayout>
//       <Pagination
//         renderPerPage={KEY_PAGE}
//         renderTotal={calculets.length}
//         paginate={setCurrentPage}
//         currentPage={currentPage}
//       />
//     </Wrapper>
//   );
// }

// export default Recommend;
