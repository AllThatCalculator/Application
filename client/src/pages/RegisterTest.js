// import { useCallback } from "react";
import { Grid } from "@mui/material";
import { PageScreenBox } from "../components/organisms/common/PageScreenBox";
import CalculetEditor from "../components/organisms/register-editor/CalculetEditor";

/**
 * 계산기 심플 등록 테스트 페이지
 * - 사용자에게 입력받는 컴포넌트 정보를 객체로 바꿔서, transform하는 로직
 * - 사용자에게 입력받은 함수 문자열(functionStr)을 함수화해서 계산하기 버튼을 눌렀을 때 계산이 실행되도록 함
 */
function RegisterTest() {
  // const [inputs, setInputs] = useState({}); // 입력 객체
  // const [outputs, setOutputs] = useState({}); // 출력 객체 (계산하기 후, 입력 + 출력 모두 합쳐서 저장)

  // 함수 생성 보안 경고 무시
  // const userFunction = new Function(
  //   "inputObj",
  //   `return {
  //     test2: inputObj.test * inputObj.test
  //   }`
  // );

  // // 계산하기
  // const calculate = useCallback((userFunction) => {
  //   // const outputObj = { ...userFunction(inputs) };
  //   // setOutputs(outputObj);
  // }, []);

  // // 입력 값 onChange 함수
  // const onInputsChange = useCallback((e) => {
  //   // console.log(e.target.value);
  //   // let { id, value } = e.target;
  //   // if (e.target.type === "checkbox") {
  //   //   if (e.target.name) {
  //   //     value = {
  //   //       [e.target.name]: e.target.checked,
  //   //     };
  //   //   } else {
  //   //     value = e.target.checked;
  //   //   }
  //   // } else if (id === undefined) {
  //   //   id = e.target.name;
  //   // }
  //   // setInputs((inputs) => ({
  //   //   ...inputs,
  //   //   [id]:
  //   //     typeof inputs[id] === "object" && !Array.isArray(inputs[id])
  //   //       ? { ...inputs[id], ...value }
  //   //       : value,
  //   // }));
  // }, []);

  // // inputs 값 초기화하는 함수
  // const initInputs = useCallback((key, value) => {
  //   // setInputs((inputs) => ({ ...inputs, [key]: value }));
  //   // console.log(key, value);
  // }, []);

  // outputs 값 초기화하는 함수
  // const initOutputs = useCallback((key, value) => {
  //   setOutputs((outputs) => ({ ...outputs, [key]: value }));
  // }, []);

  // console.log("type", type);
  // console.log("inputs", inputs);
  // console.log("outputs", outputs);
  // console.log("components", components);

  return (
    <Grid container sx={{ backgroundColor: "white" }}>
      <PageScreenBox gap="2.4rem">
        <CalculetEditor />
        <button
        // onClick={() => calculate(userFunction)}
        >
          계산하기
        </button>
      </PageScreenBox>
    </Grid>
  );
}
export default RegisterTest;
