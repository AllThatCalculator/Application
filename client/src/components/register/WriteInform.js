import styled from "styled-components";
import styles from "../styles";
import { useState } from "react";
import PreviewBanner from "./PreviewBanner";
import BigTitle from "./BigTitle";
import MiddleTitle from "./MiddleTitle";
import {
  ExplanationCategory,
  ExplanationEmail,
  ExplanationInputLine,
} from "./Explanation";
import {
  OPTIONS_BIG_CATEGORY,
  OPTIONS_EMAIL_ADDRESS,
  OPTIONS_SMALL_CATEGORY,
} from "./CONSTANT";

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

function WriteInform() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bigCategory, setBigCategory] = useState("");
  const [smallCategoryOption, setSmallCategoryOption] = useState([
    { value: "default", name: "-" },
  ]);
  const [smallCategory, setSmallCategory] = useState("");
  const [address, setAddress] = useState("");
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");

  function nameChange(event) {
    setTitle(event.target.value);
  }
  function descriptionChange(event) {
    setDescription(event.target.value);
  }
  function bigCategoryChange(event) {
    const targetValue = event.target.value;
    const option = OPTIONS_BIG_CATEGORY.filter((x) => x.value === targetValue);
    const smallOption = OPTIONS_SMALL_CATEGORY.filter(
      (x) => x.big === option[0].value
    );
    setBigCategory(option[0].name);
    setSmallCategoryOption(smallOption[0].options);
  }
  function smallCategoryChange(event) {
    const targetValue = event.target.value;
    const option = smallCategoryOption.filter((x) => x.value === targetValue);
    setSmallCategory(option[0].name);
  }
  function addressChange(event) {
    setAddress(event.target.value);
    setEmail(`${address}@${domain}`);
  }
  function domainChange(event) {
    setDomain(event.target.value);
  }
  function domainSelectChange(event) {
    const targetValue = event.target.value;
    const option = OPTIONS_EMAIL_ADDRESS.filter((x) => x.value === targetValue);
    setDomain(option[0].name);
    setEmail(`${address}@${domain}`);
  }
  return (
    <WrapperInformBanner>
      <WrapperInform>
        <BigTitle content="정보 입력하기" />
        <MiddleTitle content="계산기 정보" />
        <InformBox>
          <ExplanationInputLine
            explanation="계산기 이름"
            placeholder="ex. 사칙연산 계산기"
            value={title}
            onChange={nameChange}
          />
          <ExplanationInputLine
            explanation="계산기에 대한 간단한 설명"
            placeholder="ex. 사칙연산을 하는 계산기입니다."
            value={description}
            onChange={descriptionChange}
          />
          <ExplanationCategory
            explanation="카테고리"
            OPTIONS_BIG_CATEGORY={OPTIONS_BIG_CATEGORY}
            onBigChange={bigCategoryChange}
            OPTIONS_SMALL_CATEGORY={smallCategoryOption}
            onSmallChange={smallCategoryChange}
          />
        </InformBox>
        <MiddleTitle content="제작자 정보" />
        <InformBox>
          <ExplanationEmail
            address={address}
            onChangeAddress={addressChange}
            domain={domain}
            onChangeDomain={domainChange}
            OPTIONS_EMAIL_ADDRESS={OPTIONS_EMAIL_ADDRESS}
            onChangeSelect={domainSelectChange}
          />
        </InformBox>
      </WrapperInform>
      <WrapperBanner>
        <PreviewBanner
          profile="/img/ori.png"
          title={title}
          description={description}
        />
      </WrapperBanner>
    </WrapperInformBanner>
  );
}

export default WriteInform;
