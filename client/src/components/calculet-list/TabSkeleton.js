import { Skeleton } from "@mui/material";
import { FlexBox } from "../global-components/FlexBox";

// tab skeleton
function TabSkeleton() {
  return (
    <FlexBox gap="1.2rem">
      {new Array(3).fill(0).map((item, index) => (
        <Skeleton width={60} height={40} key={index} />
      ))}
    </FlexBox>
  );
}
export default TabSkeleton;
