import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApproachIframeTag from "../../utils/ApproachIframeTag";
import { BtnIndigo } from "../atom-components/ButtonTemplate";

function RecordCalculetHistory({ calculetId, userEmail }) {
  // 페이지 넘기기 위해 필요한 것
  const navigate = useNavigate();

  /**
   * 이력 저장 백엔드로 요청
   */
  async function recordCalculetHistory(data) {
    try {
      await axios.post("/record", data);
    } catch (error) {
      switch (error.response.status) {
        case 400:
          console.dir(error.response.data);
        case 401:
          navigate("/login");
        default:
          break;
      }
    }
  }

  /**
   * 태그 리스트 내의 값에 접근해서 object로 가공시키는 함수
   * @param {nodelist}
   * data: 태그 리스트
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
   * 저장하기 버튼 클릭 시 함수
   */
  function onClickRecordBtn() {
    const inputTag = ApproachIframeTag("atc-calculet-input");
    const outputTag = ApproachIframeTag("atc-calculet-output");

    const inputObj = makeObject(inputTag);
    const outputObj = makeObject(outputTag);

    // 잘 출력되는거 확인!! ^-^
    // console.dir(inputObj);
    // console.dir(outputObj);

    // 오브젝트 최종 합치기
    const data = {
      userId: userEmail,
      calculetId: calculetId,
      input: inputObj,
      output: outputObj,
    };

    // 만들어진 오브젝트들로 /record 에 POST 요청
    recordCalculetHistory(data);
  }

  return <BtnIndigo text="계산내역 저장" onClick={onClickRecordBtn} />;
}

export default RecordCalculetHistory;
