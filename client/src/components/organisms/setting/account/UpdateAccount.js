import { Grid } from "@mui/material";
import { useState } from "react";
import useSx from "../../../../hooks/useSx";
import { ResponsiveButton } from "../../common/Buttons";
import { FlexBox } from "../../common/FlexBox";
import StyledTextField from "../../common/StyledTextField";
import { BIO_LIMIT, JOB_LIMIT, USERNAME_LIMIT } from "../../sign-up/constants";
import ProfileChange from "../../sign-up/ProfileChange";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import ChatIcon from "@mui/icons-material/Chat";
import CakeIcon from "@mui/icons-material/Cake";
import WcIcon from "@mui/icons-material/Wc";

/**
 * 계정 수정
 * @param {*} param0
 * @returns
 */
function UpdateAccount({
  userInfo,
  handleUserInfoInput,
  handleOnClickEditAccount,
  profileImg,
  setProfileImg,
}) {
  const { isWindowMdDown, profileSize, badgeSize, badgeIconSize } = useSx();
  const {
    userName,
    // profileImgSrc,
    job,
    bio,
    emailId,
    email,
    birthdate,
    sex,
  } = userInfo;

  const [isOpenProfileImgPopUp, setIsOpenProfileImgPopUp] = useState(false);

  const iconSx = { color: "action.active", mr: 1.2, mt: 2.0 };
  const textFieldList = [
    {
      id: "emailId",
      label: "이메일(ID)",
      value: emailId,
      disabled: true,
      icon: <EmailIcon sx={iconSx} />,
    },
    {
      id: "email",
      label: "이메일(소식용)",
      value: email,
      helperText: "소식 받을 이메일을 작성해주세요.",
      icon: <EmailIcon sx={iconSx} />,
    },
    {
      id: "userName",
      label: "닉네임",
      value: userName,
      maxLength: USERNAME_LIMIT,
      icon: <PersonIcon sx={iconSx} />,
    },
    {
      id: "job",
      label: "직업",
      value: job,
      maxLength: JOB_LIMIT,
      icon: <WorkIcon sx={iconSx} />,
    },
    {
      id: "bio",
      label: "자기소개",
      value: bio,
      maxLength: BIO_LIMIT,
      maxRows: 6,
      icon: <ChatIcon sx={iconSx} />,
    },
    {
      id: "birthdate",
      label: "생년월일",
      value: birthdate,
      disabled: true,
      icon: <CakeIcon sx={iconSx} />,
    },
    {
      id: "sex",
      label: "성별",
      value: (sex === "F" && "여성") || (sex === "M" && "남성"),
      disabled: true,
      icon: <WcIcon sx={iconSx} />,
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
              icon,
            } = item;

            return (
              <FlexBox key={id} sx={{ alignItems: "flex-start" }}>
                {icon}
                <StyledTextField
                  id={id}
                  label={label}
                  value={value}
                  handleOnChange={handleUserInfoInput}
                  disabled={disabled}
                  maxLength={maxLength}
                  maxRows={maxRows}
                  helperText={helperText}
                  bold={disabled}
                />
              </FlexBox>
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
      <ResponsiveButton
        size="large"
        variant="contained"
        onClick={handleOnClickEditAccount}
        disabled={!email || !userName || !job}
      >
        변경 내용 저장
      </ResponsiveButton>
    </>
  );
}
export default UpdateAccount;
