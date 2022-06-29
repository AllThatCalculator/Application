import styled from "styled-components";
import styles from "../styles";
import PreviewBanner from "./PreviewBanner";
import MiddleTitle from "./MiddleTitle";
import {
  ExplanationCategory,
  ExplanationEmail,
  ExplanationInputLine,
} from "./Explanation";
import { OPTIONS_BIG_CATEGORY, OPTIONS_EMAIL_ADDRESS } from "./OPTIONS";
import BigTitle from "../atom-components/BigTitle";

// 정보칸 + 배너 미리보기 감싸는 스타일 정의
const WrapperInformBanner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 0px 38px;
  height: 100%;
  gap: ${styles.styleLayout.basic300};
  border-bottom: 1px solid ${styles.styleColor.blue50};
`;

// 정보칸 감싸는 스타일 정의
const WrapperInform = styled.div`
  display: flex;
  flex-direction: column;
  width: 713px;
  gap: ${styles.styleLayout.basic900};
`;

// 배너 미리보기 감싸는 스타일 정의
const WrapperBanner = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  width: 347px;
`;

// 입력 칸들 감싸는 박스 스타일 정의
const InformBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 14px 14px 0px;
  gap: ${styles.styleLayout.basic900};
  border: 1px solid ${styles.styleColor.blue50};
  border-radius: 7px;
`;

/**
 * 계산기 정보 입력창 컴포넌트 (정보 입력 + 배너 미리보기)
 * @param {*} props
 * props: 계산기에 대한 정보 state들
 */
function WriteInform(props) {
  return (
    <WrapperInformBanner>
      <WrapperInform>
        <BigTitle content="정보 입력하기" />
        <MiddleTitle content="계산기 정보" />
        <InformBox>
          <ExplanationInputLine
            explanation="계산기 이름"
            placeholder="ex. 사칙연산 계산기"
            defaultValue={props.title}
            onChange={props.titleChange}
          />
          <ExplanationInputLine
            explanation="계산기에 대한 간단한 설명"
            placeholder="ex. 사칙연산을 하는 계산기입니다."
            defaultValue={props.description}
            onChange={props.descriptionChange}
          />
          <ExplanationCategory
            explanation="카테고리"
            OPTIONS_BIG_CATEGORY={OPTIONS_BIG_CATEGORY}
            onBigChange={props.bigCategoryChange}
            OPTIONS_SMALL_CATEGORY={props.smallCategoryOption}
            onSmallChange={props.smallCategoryChange}
          />
        </InformBox>
        <MiddleTitle content="제작자 정보" />
        <InformBox>
          <ExplanationEmail
            address={props.address}
            onChangeAddress={props.addressChange}
            domain={props.domain}
            onChangeDomain={props.domainChange}
            OPTIONS_EMAIL_ADDRESS={OPTIONS_EMAIL_ADDRESS}
            onChangeSelect={props.domainSelectChange}
          />
        </InformBox>
      </WrapperInform>
      <WrapperBanner>
        <PreviewBanner
          profile="/img/ori.png"
          title={props.title}
          description={props.description}
        />
      </WrapperBanner>
    </WrapperInformBanner>
  );
}

export default WriteInform;
