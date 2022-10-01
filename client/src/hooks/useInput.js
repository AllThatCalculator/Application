import { useState } from "react";

/**
 * useState를 이용한, 입력 상태 관리 함수 컴포넌트
 * @param {string} initialValue 입력 초기값
 */
function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  function onChange(event) {
    setValue(event.target.value);
  }
  return { value, onChange };
}
export default useInput;
