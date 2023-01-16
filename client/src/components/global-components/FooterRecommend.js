import Recommend from "./Recommend";
import PageScreenBox from "./PageScreenBox";
import { Box, ButtonBase, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import useSx from "../../hooks/useSx";
import usePage from "../../hooks/usePage";

function FooterRecommend() {
  const { atcTextShadow, atcFilterShadow } = useSx();
  const { calculetListPage } = usePage();

  return (
    <PageScreenBox sx={{ p: "3.2rem 0rem", gap: "2rem" }}>
      <Box sx={{ display: "flex", width: "100%" }}>
        <ButtonBase onClick={calculetListPage}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyItems: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                color="white"
                sx={{
                  ...atcTextShadow[100],
                }}
              >
                다른 계산기들도 있어요 🚀
              </Typography>
              <KeyboardArrowRightIcon
                fontSize="large"
                sx={{
                  color: "white",
                  ...atcFilterShadow[100],
                }}
              />
            </Box>
            <Typography variant="body2" color="grey.300" align="left">
              다양한 계산기를 만나보세요.
            </Typography>
          </Box>
        </ButtonBase>
      </Box>
      <Recommend />
    </PageScreenBox>
  );
}
export default FooterRecommend;
