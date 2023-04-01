import { Typography } from "@mui/material";
import { useState } from "react";
import useError from "../../../hooks/useError";
import { ResponsiveButton } from "../../atom-components/Buttons";
import DeleteAccountFormDialog from "./DeleteAccountFormDialog";

/**
 * 계정 탈퇴
 * @param {} param0
 * @returns
 */
function DeleteAccount({
  handleOnClickDeleteAccount,
  email,
  password,
  onChangePassword,
  isLoading,
}) {
  const [isDeleteWarning, setIsDeleteWarning] = useState(false);
  // error state
  const { handleSetClearError } = useError();
  function handleOpenIsDeleteWarning() {
    setIsDeleteWarning(true);
    handleSetClearError();
  }

  const textFieldList = [
    {
      id: "email",
      label: "이메일",
      value: email,
      disabled: true,
    },
    {
      id: "password",
      label: "비밀번호",
      value: password,
    },
  ];

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
      <DeleteAccountFormDialog
        isOpen={isDeleteWarning}
        setIsOpen={setIsDeleteWarning}
        value={textFieldList}
        onChange={onChangePassword}
        handleOnSubmit={handleOnClickDeleteAccount}
        password={password}
        isLoading={isLoading}
      />
    </>
  );
}
export default DeleteAccount;
