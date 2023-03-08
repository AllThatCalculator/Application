import { useDispatch, useSelector } from "react-redux";
import {
  onAppendCalculetRecent,
  onSetCalculetObj,
  onSetCalculetRecent,
  onSetCalculetRecord,
} from "../modules/calculetRecord";
import getCalculetRecords from "../user-actions/getCalculetRecords";
/**
 * 사용자 기록 내역 hook
 * @returns
 */
function useCalculetRecord() {
  /** Redux Dispatch */
  const dispatch = useDispatch();

  // user id token
  const { idToken } = useSelector((state) => ({
    idToken: state.userInfo.idToken,
  }));

  // set user record list
  function handleSetCellDatas(data) {
    dispatch(onSetCalculetRecord(data));
  }
  // set input, output obj
  function handleSetCalculetObj(data) {
    dispatch(onSetCalculetObj(data));
  }

  // set user recent list
  function handleSetCellRecentDatas(data) {
    dispatch(onSetCalculetRecent(data));
  }
  // append new data
  function handleAppendCalculetRecent(data) {
    dispatch(onAppendCalculetRecent(data));
  }

  // 계산 이력 가져오기
  async function handleGetCalculetRecords(calculetId) {
    // 로그인 안 한 경우
    if (idToken === "") {
      handleSetCellDatas([]);
    }
    // 로그인 한 경우
    else {
      await getCalculetRecords(calculetId, idToken).then((data) => {
        handleSetCellDatas(data);
      });
    }
  }

  return {
    handleSetCalculetObj,
    handleGetCalculetRecords,
    handleSetCellRecentDatas,
    handleAppendCalculetRecent,
  };
}
export default useCalculetRecord;
