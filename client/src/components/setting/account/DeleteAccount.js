import { Typography } from "@mui/material";
import { useState } from "react";
import { ResponsiveButton } from "../../atom-components/Buttons";
import WarningDialog from "../../global-components/WarningDialog";

/**
 * 계정 탈퇴
 * @param {} param0
 * @returns
 */
function DeleteAccount() {
  const [isDeleteWarning, setIsDeleteWarning] = useState(false);
  function handleOpenIsDeleteWarning() {
    setIsDeleteWarning(true);
  }

  return (
    <>
      <Typography variant="body1">탈퇴하시면, 복구가 불가능 합니다.</Typography>
      <ResponsiveButton
        size="large"
        variant="contained"
        color="error"
        onClick={handleOpenIsDeleteWarning}
      >
        탈퇴
      </ResponsiveButton>
      <WarningDialog
        isOpen={isDeleteWarning}
        setIsOpen={setIsDeleteWarning}
        handleOnClick={() => {}}
        title="정말 탈퇴하시겠습니까?"
        contentText="탈퇴하시면 복구할 수 없습니다."
        actionText="탈퇴"
      />
    </>
  );
}
export default DeleteAccount;
