import styled from "styled-components";
import StyledTitle from "./Title";
import styles from "../styles";
import { useState } from "react";
import { StyledIcon } from "../atom-components/ButtonTemplate";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${styles.styleLayout.basic900};
`;

const WrapperRatio1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  gap: ${styles.styleLayout.basic700};
`;

const WrapperRatio2dot8 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 2.8;
  gap: ${styles.styleLayout.basic700};
`;

const MiddleText = styled.div`
  display: flex;
  align-items: center;
  ${styles.sytleText.text200};
  color: ${styles.styleColor.blue900};
`;

const InformBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 14px 14px 0px;
  gap: ${styles.styleLayout.basic900};
  border: 1px solid ${styles.styleColor.blue50};
  border-radius: 7px;
`;

const Explanation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 0px 14px;
  width: 100%;
  gap: ${styles.styleLayout.basic700};
  background: ${styles.styleColor.white300};
  border-bottom: 1px solid ${styles.styleColor.blue50};
`;

const SmallText = styled.div`
  color: ${styles.styleColor.gray100};
  ${styles.sytleText.text100};
`;

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

const StyledSelectOutBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  color: ${styles.styleColor.blue900};
  padding: 0px 8px 0px 0px;
`;

const StyledSelectOutBoxLine = styled(StyledSelectOutBox)`
  border-right: 1px solid ${styles.styleColor.blue50};
`;

const StyledSelect = styled.select`
  border: none;
  appearance: none;
  width: 100%;
  color: ${styles.styleColor.gray50};
  ${styles.sytleText.text100};
  option {
    color: ${styles.styleColor.black};
  }
  option:first-child {
    color: ${styles.styleColor.gray50};
  }
  :focus {
    outline: none;
  }
`;

function ExplanationInput({ explanation, placeholder, value, onChange }) {
  return (
    <Explanation>
      <WrapperRatio1>
        <SmallText>{explanation}</SmallText>
      </WrapperRatio1>
      <WrapperRatio2dot8>
        <StyledInput
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </WrapperRatio2dot8>
    </Explanation>
  );
}

function SelectBox({ isLine, options, defaultValue }) {
  return (
    <>
      {isLine ? (
        <StyledSelectOutBoxLine>
          <StyledSelect>
            {options.map((option) => (
              <option
                value={option.value}
                key={option.value}
                defaultValue={defaultValue === option.value}
              >
                {option.name}
              </option>
            ))}
          </StyledSelect>
          <StyledIcon name="CaretDownFill" />
        </StyledSelectOutBoxLine>
      ) : (
        <StyledSelectOutBox>
          <StyledSelect>
            {options.map((option) => (
              <option
                value={option.value}
                key={option.value}
                defaultValue={defaultValue === option.value}
              >
                {option.name}
              </option>
            ))}
          </StyledSelect>
          <StyledIcon name="CaretDownFill" />
        </StyledSelectOutBox>
      )}
    </>
  );
}

//카테고리 대분류 옵션
const OPTIONS_BIG_CATEGORY = [
  { value: "default", name: "대분류" },
  { value: "math", name: "수학" },
  { value: "science", name: "과학-공학" },
  { value: "social", name: "경제-사회" },
  { value: "life", name: "일상" },
  { value: "etc", name: "기타" },
];

function WriteInform() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function nameChange(event) {
    setTitle(event.target.value);
  }
  function descriptionChange(event) {
    setDescription(event.target.value);
  }
  return (
    <Wrapper>
      <StyledTitle>정보 입력하기</StyledTitle>
      <MiddleText>계산기 정보</MiddleText>
      <InformBox>
        <ExplanationInput
          explanation="계산기 이름"
          placeholder="ex. 사칙연산 계산기"
          value={title}
          onChange={nameChange}
        />
        <ExplanationInput
          explanation="계산기에 대한 간단한 설명"
          placeholder="ex. 사칙연산을 하는 계산기입니다."
          value={description}
          onChange={descriptionChange}
        />
        <Explanation>
          <WrapperRatio1>
            <SmallText>카테고리</SmallText>
          </WrapperRatio1>
          <WrapperRatio2dot8>
            <SelectBox
              isLine={true}
              options={OPTIONS_BIG_CATEGORY}
              defaultValue="default"
            />
            <SelectBox
              isLine={false}
              options={OPTIONS_BIG_CATEGORY}
              defaultValue="default"
            />
          </WrapperRatio2dot8>
        </Explanation>
      </InformBox>
      <MiddleText>제작자 정보</MiddleText>
      <InformBox>
        <Explanation>
          <WrapperRatio1>
            <SmallText>이메일</SmallText>
          </WrapperRatio1>
          <WrapperRatio2dot8>
            <StyledInput placeholder="주소" />
            <SmallText>@</SmallText>
            <StyledInput placeholder="도메인" />
            <SelectBox
              isLine={false}
              options={OPTIONS_BIG_CATEGORY}
              defaultValue="default"
            />
          </WrapperRatio2dot8>
        </Explanation>
      </InformBox>
    </Wrapper>
  );
}

export default WriteInform;
