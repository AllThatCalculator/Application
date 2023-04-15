import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { FlexBox, FlexColumnBox } from "../global-components/FlexBox";
import WorkIcon from "@mui/icons-material/Work";
import useSx from "../../hooks/useSx";
import usePage from "../../hooks/usePage";

function ProfileHeader({ userInfo }) {
  const { userName, bio, job, profileImgSrc } = userInfo;

  const { settingAccountPage } = usePage();
  const { isWindowMdDown } = useSx();

  const imageSx = { xs: "8rem", sm: "10rem", md: "12.4rem" };

  /**
   * 닉네임 외의 부가적인 (bio, job) 소개 컴포넌트
   */
  function ProfileHeaderBottom() {
    return (
      <FlexColumnBox gap="1.6rem" sx={{ whiteSpace: "pre-wrap" }}>
        <Typography
          color="text.secondary"
          variant="body1"
          sx={{
            wordBreak: "break-word",
          }}
        >
          {bio}
        </Typography>
        <FlexBox
          color="text.disabled"
          gap="0.6rem"
          sx={{ alignItems: "center" }}
        >
          <WorkIcon fontSize="small" />
          <Typography variant="body2">직업</Typography>
          <Typography variant="body2" color="text.secondary">
            {job}
          </Typography>
        </FlexBox>
      </FlexColumnBox>
    );
  }

  /** 정보 수정 버튼 */
  function EditInfoButton() {
    return (
      <Button
        variant="contained"
        sx={{ maxWidth: isWindowMdDown && "18rem" }}
        onClick={settingAccountPage}
      >
        정보 수정
      </Button>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{ background: (theme) => theme.palette.atcLinearBlue[100] }}
    >
      <Grid
        container
        sx={{
          alignItems: "center",
          p: { xs: "1.8rem", sm: "2.2rem", md: "2.4rem" },
          gap: { xs: "2.4rem", sm: "2.8rem", md: "3.2rem" },
        }}
      >
        <Grid item>
          <Avatar
            component={Paper}
            elevation={2}
            src={profileImgSrc}
            sx={{ width: imageSx, height: imageSx }}
          />
        </Grid>
        <Grid item xs>
          <FlexColumnBox gap="0.4rem">
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {userName}
            </Typography>
            {isWindowMdDown && <EditInfoButton />}
            {!isWindowMdDown && <ProfileHeaderBottom />}
          </FlexColumnBox>
        </Grid>
        {!isWindowMdDown && (
          <Grid item sx={{ alignSelf: "flex-start" }}>
            <EditInfoButton />
          </Grid>
        )}
        {isWindowMdDown && (
          <Grid container>
            <ProfileHeaderBottom />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
export default ProfileHeader;
