import { Skeleton, Stack } from "@mui/material";

// calculet block skeleton
function CalculetSkeleton() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rounded" height={60} />
      <Skeleton variant="rounded" width={90} height={30} />
      <Skeleton variant="text" />
      <Skeleton variant="rounded" height={60} />
    </Stack>
  );
}
export default CalculetSkeleton;
