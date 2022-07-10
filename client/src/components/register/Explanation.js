import styled from "styled-components";
import { FlexRowLayout } from "../Layout.js";
import styles from "../styles.js";
import { InputBox, InputBoxLine } from "./InputBox.js";
import { SelectBox, SelectBoxLine } from "./SelectBox.js";
import SmallTitle from "./SmallTitle.js";

/**
 * FlexRowLayout을 상속하는 비율 조정 컴포넌트
 */
const WrapperRatio = styled(FlexRowLayout)`
  gap: ${styles.styleLayout.basic700};
  flex: ${(props) => `${props.ratio}`};
`;

/**
 * 정보 입력 칸의 한 줄 컴포넌트 정의 (소제목 + 인풋칸 / 소제목 + select)
 */
const Explanation = styled(FlexRowLayout)`
  width: 100%;
  padding-bottom: ${styles.styleLayout.basic900};
  gap: ${styles.styleLayout.basic700};
`;

/**
 * Explanation 스타일에 밑줄 정의
 */
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
      <WrapperRatio ratio="1">
        <SmallTitle content={explanation} />
      </WrapperRatio>
      <WrapperRatio ratio="2.8">
        <InputBox
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      </WrapperRatio>
    </ExplanationLine>
  );
}

/**
 * 정보 입력 칸에서 밑줄이 없는 카테고리 칸 컴포넌트
 * @param {string, array, array, arrya, function}
 * explanation: 입력 칸의 정보에 대한 설명
 * bigCategory: 대분류 select된 값
 * bigPlaceholder: 대분류 select 전 placeholder 값
 * bigCategoryOptions: 대분류 옵션
 * onBigChange: 대분류 select된 값 관리
 * smallCategory: 소분류 select된 값
 * smallPlaceholder: 소분류 selec 전 placeholder 값
 * smallCategoryOptions: 소분류 옵션
 * onSmallChange: 소분류 select된 값 관리
 */
function ExplanationCategory({
  explanation,
  bigCategory,
  bigPlaceholder,
  bigCategoryOptions,
  onBigChange,
  smallCategory,
  smallPlaceholder,
  smallCategoryOptions,
  onSmallChange,
}) {
  return (
    <Explanation>
      <WrapperRatio ratio="1">
        <SmallTitle content={explanation} />
      </WrapperRatio>
      <WrapperRatio ratio="2.8">
        <SelectBoxLine
          options={bigCategoryOptions}
          placeholder={bigPlaceholder}
          selected={bigCategory}
          onChange={onBigChange}
        />
        <SelectBox
          options={smallCategoryOptions}
          placeholder={smallPlaceholder}
          selected={smallCategory}
          onChange={onSmallChange}
        />
      </WrapperRatio>
    </Explanation>
  );
}

/**
 * 이메일 입력하는 칸의 컴포넌트
 * @param {string, function, string, function, array, function}
 * address: 주소
 * onChangeAddress: change 함수
 * writeDomain: 직접 입력한 도메인 값
 * selectDomain: select 박스에서 선택한 도메인 값
 * onChangeDomain: change 함수
 * emailAddressOptions: 이메일 옵션
 * onChangeSelect: change 함수
 */
function ExplanationEmail({
  address,
  onChangeAddress,
  writeDomain,
  selectDomain,
  onChangeDomain,
  emailAddressOptions,
  onChangeSelect,
}) {
  return (
    <Explanation>
      <WrapperRatio ratio="1">
        <SmallTitle content="이메일" />
      </WrapperRatio>
      <WrapperRatio ratio="2.8">
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
          options={emailAddressOptions}
          placeholder="직접 입력"
          selected={selectDomain}
          onChange={onChangeSelect}
        />
      </WrapperRatio>
    </Explanation>
  );
}

export { ExplanationInputLine, ExplanationCategory, ExplanationEmail };
