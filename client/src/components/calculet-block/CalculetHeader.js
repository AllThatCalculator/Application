import { useState } from "react";
import ModalCalculetInfo from "../calculet-block/ModalCalculetInfo";
import { useEffect } from "react";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { FlexBox } from "../global-components/FlexBox";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import TurnedInOutlinedIcon from "@mui/icons-material/TurnedInOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { CountButton } from "../atom-components/Buttons";
import useSx from "../../hooks/useSx";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import PopupList from "../global-components/PopupList";
import Title from "../global-components/Title";
import putCalculetLike from "../../user-actions/calculets/putCalculetLike";
import putCalculetBookmark from "../../user-actions/bookmark/putCalculetBookmark";
import { useSelector } from "react-redux";
import usePage from "../../hooks/usePage";
import useSnackbar from "../../hooks/useSnackbar";
import useGetCalculetBookmark from "../../hooks/useGetCalculetBookmark";

function CalculetHeader({ calculetObj, updateLog, isPreview = false }) {
  const { boxSx } = useSx();
  const { loginPage, profileUserIdPage } = usePage();
  const { openSnackbar } = useSnackbar();
  const { getCalculetBookmark } = useGetCalculetBookmark();

  // calculet object
  const { statistics, userCalculet, contributor, title, isMe } = calculetObj;

  // user id token
  const { idToken } = useSelector((state) => ({
    idToken: state.userInfo.idToken,
  }));

  /**
   * 좋아요 관련 정보
   * {int} number: 해당 계산기의 좋아요 수
   * {boolean} liked: 현재 유저가 좋아요를 눌렀는지 여부
   */
  const [likeObj, setLikeObj] = useState({
    number: statistics.like,
    liked: userCalculet.liked,
  });
  /**
   * 북마크 관련 정보
   * {int} number: 해당 계산기의 북마크 수
   * {boolean} bookmarked: 현재 유저가 북마크로 설정했는지 여부
   */
  const [bookmarkObj, setBookmarkObj] = useState({
    number: statistics.bookmark,
    bookmarked: userCalculet.bookmarked,
  });

  /**
   * 확률 정보 바뀌면 좋아요 수와 북마크 수 다시 변경되도록
   */
  useEffect(() => {
    setLikeObj({ number: statistics.like, liked: userCalculet.liked });
    setBookmarkObj({
      number: statistics.bookmark,
      bookmarked: userCalculet.bookmarked,
    });
  }, [statistics, userCalculet.bookmarked, userCalculet.liked]);

  /**
   * 좋아요 버튼 이벤트 함수
   * - 좋아요 수 변경, 아이콘 색 채움 여부 변경
   * - 추후 DB 갱신을 위한 백엔드와의 통신 필요
   */
  async function toggleLike() {
    // 미리보기면 return
    if (isPreview) {
      return;
    }

    // idToken 없으면, 로그인하러 가기
    if (!idToken) {
      loginPage();
      return;
    }

    await putCalculetLike(likeObj.liked, calculetObj.id, idToken)
      .then((result) => {
        setLikeObj((prev) => ({
          number: result.likeCnt,
          liked: !prev.liked,
        }));
      })
      .catch((result) => {
        setLikeObj((prev) => ({
          number: result.likeCnt,
          liked: prev.liked,
        }));
      });
  }

  /**
   * 북마크 버튼 이벤트 함수
   * - 북마크 수 변경, 아이콘 색 채움 여부 변경
   * - 추후 DB 갱신을 위한 백엔드와의 통신 필요
   */
  async function toggleBookmark() {
    // 미리보기면 return
    if (isPreview) {
      return;
    }

    // idToken 없으면, 로그인하러 가기
    if (!idToken) {
      loginPage();
      return;
    }
    await putCalculetBookmark(bookmarkObj.bookmarked, calculetObj.id, idToken)
      .then((result) => {
        setBookmarkObj((prev) => ({
          number: result.bookmarkCnt,
          bookmarked: !prev.bookmarked,
        }));
        getCalculetBookmark(idToken);
        openSnackbar(
          "basic",
          `북마크가 ${bookmarkObj.bookmarked ? "삭제" : "추가"}되었습니다.`,
          false,
          "bottom",
          "left",
          1600 // 지속시간
        );
      })
      .catch((result) => {
        setBookmarkObj((prev) => ({
          number: result.bookmarkCnt,
          bookmarked: prev.bookmarked,
        }));
        getCalculetBookmark(idToken);
      });
  }
  /**
   * {bool} modalOpen 계산기 정보 팝업창 불러오기 상태
   */
  const [modalOpen, setModalOpen] = useState(false);

  /**
   * i 버튼 누르면 계산기 정보 팝업창 열림
   * -> 팝업창 X 누르면 팝업창 닫힘
   */
  function onModalOpen() {
    setModalOpen(true);
  }
  function onModalClose() {
    setModalOpen(false);
  }

  ///////////////////////////////////////////////////////////////////////////////
  // ============프로필, 뷰 컴포넌트=================
  function HeaderInfoBox({ icon, text, number, isProfile, action }) {
    // 내용 컴포넌트
    function Typo({ content }) {
      return (
        <Typography
          color="primary"
          variant="body2"
          sx={{ minWidth: "fit-content" }}
        >
          {content}
        </Typography>
      );
    }
    return (
      <Tooltip title={isProfile && "프로필 보러가기"}>
        <FlexBox
          sx={{ cursor: isProfile && "pointer", ...boxSx }}
          onClick={action}
        >
          {/* 프로필 사진 없으면 (icon 빈 문자) 그냥 기본 프로필 이미지 보임 */}
          {isProfile ? (
            <Avatar sx={{ width: 28, height: 28 }} src={icon} />
          ) : (
            icon
          )}
          <Typo content={text} />
          {!isProfile && <Typo content={number} />}
        </FlexBox>
      </Tooltip>
    );
  }
  // 프로필, 계산기 본 사람 수
  const infoList = [
    {
      icon: contributor.profileImgSrc,
      text: contributor.userName,
      isProfile: true,
      action: () => {
        profileUserIdPage(contributor.id);
      }, // 계산기 저작자 프로필 들어가기
    },
    {
      icon: <VisibilityIcon color="primary" />,
      text: "조회수",
      isProfile: false,
      number: statistics.view,
    },
  ];
  // =================계산기 이름, 정보=================
  function CalculetTitle() {
    return (
      <Grid container sx={{ alignItems: "center" }}>
        <Title content={title} />
        <IconButton color="primary" onClick={onModalOpen}>
          <InfoOutlinedIcon />
        </IconButton>
        {
          // 내가 만든 계산기는 계산기 편집 버튼 보임
          isMe && (
            <Button
              variant="contained"
              disableElevation
              sx={{
                bgcolor: "#E2E5F3",
                color: "primary.main",
                "&:hover": { bgcolor: "white" },
                "&.MuiButtonBase-root": {
                  maxHeight: "3.2rem",
                },
              }}
              onClick={() => {}}
            >
              계산기 편집
            </Button>
          )
        }
      </Grid>
    );
  }

  const StatisticsList = [
    {
      text: "좋아요",
      icon: <FavoriteBorderOutlinedIcon />,
      clickedIcon: <FavoriteOutlinedIcon />,
      number: likeObj.number,
      isClicked: likeObj.liked,
      onClick: toggleLike,
      tooltip: "좋아요",
    },
    {
      text: "북마크",
      icon: <TurnedInNotOutlinedIcon />,
      clickedIcon: <TurnedInOutlinedIcon />,
      number: bookmarkObj.number,
      isClicked: bookmarkObj.bookmarked,
      onClick: toggleBookmark,
      tooltip: "북마크",
    },
    {
      text: "신고",
      icon: <FlagOutlinedIcon />,
      clickedIcon: <></>,
      number: statistics.report,
      isClicked: false,
      onClick: () => null,
    },
  ];

  function handleUrlShare(calculetId) {
    const currUrl = `${window.location.origin}/${calculetId}`; // 현재 url
    navigator.clipboard.writeText(currUrl).then(() => {
      openSnackbar(
        "basic",
        "링크가 복사되었습니다.",
        false,
        "bottom",
        "left",
        1600 // 지속시간
      );
    });
  }

  // 더보기
  const moreList = [
    [
      {
        name: "링크 공유",
        icon: <ShareIcon />,
        onClickFuntion: () => handleUrlShare(calculetObj.id),
      },
    ],
  ];
  const MorePopupLists = [
    {
      isMd: true,
      popupIcon: <MoreVertIcon />,
      popupTitle: "더보기",
      popupListData: moreList,
      popupContent: null,
    },
  ];

  return (
    <>
      {!isPreview && modalOpen && (
        <ModalCalculetInfo
          contributor={contributor}
          statistics={statistics}
          title={title}
          categoryMainId={calculetObj.categoryMainId}
          categorySubId={calculetObj.categorySubId}
          createdAt={calculetObj.createdAt}
          updateLog={updateLog}
          onClick={onModalClose}
        />
      )}
      {/* 계산기 타이틀, 계산기 정보 */}
      <CalculetTitle />
      <Grid container sx={{ alignItems: "center" }}>
        {/* 사용자, 뷰 */}
        <Grid item xs>
          <FlexBox gap="1.2rem">
            {infoList.map((data, index) => {
              const { icon, text, number, isProfile, action } = data;
              return (
                <HeaderInfoBox
                  key={index}
                  icon={icon}
                  text={text}
                  number={number}
                  isProfile={isProfile}
                  action={action}
                />
              );
            })}
          </FlexBox>
        </Grid>
        {/* 좋아요, 북마크, 신고 */}
        <Grid item>
          <FlexBox>
            {StatisticsList.map((data, index) => {
              const {
                text,
                icon,
                clickedIcon,
                number,
                isClicked,
                onClick,
                tooltip,
              } = data;

              return (
                <CountButton
                  key={index}
                  text={text}
                  icon={icon}
                  clickedIcon={clickedIcon}
                  number={number}
                  isClicked={isClicked}
                  onClick={onClick}
                  tooltip={tooltip}
                />
              );
            })}
            {!isPreview &&
              MorePopupLists.map((popupData, index) => (
                <FlexBox key={index} sx={{ ml: "0.8rem" }}>
                  <PopupList
                    popupIcon={popupData.popupIcon}
                    popupTitle={popupData.popupTitle}
                    popupListData={popupData.popupListData}
                    popupContent={popupData.popupContent}
                  />
                </FlexBox>
              ))}
          </FlexBox>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
}

export default CalculetHeader;
