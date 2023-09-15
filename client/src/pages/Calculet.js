import CalculetBlock from "../components/organisms/calculet-block/CalculetBlock";
import { useCallback, useEffect, useState } from "react";
import CalculetHeader from "../components/organisms/calculet-block/CalculetHeader";
import {
  updateCalculetCount,
  loadOftenUsedCalculet,
} from "../components/organisms/calculet-block/oftenUsedCalculet";
import FooterRecommend from "../components/organisms/common/FooterRecommend";
import calculetInfo from "../user-actions/calculets/calculetInfo";
import { Grid } from "@mui/material";
import { PageScreenBox } from "../components/organisms/common/PageScreenBox";
import LoadingPage from "../components/organisms/common/LoadingPage";
import UploadIcon from "@mui/icons-material/Upload";
import usePage from "../hooks/usePage";
import getCalculetUpdateLog from "../user-actions/calculets/getCalculetUpdateLog";
import getUserIdToken from "../utils/getUserIdToken";
import PageScreenBottom from "../components/organisms/common/PageScreenBottom";
import useGetUrlParam from "../hooks/useGetUrlParam";

async function handleGetCalculetInfo(id, setCalculetObj) {
  let calculetInfoRequest = null;
  const userId = await getUserIdToken();

  // 로그인한 유저 - 계산기 정보 요청
  if (userId) {
    calculetInfoRequest = await calculetInfo(id, userId);
  }
  // 로그인 안 한 유저 - 계산기 정보 요청
  else {
    calculetInfoRequest = await calculetInfo(id);
  }

  if (calculetInfoRequest !== null) {
    // for test
    // calculetInfoRequest.type = 1;
    switch (calculetInfoRequest.type) {
      case 0:
        break;
      case 1: // 데이터 가공
        // 테스트용 임시로직
        // const srcCode = {
        //   components: {
        //     a: {
        //       componentId: "a",
        //       componentType: "textField",
        //       copyButton: false,
        //       disabled: false,
        //       id: "a",
        //       isInput: true,
        //       isOutput: false,
        //       label: "피연산자1",
        //       placeholder: "",
        //       required: false,
        //       type: "text",
        //       defaultValue: "10",
        //     },
        //     b: {
        //       componentId: "b",
        //       componentType: "textField",
        //       copyButton: false,
        //       disabled: false,
        //       id: "b",
        //       isInput: true,
        //       isOutput: false,
        //       label: "피연산자2",
        //       placeholder: "",
        //       required: false,
        //       type: "text",
        //       defaultValue: "5",
        //     },
        //     c: {
        //       componentId: "c",
        //       componentType: "textField",
        //       copyButton: true,
        //       disabled: true,
        //       id: "c",
        //       isInput: false,
        //       isOutput: true,
        //       label: "계산결과",
        //       placeholder: "",
        //       required: false,
        //       type: "text",
        //     },
        //     d: {
        //       componentId: "d",
        //       componentType: "calculetButton",
        //     },
        //     // userFunction: (a, b) => a + b,
        //   },
        //   userFunction: `function main(x) {
        //     console.warn(x);
        //     return {c:parseInt(x.a)+parseInt(x.b)};
        //   }`,
        // };
        // calculetInfoRequest.srcCode = srcCode;
        calculetInfoRequest.srcCode = JSON.parse(calculetInfoRequest.srcCode);
        break;
      default:
    }

    setCalculetObj(calculetInfoRequest);
  }
}
async function handleGetCalculetUpdateLog(id, setUpdateLog) {
  // 계산기 업데이트 로그 내역 요청
  const updateLogRequest = await getCalculetUpdateLog(id);
  if (updateLogRequest !== null) {
    setUpdateLog(updateLogRequest);
  }
}

function Calculet() {
  const { registerPage } = usePage();

  // 계산기 객체
  // {object} calculetObj 계산기 객체
  //         {string} title: "사칙연산 계산기", - 계산기 이름
  //         {integer} id: 1,                 - 계산기 id
  //         {string} srcCode: null,          - 계산기 소스코드
  //         {string} contributor: "bsa0322", - 계산기 저작자
  //         {string} manual: null,           - 계산기 설명 마크다운
  //         {string} description: "사칙연산 계산기입니다.", - 계산기 한줄 설명
  const [calculetObj, setCalculetObj] = useState(null);
  // {object}  statistics: {
  //   {integer} bookmarkCnt: 10,  - 북마크 수
  //   {boolean} bookmarked: false - 유저가 북마크를 해두었는지 여부
  //   {integer} likeCnt: 5,       - 좋아요 수
  //   {boolean} liked: false      - 유저가 좋아요를 눌러 두었는지 여부
  //   {integer} reportCnt: 1,     - 신고 수
  //   {integer} viewCnt: 100,     - 조회수
  //   {integer} calculationCnt: 10, - 연산수
  //   {integer} userCnt: 10,      - 사용자 수
  // },

  // 계산기 정보 팝업창에 들어가는 로그 내용
  const [updateLog, setUpdateLog] = useState(null);

  // 현재 페이지에 로딩할 계산기 id
  let { id } = useGetUrlParam();

  // id 없다면 메인 페이지이므로 자주 쓰는 계산기 불러오기
  if (id === undefined) {
    id = loadOftenUsedCalculet();
  }

  const [isLoading, setIsLoading] = useState(true);
  /**
   * 백엔드에서 계산기 정보 불러오는 함수
   * useEffect 오류 해결 위해 useCallback
   */
  const loadCalculetObj = useCallback(() => {
    setIsLoading(true);
    handleGetCalculetUpdateLog(id, setUpdateLog);
    handleGetCalculetInfo(id, setCalculetObj);
  }, [id]);

  const onHandlerLoadClaculetObj = useCallback(() => {
    loadCalculetObj();
    updateCalculetCount(id);
  }, [loadCalculetObj, id]);
  /**
   * 계산기 객체 불러오기
   */
  useEffect(onHandlerLoadClaculetObj, [onHandlerLoadClaculetObj]);

  // 로딩화면
  useEffect(() => {
    if (!!calculetObj) setIsLoading(false);
  }, [calculetObj]);
  // console.log(calculetObj);
  return (
    <>
      {isLoading && <LoadingPage />}
      {!isLoading && (
        <>
          <Grid container sx={{ backgroundColor: "white" }}>
            <PageScreenBox
              sx={{
                gap: { xs: "0.4rem", sm: "0.8rem", md: "1.2rem" },
              }}
            >
              <CalculetHeader
                // 계산기 블록 정보 & 팝업창 정보
                calculetObj={calculetObj}
                // 업데이트 로그
                updateLog={updateLog}
              />
              <CalculetBlock
                srcCode={calculetObj.srcCode}
                manual={calculetObj.manual}
                calculetId={id}
                type={calculetObj.type}
              />
            </PageScreenBox>
          </Grid>
          <PageScreenBottom
            helpText="자신만의 계산기를 만드세요!"
            buttonText="계산기 등록"
            handleButton={registerPage}
            buttonIcon={<UploadIcon />}
          />
          <FooterRecommend />
        </>
      )}
    </>
  );
}

export default Calculet;
