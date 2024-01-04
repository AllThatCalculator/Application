import { Grid, Skeleton } from "@mui/material";

// search page skeleton
function SearchSkeletonPage() {
  return (
    <Grid
      container
      spacing={4}
      columns={{ xs: 1, sm: 2, md: 3 }}
      sx={{ alignContent: "stretch" }}
    >
      {new Array(3).fill(0).map((item, index) => (
        <Grid item key={index} xs={1} sm={1} md={1}>
          <Skeleton height={64} />
        </Grid>
      ))}
    </Grid>
  );
}
export default SearchSkeletonPage;
