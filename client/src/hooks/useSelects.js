import { useState } from "react";

/**
 * useState를 이용한, Select 입력 상태 관리 함수 컴포넌트
 * @param {object} initialValue 입력 초기값 객체로 들어옴
 *
 */
function useSelects(initialValue) {
  const [values, setValues] = useState(initialValue);

  // 입력 event
  function onChange(event) {
    const { name, value } = event.target;

    setValues({
      ...values, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 input만의 value로 설정
    });
  }
  // 직접 입력
  function onSetValue({ name, value }) {
    setValues({
      ...values, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 input만의 value로 설정
    });
  }

  // (한 번에 여러 개) 직접 입력
  function onSetValues(newValues) {
    let result = {};
    for (let { name, value } of newValues) {
      result = { [name]: value, ...result };
    }

    setValues({
      ...values,
      ...result,
    });
  }

  return { values, onChange, onSetValue, onSetValues };
}
export default useSelects;
