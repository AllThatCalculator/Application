import styled from "styled-components";
import styles from "../styles.js";

/**
 * 정보 입력 칸의 input 컴포넌트 스타일 정의
 */
const StyledInput = styled.input`
  padding: 0px;
  border: none;
  width: 100%;
  color: ${styles.styleColor.black};
  ${styles.sytleText.text100};
  ::placeholder {
    color: ${styles.styleColor.gray50};
  }
  :focus {
    outline: none;
  }
  :disabled {
    background: none;
  }
`;

/**
 * 정보 입력 칸의 input 컴포넌트에 오른쪽 구분선 스타일 정의
 */
const StyledInputLine = styled(StyledInput)`
  border-right: 1px solid ${styles.styleColor.blue50};
`;

/**
 * 정보 입력 칸의 인풋 컴포넌트
 * @param {string, string, function}
 * placeholder: 입력 전 채워진 글씨
 * defaultValue: 입력값
 * onChange: 입력값 가져오기 위한 함수
 * disabled: 입력칸 활성화 여부
 */
function InputBox({ placeholder, defaultValue, onChange, disabled }) {
  return (
    <StyledInput
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      disabled={disabled}
    />
  );
}

/**
 * 정보 입력 칸의 인풋 라인 컴포넌트
 * @param {string, string, function}
 * placeholder: 입력 전 채워진 글씨
 * defaultValue: 입력값
 * onChange: 입력값 가져오기 위한 함수
 * disabled: 입력칸 활성화 여부
 */
function InputBoxLine({ placeholder, defaultValue, onChange, disabled }) {
  return (
    <StyledInputLine
      placeholder={placeholder}
      value={defaultValue}
      onChange={onChange}
      disabled={disabled}
    />
  );
}

export { InputBox, InputBoxLine };
