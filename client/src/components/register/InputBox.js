import styled from "styled-components";
import styles from "../styles.js";

// 정보 입력 칸의 input 컴포넌트 스타일 정의
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
`;

/**
 * 정보 입력 칸의 인풋 컴포넌트
 * @param {string, string, function}
 * placeholder: 입력 전 채워진 글씨
 * value: 입력값
 * onChange: 입력값 가져오기 위한 함수
 */
function InputBox({ placeholder, value, onChange }) {
  return (
    <StyledInput placeholder={placeholder} value={value} onChange={onChange} />
  );
}

export default InputBox;
