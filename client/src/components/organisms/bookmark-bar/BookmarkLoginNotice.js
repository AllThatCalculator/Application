import usePage from "../../../hooks/usePage";
import { Button, Stack, Typography } from "@mui/material";
import useSx from "../../../hooks/useSx";
import { PageWhiteScreenBox } from "../common/PageScreenBox";
import { FlexColumnBox } from "../common/FlexBox";

// bookmark bar login notice
function BookmarkLoginNotice({ onClickClose }) {
  const { loginPage } = usePage();
  const { isWindowMdDown } = useSx();

  function handleClickButton() {
    loginPage();
    onClickClose();
  }

  function LoginNotice() {
    return (
      <Stack
        sx={{
          alignItems: "center",
          alignContent: "center",
          gap: "1.6rem",
          m: !isWindowMdDown && "6.4rem 1.6rem",
        }}
      >
        <Button variant="contained" onClick={handleClickButton}>
          로그인
        </Button>
        <Typography>로그인하고 즐겨찾는 계산기를 북마크하세요.</Typography>
      </Stack>
    );
  }

  return (
    <>
      {isWindowMdDown && (
        <PageWhiteScreenBox
          container
          sx={{
            justifyContent: "center",
            paddingTop: "8.4rem",
          }}
        >
          <FlexColumnBox
            gap="1.6rem"
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoginNotice />
          </FlexColumnBox>
        </PageWhiteScreenBox>
      )}
      {!isWindowMdDown && <LoginNotice />}
    </>
  );
}
export default BookmarkLoginNotice;
