import styled from "styled-components";
import styles from "../styles.js";
import { InputBox, InputBoxLine } from "./InputBox.js";
import { SelectBox, SelectBoxLine } from "./SelectBox.js";
import SmallTitle from "./SmallTitle.js";

// 컴포넌트 비율 정하기 위한 스타일 정의
const WrapperRatio = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${styles.styleLayout.basic700};
`;

// 비율이 1인 스타일 정의
const WrapperRatio1 = styled(WrapperRatio)`
  flex: 1;
`;

// 비율이 2.8인 스타일 정의
const WrapperRatio2dot8 = styled(WrapperRatio)`
  flex: 2.8;
`;

// 정보 입력 칸의 한 줄 컴포넌트 정의 (소제목 + 인풋칸 / 소제목 + select)
const Explanation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 0px 14px;
  width: 100%;
  gap: ${styles.styleLayout.basic700};
  background: ${styles.styleColor.white300};
`;

// Explanation 스타일에 밑줄 정의
const ExplanationLine = styled(Explanation)`
  border-bottom: 1px solid ${styles.styleColor.blue50};
`;

/**
 * 정보 입력 칸에서 밑줄이 있는 입력 칸 컴포넌트
 * @param {string, string, string, function}
 * explanation: 입력 칸의 정보에 대한 설명
 * placeholder: 인풋 칸 초기값
 * defaultValue: 인풋값
 * onChange: 인풋값 관리하는 함수
 */
function ExplanationInputLine({
  explanation,
  placeholder,
  defaultValue,
  onChange,
}) {
  return (
    <ExplanationLine>
      <WrapperRatio1>
        <SmallTitle content={explanation} />
      </WrapperRatio1>
      <WrapperRatio2dot8>
        <InputBox
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      </WrapperRatio2dot8>
    </ExplanationLine>
  );
}

/**
 * 정보 입력 칸에서 밑줄이 없는 카테고리 칸 컴포넌트
 * @param {string, array, array, arrya, function}
 * explanation: 입력 칸의 정보에 대한 설명
 * OPTIONS_BIC_CATEGORY: 대분류 옵션
 * onBigChange: 대분류 select된 값 관리
 * OPTIONS_SMALL_CATEGORY: 소분류 옵션
 * onSmallChange: 소분류 select된 값 관리
 */
function ExplanationCategory({
  explanation,
  bigCategory,
  bigPlaceholder,
  OPTIONS_BIG_CATEGORY,
  onBigChange,
  smallCategory,
  smallPlaceholder,
  OPTIONS_SMALL_CATEGORY,
  onSmallChange,
}) {
  return (
    <Explanation>
      <WrapperRatio1>
        <SmallTitle content={explanation} />
      </WrapperRatio1>
      <WrapperRatio2dot8>
        <SelectBoxLine
          options={OPTIONS_BIG_CATEGORY}
          placeholder={bigPlaceholder}
          selected={bigCategory}
          onChange={onBigChange}
        />
        <SelectBox
          options={OPTIONS_SMALL_CATEGORY}
          placeholder={smallPlaceholder}
          selected={smallCategory}
          onChange={onSmallChange}
        />
      </WrapperRatio2dot8>
    </Explanation>
  );
}

/**
 * 이메일 입력하는 칸의 컴포넌트
 * @param {string, function, string, function, array, function}
 * address: 주소
 * onChangeAddress: change 함수
 * domain: 직접 입력 도메인
 * onChangeDomain: change 함수
 * OPTIONS_EMAIL_ADDRESS: 이메일 옵션
 * onChnageSelect: change 함수
 */
function ExplanationEmail({
  address,
  onChangeAddress,
  writeDomain,
  selectDomain,
  onChangeDomain,
  OPTIONS_EMAIL_ADDRESS,
  onChangeSelect,
}) {
  return (
    <Explanation>
      <WrapperRatio1>
        <SmallTitle content="이메일" />
      </WrapperRatio1>
      <WrapperRatio2dot8>
        <InputBox
          placeholder="주소"
          defaultValue={address}
          onChange={onChangeAddress}
        />
        <SmallTitle content="@" />
        <InputBoxLine
          placeholder="도메인"
          defaultValue={writeDomain}
          onChange={onChangeDomain}
          disabled={selectDomain !== "직접 입력" ? true : false}
        />
        <SelectBox
          options={OPTIONS_EMAIL_ADDRESS}
          placeholder="직접 입력"
          selected={selectDomain}
          onChange={onChangeSelect}
        />
      </WrapperRatio2dot8>
    </Explanation>
  );
}

export { ExplanationInputLine, ExplanationCategory, ExplanationEmail };
