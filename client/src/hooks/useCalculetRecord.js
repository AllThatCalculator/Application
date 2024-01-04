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
    /**
     * input output 속성이 있는 것만 남기기 - calculetObj 참조
     * @param {string} inoutputObj "inputObj" | "outputObj"
     */
    function processData(inoutputObj) {
      return calculetObj[inoutputObj].reduce((obj, id) => {
        const value = data[inoutputObj][id];

        // 라벨값이 따로 존재할 경우 - select, radio 등
        if (calculetObj.valueToLabel[id]) {
          let label = calculetObj.valueToLabel[id][value];
          // multiselect, radio 등
          if (value instanceof Array) {
            label = value
              .map((v) => calculetObj.valueToLabel[id][v])
              .join(", ");
          }
          // multi checkbox
          else if (value instanceof Object) {
            label = Object.keys(value)
              .filter((v) => value[v])
              .map((v) => calculetObj.valueToLabel[id][v])
              .join(", ");
          }
          obj[id] = label;
        }
        // 날짜 데이터인 경우
        // else if (value instanceof Date) {
        //   const label = value.toISOString().split("T")[0];
        //   obj[id] = label;
        // }
        else {
          obj[id] = value;
        }
        return obj;
      }, {});
    }
    const inputObj = processData("inputObj");
    const outputObj = processData("outputObj");

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
