import { Grid, ListItem, Skeleton } from "@mui/material";

// bookmark bar skeleton
function BookmarkSkeleton() {
  return (
    <>
      {new Array(3).fill(0).map((item, index) => (
        <ListItem key={index}>
          <Skeleton sx={{ width: "100%" }} />
        </ListItem>
      ))}
    </>
  );
}
export default BookmarkSkeleton;
