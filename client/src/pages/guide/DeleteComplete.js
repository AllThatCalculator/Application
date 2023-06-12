import { Button, Typography } from "@mui/material";
import StyledImg from "../../components/atoms/StyledImg";
import { FlexColumnBox } from "../../components/organisms/common/FlexBox";
import { PageWhiteScreenBox } from "../../components/organisms/common/PageScreenBox";
import usePage from "../../hooks/usePage";

/**
 * 회원탈퇴가 완료되었습니다. 페이지
 * @returns
 */
function DeleteComplete() {
  const { calculetPage } = usePage();

  return (
    <>
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
          <StyledImg src={"/ATCLogoBlueImgText.png"} width="214px" />
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            회원탈퇴가 완료되었습니다.
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
            {`All That Caculator를 이용해주시고 사랑해주셔서 감사합니다.`}
          </Typography>
          <Button variant="contained" onClick={calculetPage}>
            확인
          </Button>
        </FlexColumnBox>
      </PageWhiteScreenBox>
    </>
  );
}
export default DeleteComplete;
