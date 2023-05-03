import { Grid, Skeleton } from "@mui/material";
import { FlexColumnBox } from "../global-components/FlexBox";

// profile page skeleton
function ProfileSkeletonPage() {
  return (
    <Grid container gap="1.2rem">
      <Grid item>
        <Skeleton animation="wave" variant="circular" width={64} height={64} />
      </Grid>
      <Grid item xs>
        <FlexColumnBox>
          <Skeleton variant="text" width="30%" sx={{ mb: "0.4rem" }} />
          <Skeleton variant="text" width="14%" />
        </FlexColumnBox>
      </Grid>
    </Grid>
  );
}
export default ProfileSkeletonPage;
