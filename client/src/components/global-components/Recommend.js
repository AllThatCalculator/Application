import BoxRecCalculator from "../atom-components/BoxRecCalculator.js";
import { useEffect, useState } from "react";
import { Grid, Pagination } from "@mui/material";
import useSx from "../../hooks/useSx.js";
import getRecommendation from "../../user-actions/calculets/getRecommendation.js";

/**
 *
 * 원하는 네비게이션 바에 따라, 추천 계산기 페이지를 렌더하는 함수
 * 한 번에 계산기들 fetch 후, KEY_MAX 만큼 자름 -> 추천 계산기 전체 수
 * 한 페이지 당 KEY_PAGE 만큼 렌더하도록 함
 *
 */
function Recommend() {
  const { isWindowMdDown, isWindowSmDown } = useSx();
  // 한 페이지 당 렌더할 계산기 개수 default : 4
  const [keyCurPage, setkeyCurPage] = useState(4);
  // ~sm: 3, md: 4, lg~: 3
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
  useEffect(() => {
    setLoading(true);
    const request = getRecommendation();
    request.then((data) => {
      setCalculets(data);
      setLoading(false);
    });
    // .catch((error) => console.log(error));
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
    setCurrentPage(value);
  };

  return (
    <>
      {loading ? (
        <div> loading... </div>
      ) : (
        <>
          <Grid
            container
            spacing={3}
            columns={{ xs: 1, sm: 2, md: 3 }}
            sx={{ salignContent: "stretch" }}
          >
            {currentCalculets(calculets).map((item, index) => (
              <Grid item xs={1} sm={1} md={1} key={item.id}>
                <BoxRecCalculator
                  name={item.title}
                  nickName={item.contributor.userName}
                  description={item.description}
                  profile={item.contributor.profileImgSrc}
                  calculetId={item.id}
                />
              </Grid>
            ))}
          </Grid>
          <Grid container sx={{ w: 1, justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(calculets.length / keyCurPage)}
              page={page}
              onChange={handlePageChange}
              color="secondary"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "white",
                },
              }}
            />
          </Grid>
        </>
      )}
    </>
  );
}

export default Recommend;
