import { Typography } from "@mui/material";
import { FlexColumnBox } from "../global-components/FlexBox";
import useGetCategoryName from "../../hooks/useGetCategoryName";

function MyCalculetInfoBox({
  title,
  description,
  categoryMainId,
  categorySubId,
}) {
  const { getCategoryMainName, getCategorySubName } = useGetCategoryName();

  return (
    <FlexColumnBox>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.disabled">
        {description}
      </Typography>
      <Typography variant="body2" color="text.disabled">{`${getCategoryMainName(
        categoryMainId
      )} / ${getCategorySubName(categoryMainId, categorySubId)}`}</Typography>
    </FlexColumnBox>
  );
}
export default MyCalculetInfoBox;
