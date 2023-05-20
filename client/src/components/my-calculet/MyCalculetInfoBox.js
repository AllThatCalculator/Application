import { Typography } from "@mui/material";
import { FlexColumnBox } from "../global-components/FlexBox";
import useGetCategoryName from "../../hooks/useGetCategoryName";
import useSx from "../../hooks/useSx";

function MyCalculetInfoBox({
  title,
  description,
  categoryMainId,
  categorySubId,
}) {
  const { getCategoryMainName, getCategorySubName } = useGetCategoryName();
  const { ellipsis } = useSx();

  return (
    <FlexColumnBox sx={{ maxWidth: "18rem" }}>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="text.disabled"
        sx={{
          ...ellipsis,
          WebkitLineClamp: "1",
        }}
      >
        {description}
      </Typography>
      <Typography variant="body2" color="text.disabled">{`${getCategoryMainName(
        categoryMainId
      )} / ${getCategorySubName(categoryMainId, categorySubId)}`}</Typography>
    </FlexColumnBox>
  );
}
export default MyCalculetInfoBox;
