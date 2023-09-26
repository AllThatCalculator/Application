import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { grey } from "@mui/material/colors";
import { TextField } from "@mui/material";

const LabelInputBaseSx = {
  // "label + &": {
  //   marginTop: 18,
  // },
};
const LabelInputBase = styled(InputBase)(({ theme }) => ({
  ...LabelInputBaseSx,
}));

const LabelTextField = styled(TextField)(({ theme }) => ({
  ...LabelInputBaseSx,
}));

export { LabelInputBase, LabelTextField };
