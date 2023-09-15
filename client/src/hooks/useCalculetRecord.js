import { useDispatch, useSelector } from "react-redux";
import {
  onAppendCalculetRecent,
  onSetCalculetObj,
  onSetCalculetRecent,
  onSetCalculetRecord,
} from "../modules/calculetRecord";
import getCalculetRecords from "../user-actions/records/getCalculetRecords";
/**
 * 사용자 기록 내역 hook
 * @returns
 */
function useCalculetRecord() {
  /** Redux Dispatch */
  const dispatch = useDispatch();

  // user id token
  const { idToken, calculetObj } = useSelector((state) => ({
    idToken: state.userInfo.idToken,
    calculetObj: state.calculetRecord.calculetObj,
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
    // input output 속성이 있는 것만 남기기 - calculetObj 참조
    const inputObj = calculetObj.inputObj.reduce((obj, key) => {
      // const [id, data] = key;
      obj[key] = data.inputObj[key];
      return obj;
    }, {});

    const outputObj = calculetObj.outputObj.reduce((obj, key) => {
      obj[key] = data.outputObj[key];
      return obj;
    }, {});

    dispatch(onAppendCalculetRecent({ ...data, inputObj, outputObj }));
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
