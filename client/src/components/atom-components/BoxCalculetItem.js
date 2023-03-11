import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Grid,
  Typography,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import { FlexBox, FlexColumnBox } from "../global-components/FlexBox";
import useSx from "../../hooks/useSx";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";

// 계산기 목록 - 각 계산기 카드
function BoxCalculetItem({ onClick, calculet }) {
  const { ellipsis } = useSx();

  const { calculetCategory } = useSelector((state) => ({
    calculetCategory: state.calculetCategory.category, // main에 바로 접근해서 변수에 저장
  }));

  const { categoryMainId, categorySubId } = calculet;
  const categoryMainName = calculetCategory[categoryMainId].name;
  const categorySubName = calculetCategory[categoryMainId][categorySubId];

  // 가운데 style 적용을 위한 sx
  const centerSx = { alignItems: "center", gap: "0.8rem" };

  // hover시, open을 위한 open state
  const [open, setOpen] = useState(false);

  return (
    <Accordion
      sx={{
        backgroundColor: open ? "atcBlue.100" : "atcBlue.50",
      }}
      expanded={open}
      elevation={open ? 2 : 0}
      onClick={onClick}
    >
      <AccordionSummary
        onMouseOver={() => setOpen(true)}
        onMouseOut={() => setOpen(false)}
        sx={{
          color: "primary.main",
        }}
      >
        <FlexBox
          sx={{
            width: "100%",
            alignContent: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontWeight: open && "bold",
              ...ellipsis,
              WebkitLineClamp: "1",
            }}
          >
            {calculet.title}
          </Typography>
          <KeyboardArrowRightIcon />
        </FlexBox>
      </AccordionSummary>
      <AccordionDetails>
        <FlexColumnBox sx={{ gap: "0.4rem" }}>
          <Typography variant="caption" color="text.disabled">
            {categoryMainName} / {categorySubName}
          </Typography>
          <Typography
            variant="body2"
            align="left"
            sx={{
              ...ellipsis,
              WebkitLineClamp: "2",
            }}
          >
            {calculet.description}
          </Typography>
        </FlexColumnBox>
      </AccordionDetails>
      <AccordionDetails
        sx={{
          backgroundColor: "white",
          borderTopLeftRadius: "2.4rem",
          padding: "1.2rem",
        }}
      >
        <Grid container sx={{ ...centerSx }}>
          <Grid item xs>
            <FlexBox sx={{ ...centerSx }}>
              <Avatar src={calculet.contributor.profileImgSrc} />
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {calculet.contributor.userName}
              </Typography>
            </FlexBox>
          </Grid>
          <Grid item>
            <FlexBox sx={{ ...centerSx }}>
              <VisibilityIcon fontSize="small" color="action" />
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {calculet.viewCnt}
              </Typography>
            </FlexBox>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
export default BoxCalculetItem;
