import { useNavigate } from "react-router-dom";
import ApproachIframeTag from "../../utils/ApproachIframeTag";
import { BtnIndigo } from "../atom-components/ButtonTemplate";
import recordCalculet from "../../user-actions/recordCalculet";

/**
 * 계산 이력 저장 버튼 컴포넌트
 * - 저장하기 버튼 누르면 먼저 iframe에 접근해서 값을 가져온 후, /record POST 요청으로 계산 이력 저장
 * @param {string} calculetId 계산기 번호
 */
function RecordCalculetHistory({ calculetId }) {
  // 페이지 넘기기 위해 필요한 navigate
  const navigate = useNavigate();

  /**
   * 이력 저장 백엔드로 요청
   */
  function recordCalculetHistory(data) {
    const request = recordCalculet(data);
    request.then((res) => {
      if (res === 401) {
        // 인증 실패
        navigate("/login");
      }
    });
  }

  /**
   * 태그 리스트 내의 값에 접근해서 object로 가공시키는 함수
   * @param {nodelist} data 태그 리스트
   * @returns object
   */
  function makeObject(data) {
    const obj = {};
    for (let i = 0; i < data.length; i++) {
      const desc = data[i].attributes.atcDesc.value;
      const value = data[i].value;
      obj[desc] = value;
    }
    return obj;
  }

  /**
   * 저장하기 버튼 클릭 시 input, output 정보 object로 가공하고 서버에 보낼 데이터 가공 및 요청 보내는 함수
   */
  function onClickRecordBtn() {
    const inputTag = ApproachIframeTag("atc-calculet-input");
    const outputTag = ApproachIframeTag("atc-calculet-output");

    const inputObj = makeObject(inputTag);
    const outputObj = makeObject(outputTag);

    // 오브젝트 최종 합치기
    // (임시) userId -> userEmail로 변경 해야함!
    const data = {
      calculetId: calculetId,
      inputObj: inputObj,
      outputObj: outputObj,
    };

    // 만들어진 오브젝트들로 /record 에 POST 요청
    recordCalculetHistory(data);
  }

  return <BtnIndigo text="계산내역 저장" onClick={onClickRecordBtn} />;
}

export default RecordCalculetHistory;
