import { Stack, Typography } from "@mui/material";
import useSx from "../../../hooks/useSx";
import { PageWhiteScreenBox } from "../common/PageScreenBox";
import { FlexColumnBox } from "../common/FlexBox";

// bookmark bar add notice
function BookmarkAddNotice() {
  const { isWindowMdDown } = useSx();

  function AddNotice() {
    return (
      <Stack
        sx={{
          alignItems: "center",
          alignContent: "center",
          gap: "1.6rem",
          m: !isWindowMdDown && "6.4rem 1.6rem",
        }}
      >
        <Typography color="text.disabled">
          즐겨찾는 계산기를 북마크하세요!
        </Typography>
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
            <AddNotice />
          </FlexColumnBox>
        </PageWhiteScreenBox>
      )}
      {!isWindowMdDown && <AddNotice />}
    </>
  );
}
export default BookmarkAddNotice;
