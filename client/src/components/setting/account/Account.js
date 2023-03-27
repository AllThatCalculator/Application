import { Divider, Typography } from "@mui/material";
import useSx from "../../../hooks/useSx";
import Title from "../../global-components/Title";
import DeleteAccount from "./DeleteAccount";
import UpdateAccount from "./UpdateAccount";

function Account({ userInfo, handleUserInfoInput }) {
  const { subTitleSx } = useSx();

  return (
    <>
      <Title content="계정" />
      <Typography sx={{ ...subTitleSx }}>계정 수정</Typography>
      <UpdateAccount
        userInfo={userInfo}
        handleUserInfoInput={handleUserInfoInput}
      />
      <Divider />
      <Typography sx={{ ...subTitleSx }} color="error">
        계정 탈퇴
      </Typography>
      <DeleteAccount />
    </>
  );
}
export default Account;
