import { IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useSnackbar from "../../../hooks/useSnackbar";

/**
 * 복사 버튼
 * @param {string} text 복사되는 문자열
 * @returns
 */
function CopyButton({ text }) {
  const { openSnackbar } = useSnackbar();

  async function handleCopyClipBoard() {
    try {
      await navigator.clipboard.writeText(text);
      openSnackbar(
        "basic",
        "복사되었습니다.",
        false,
        "bottom",
        "left",
        1600 // 지속시간
      );
    } catch (error) {
      openSnackbar(
        "basic",
        "다시 시도해주세요.",
        false,
        "bottom",
        "left",
        1600 // 지속시간
      );
    }
  }

  return (
    <IconButton size="small" onClick={() => handleCopyClipBoard()}>
      <ContentCopyIcon fontSize="small" />
    </IconButton>
  );
}

export default CopyButton;
