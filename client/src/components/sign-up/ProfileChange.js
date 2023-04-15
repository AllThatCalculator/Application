import {
  Avatar,
  Badge,
  Box,
  ButtonBase,
  ClickAwayListener,
  Paper,
} from "@mui/material";
import { useRef } from "react";
import useSx from "../../hooks/useSx";
import EditIcon from "@mui/icons-material/Edit";
import PaperPopup from "../global-components/PaperPopup";
import DialogPopup from "../global-components/DialogPopup";

/**
 * 프로필 이미지 컴포넌트
 * 사진 변경 함수 포함
 *
 * @param {string, funtion}
 * profileImg : 이미지 state { url: "", file: null }
 * setProfileImg : 이미지 state 변경하는 함수
 * isPopUpOpen : 이미지 변경하는 popup state
 * setIsPopUpOpen : 이미지 변경하는 popup state 변경하는 함수
 * profileSize : 프로필 사진 크기
 * EditSize : 프로필 뱃지 버튼 크기
 * EditIconSize : 프로필 뱃지 아이콘 크기
 */
function ProfileChange({
  profileImg,
  setProfileImg,
  isPopUpOpen,
  setIsPopUpOpen,
  profileSize = { xs: "6.4rem", sm: "7.2rem", md: "8.0rem" },
  EditSize = { xs: "2.2rem", sm: "2.4rem", md: "2.8rem" },
  EditIconSize = {
    fontSize: { xs: "1.6rem", sm: "1.8rem", md: "2.2rem" },
  },
}) {
  const { isWindowMdDown } = useSx();

  function handleOnIsPopUpOpen() {
    setIsPopUpOpen(true);
  }
  function handleOffIsPopUpOpen() {
    setIsPopUpOpen(false);
  }

  // 이미지 파일 -> url 생성
  function createImageUrl(fileBlob) {
    return URL.createObjectURL(fileBlob);
  }

  /**
   * Ref를 사용해서 input태그 참조
   * -> 사진 번경 버튼 누르면, 사진 선택 가능
   */
  const imageInput = useRef(null);
  function changeImageSrc() {
    imageInput.current.click();
  }
  /**
   * 이미지 제거
   * -> 기본이미지로 변경
   */
  function changeDefaultProfileImage() {
    handleOffIsPopUpOpen();
    setProfileImg({ url: "", file: null });
  }
  /** 이미지 추가 버튼 눌렀을 때 ref에서 일어나는 일 */
  function onAddImageChange(event) {
    event.preventDefault();
    changeDefaultProfileImage(); // init

    // 파일이 있는 경우
    if (event.target.files.length !== 0) {
      const file = event.target.files[0];
      setProfileImg({ url: createImageUrl(file), file: file });
    }
  }

  /** 프로필 사진 선택 목록 */
  const listData = [
    {
      name: "사진 선택",
      onClickFuntion: changeImageSrc,
    },
    {
      name: "기본 이미지로 변경",
      onClickFuntion: changeDefaultProfileImage,
    },
  ];

  /** sm down에서의 popup 컴포넌트 */
  const SmPopup = () => {
    return (
      <DialogPopup
        listData={listData}
        title="프로필 사진"
        onClose={handleOffIsPopUpOpen}
        open={isPopUpOpen}
      />
    );
  };
  /** md up에서의 popup 컴포넌트 */
  const MdPopup = () => {
    return <PaperPopup listData={listData} />;
  };

  return (
    <>
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={handleOffIsPopUpOpen}
      >
        <Box>
          <ButtonBase onClick={handleOnIsPopUpOpen} disableRipple>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              badgeContent={
                <Avatar
                  sx={{
                    bgcolor: "info.main",
                    width: EditSize,
                    height: EditSize,
                  }}
                >
                  <EditIcon sx={{ ...EditIconSize }} />
                </Avatar>
              }
            >
              <Avatar
                component={Paper}
                elevation={2}
                src={profileImg.url || ""} // 링크
                sx={{ width: profileSize, height: profileSize }}
              />
            </Badge>
          </ButtonBase>
          {isWindowMdDown ? <SmPopup /> : isPopUpOpen ? <MdPopup /> : null}
        </Box>
      </ClickAwayListener>
      <input
        type="file" // input 타입을 file로 지정하면 파일을 가져올 수 있는 형태의 input이 생성됨.
        accept="image/*"
        style={{ display: "none" }}
        ref={imageInput}
        onChange={onAddImageChange}
      />
    </>
  );
}
export default ProfileChange;
