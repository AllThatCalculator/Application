import styled from "styled-components";
import { React, useState } from "react";
import styles from "../styles.js";
import { BtnSmallIcon } from "./ButtonIcon.js";

//스타일드 폼
const StyledForm = styled.form`
  position: relative;
`;
//스타일드 인풋
const StyledInput = styled.input`
  ${styles.styleSize.input};
  padding: ${styles.styleLayout.basic100};
  padding-right: ${styles.styleLayout.basic1050};
  background: ${styles.styleColor.white50.color};
  opacity: ${styles.styleColor.white50.opacity};
  color: ${styles.styleColor.black};
  border: ${styles.styleLayout.basic200} solid black;

  ${styles.styleBorder.basic100};
  ${styles.styleEffect.opacity100};

  ${styles.sytleText.text100};
  outline: none;
`;
// 입력창 안에 버튼 위치
const StyledDiv = styled.div`
  display: flex;
  height: ${styles.styleLayout.basic950};
  gap: ${styles.styleLayout.basic50};
  position: absolute;
  top: 25%;
  right: 3%;
`;
/**
 *
 * 검색창을 반환하는 함수
 * -> 돋보기 아이콘으로 검색가능
 * -> 검색창 내에 입력하면 엑스 아이콘 생김 -> 엑스 누르면 입력 내용 전체 삭제
 *
 * @param {string}
 * text : 검색창 내의 placeholder 내용
 *
 */
function BoxSearchInput({ text }) {
  // 입력한 내용
  const [inputText, setInputText] = useState("");
  const onChange = (event) => {
    setInputText(event.target.value);
  };
  // 제출 이벤트
  const onSubmit = (event) => {
    event.preventDefault();
    if (inputText === "") return;
    setInputText("");
  };
  // 입력 내용 전체 삭제
  const onReset = (event) => {
    event.preventDefault();
    setInputText("");
  };
  // 버튼 막음
  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      onSubmit(event);
    }
  };

  return (
    <StyledForm name="form" onKeyDown={onKeyDown}>
      <StyledInput
        value={inputText}
        onChange={onChange}
        onSubmit={onSubmit}
        text="text"
        placeholder={text}
      />
      <StyledDiv>
        {inputText && (
          <BtnSmallIcon
            text="지우기"
            icon="X"
            color="blue"
            onClick={onReset}
            type="button"
          />
        )}
        <BtnSmallIcon
          text="검색"
          icon="Search"
          color="blue"
          type="submit"
          onClick={onSubmit}
        />
      </StyledDiv>
    </StyledForm>
  );
}
export default BoxSearchInput;
