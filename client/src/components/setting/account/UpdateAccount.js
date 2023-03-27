import { Grid } from "@mui/material";
import { useState } from "react";
import useSx from "../../../hooks/useSx";
import { ResponsiveButton } from "../../atom-components/Buttons";
import StyledTextField from "../../global-components/StyledTextField";
import { BIO_LIMIT, JOB_LIMIT, USERNAME_LIMIT } from "../../sign-up/constants";
import ProfileChange from "../../sign-up/ProfileChange";

/**
 * 계정 수정
 * @param {*} param0
 * @returns
 */
function UpdateAccount({ userInfo, handleUserInfoInput }) {
  const { isWindowMdDown, profileSize, badgeSize, badgeIconSize } = useSx();
  const { userName, profileImgSrc, job, bio, email, birthdate, sex } = userInfo;

  /** 프로필 사진 */
  const [profileImg, setProfileImg] = useState({
    url: profileImgSrc,
    file: null,
  });
  const [isOpenProfileImgPopUp, setIsOpenProfileImgPopUp] = useState(false);

  const textFieldList = [
    {
      id: "email",
      label: "이메일",
      value: email,
      helperText: "소식 받을 이메일을 작성해주세요.",
    },
    {
      id: "userName",
      label: "닉네임",
      value: userName,
      maxLength: USERNAME_LIMIT,
    },
    {
      id: "job",
      label: "직업",
      value: job,
      maxLength: JOB_LIMIT,
    },
    {
      id: "bio",
      label: "자기소개",
      value: bio,
      maxLength: BIO_LIMIT,
      maxRows: 6,
    },
    {
      id: "birthdate",
      label: "생년월일",
      value: birthdate,
      disabled: true,
    },
    {
      id: "sex",
      label: "성별",
      value: (sex === "F" && "여성") || (sex === "M" && "남성"),
      disabled: true,
    },
  ];

  return (
    <>
      <Grid container spacing={4}>
        <Grid
          item
          xs={!isWindowMdDown && 8}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            flexGrow: 1,
          }}
        >
          {isWindowMdDown && (
            <Grid sx={{ alignSelf: "center" }}>
              <ProfileChange
                profileImg={profileImg}
                setProfileImg={setProfileImg}
                isPopUpOpen={isOpenProfileImgPopUp}
                setIsPopUpOpen={setIsOpenProfileImgPopUp}
                profileSize={profileSize}
                EditSize={badgeSize}
                EditIconSize={badgeIconSize}
              />
            </Grid>
          )}
          {textFieldList.map((item) => {
            const {
              id,
              label,
              value,
              disabled,
              maxLength,
              maxRows,
              helperText,
            } = item;

            return (
              <StyledTextField
                key={id}
                id={id}
                label={label}
                value={value}
                handleOnChange={handleUserInfoInput}
                disabled={disabled}
                maxLength={maxLength}
                maxRows={maxRows}
                helperText={helperText}
              />
            );
          })}
        </Grid>
        {!isWindowMdDown && (
          <Grid item xs={4}>
            <ProfileChange
              profileImg={profileImg}
              setProfileImg={setProfileImg}
              isPopUpOpen={isOpenProfileImgPopUp}
              setIsPopUpOpen={setIsOpenProfileImgPopUp}
              profileSize={profileSize}
              EditSize={badgeSize}
              EditIconSize={badgeIconSize}
            />
          </Grid>
        )}
      </Grid>
      <ResponsiveButton size="large" variant="contained">
        변경 내용 저장
      </ResponsiveButton>
    </>
  );
}
export default UpdateAccount;
