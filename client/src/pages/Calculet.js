import styled from "styled-components";
import CalculetBlock from "../components/calculet-block/CalculetBlock";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../components/styles";
import { BtnBlue } from "../components/atom-components/ButtonTemplate";
import CalculetHeader from "../components/calculet-block/CalculetHeader";

import {
  updateCalculetCount,
  loadOftenUsedCalculet,
} from "../utils/OftenUsedCalculet";
import { Font } from "../components/atom-components/StyledText";
import FooterRecommend from "../components/global-component/FooterRecommend";
import URL from "../components/PageUrls";
import calculetInfo from "../user-actions/calculetInfo";

// 계산기 블록 배경
const Positioner = styled.div`
  background: ${styles.styleColor.white300};
`;
// 계산기 등록 버튼 배경
const PositionerBottom = styled.div`
  background: ${styles.styleColor.blue30};
  ${styles.styleEffect.opacity300};
`;
// 계산기 블록 감쌈
const BoxCalculet = styled.div`
  margin: 0 auto;
  ${styles.sizes.desktop};
  padding: ${styles.styleLayout.basic350};
`;
// 계산기 등록 버튼 감쌈
const BoxCalculetBottom = styled(BoxCalculet)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: ${styles.styleLayout.basic750};
  gap: ${styles.styleLayout.basic300};
`;

const WrapperCol = styled(BoxCalculet)`
  display: flex;
  flex-direction: column;
  gap: ${styles.styleLayout.basic700};
`;
function Calculet() {
  const navigate = useNavigate();
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
  const [statistics, setStatistics] = useState(null);

  // 계산기 정보 팝업창에 들어가는 내용
  const [info, setInfo] = useState(null);

  // 계산기 저작자 프로필 이미지
  const [contributorImgSrc, setContributorImgSrc] = useState(null);

  // (임시) 에러 처리 문구
  const [errorText, setErrorText] = useState(null);

  // 현재 페이지에 로딩할 계산기 id
  let { id } = useParams();

  // id 없다면 메인 페이지이므로 자주 쓰는 계산기 불러오기
  if (id === undefined) {
    id = loadOftenUsedCalculet();
  }

  /**
   * 백엔드에서 계산기 정보 불러오는 함수
   */
  function loadCalculetObj() {
    const request = calculetInfo(id);
    request.then((data) => {
      if (data.calculet) {
        setCalculetObj(data.calculet);
        setStatistics(data.statistics);
        setContributorImgSrc(data.calculet.contributorImgSrc);
        setInfo(data.info);
      } else {
        setErrorText(data);
      }
    });
  }

  /**
   * 계산기 객체 불러오기
   */
  useEffect(() => {
    loadCalculetObj();
    updateCalculetCount(id);
  }, [id]);

  return (
    <>
      <Positioner>
        <WrapperCol>
          {calculetObj !== null ? (
            <>
              <CalculetHeader
                title={calculetObj.title}
                contributor={calculetObj.contributor}
                contributorImgSrc={contributorImgSrc}
                statistics={statistics}
                info={info}
              />
              <CalculetBlock
                srcCode={calculetObj.srcCode}
                manual={calculetObj.manual}
                calculetId={id}
              />
            </>
          ) : (
            <div>{errorText}</div> // 로딩화면
          )}
        </WrapperCol>
      </Positioner>
      <PositionerBottom>
        <BoxCalculetBottom>
          <Font font="text200">자신만의 계산기를 만드세요!</Font>
          <BtnBlue
            text="계산기 등록"
            icon="Upload"
            onClick={() => navigate(URL.REGISTER)}
          />
        </BoxCalculetBottom>
      </PositionerBottom>
      <FooterRecommend />
    </>
  );
}

export default Calculet;
