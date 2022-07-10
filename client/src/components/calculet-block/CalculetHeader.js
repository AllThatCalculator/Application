import { useState } from "react";
import styled from "styled-components";
import { BoxIcon } from "../atom-components/BoxIcon";
import { BtnSmallIcon, BtnStatisticsIcon } from "../atom-components/ButtonIcon";
import { Modal } from "../global-component/Modal";

import ModalCalculetInfo from "../global-component/ModalCalculetInfo";
import styles from "../styles";

const CalculetName = styled.div`
  padding: 0;
  color: ${styles.styleColor.blue900};
  ${styles.sytleText.text300};
`;

const WrapperBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${styles.sytleText.text50}
`;

const WrapperLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const WrapperGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: flex-end;
`;

const StyledHr = styled.div`
  width: ${styles.sizes.desktop};
  height: 1px;
  background-color: ${styles.styleColor.blue200};
`;

function CalculetHeader({ title, contributor, statistics }) {
  // 좋아요 관련 정보
  // {int} number: 해당 계산기의 좋아요 수
  // {boolean} liked: 현재 유저가 좋아요를 눌렀는지 여부
  const [likeObj, setLikeObj] = useState({
    number: statistics.likeCnt,
    liked: statistics.liked,
  });
  // 북마크 관련 정보
  // {int} number: 해당 계산기의 북마크 수
  // {boolean} bookmarked: 현재 유저가 북마크로 설정했는지 여부
  const [bookmarkObj, setBookmarkObj] = useState({
    number: statistics.bookmarkCnt,
    bookmarked: statistics.bookmarked,
  });

  /**
   * 좋아요 버튼 이벤트 함수
   * - 좋아요 수 변경, 아이콘 색 채움 여부 변경
   * - 추후 DB 갱신을 위한 백엔드와의 통신 필요
   */
  async function toggleLike() {
    if (likeObj.liked) {
      setLikeObj((prev) => ({ number: prev.number - 1, liked: !prev.liked }));
    } else {
      setLikeObj((prev) => ({ number: prev.number + 1, liked: !prev.liked }));
    }
  }
  /**
   * 북마크 버튼 이벤트 함수
   * - 북마크 수 변경, 아이콘 색 채움 여부 변경
   * - 추후 DB 갱신을 위한 백엔드와의 통신 필요
   */
  async function toggleBookmark() {
    if (bookmarkObj.bookmarked) {
      setBookmarkObj((prev) => ({
        number: prev.number - 1,
        bookmarked: !prev.bookmarked,
      }));
    } else {
      setBookmarkObj((prev) => ({
        number: prev.number + 1,
        bookmarked: !prev.bookmarked,
      }));
    }
  }

  // {bool} modalOpen 계산기 정보 팝업창 불러오기 상태
  const [modalOpen, setModalOpen] = useState(false);

  /**
   * i 버튼 누르면 계산기 정보 팝업창 열림
   * -> 팝업창 X 누르면 팝업창 닫힘
   */
  const onModalOpen = () => {
    setModalOpen(true);
  };
  const onModalClose = () => {
    setModalOpen(false);
  };
  // 계산기 정보 팝업창에 들어갈 내용
  const contents = {
    profile_img: "/img/ori.png",
    contributor_id: "bsa0322",
    calculation_cnt: "1,000,000",
    user_cnt: "12,345",
    title: "사칙연산 계산기",
    category_main: "수학",
    category_sub: "계산",
    birthday: "2022.06.24",
    update_log: [
      ["2022.06.26", ["버그수정", "내용 수정"]],
      ["2022.06.28", []],
      ["2022.06.29", ["오류 수정", "내용 수정", "asdfasdf"]],
      ["2022.06.30", ["오류 수정", "내용 수정", "asdfasdf"]],
      ["2022.07.09", ["오류 수정", "내용 수정", "asdfasdf"]],
      ["2022.10.05", ["오류 수정", "내용 수정", "asdfasdf"]],
    ],
  };

  return (
    <>
      {modalOpen && (
        <Modal
          onClick={onModalClose}
          contents={<ModalCalculetInfo info={contents} />}
        />
      )}
      <WrapperBox>
        <WrapperLine>
          <WrapperGroup>
            <CalculetName>{title}</CalculetName>
            <BtnSmallIcon
              text="info"
              icon="InfoCircle"
              color="blue"
              onClick={onModalOpen}
            />
          </WrapperGroup>
        </WrapperLine>
        <WrapperLine>
          <WrapperGroup>
            <BoxIcon
              text={contributor}
              icon="PeopleCircle"
              profile="/img/ori.png"
            />
            <BoxIcon text="view" icon="EyeFill" number={statistics.viewCnt} />
          </WrapperGroup>

          <WrapperGroup>
            <BtnStatisticsIcon
              text="좋아요"
              icon="Heart"
              number={likeObj.number}
              isClicked={likeObj.liked}
              onClick={toggleLike}
            />
            <BtnStatisticsIcon
              text="북마크"
              icon="BookmarkStar"
              number={bookmarkObj.number}
              isClicked={bookmarkObj.bookmarked}
              onClick={toggleBookmark}
            />
            <BtnStatisticsIcon
              text="신고"
              icon="Flag"
              number={statistics.reportCnt}
              isClicked={false}
              onClick={() => console.log("move to report page")}
            />
          </WrapperGroup>
        </WrapperLine>
      </WrapperBox>
      <StyledHr />
    </>
  );
}

export default CalculetHeader;
