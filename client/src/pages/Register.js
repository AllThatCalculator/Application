import styled from "styled-components";
import styles from "../components/styles";
import WriteCode from "../components/register/WriteCode";
import WriteInform from "../components/register/WriteInform";
import UploadDoneBtn from "../components/register/UploadDoneBtn";
import { useState, useRef } from "react";
import {
  OPTIONS_BIG_CATEGORY,
  OPTIONS_EMAIL_ADDRESS,
  OPTIONS_SMALL_CATEGORY,
} from "../components/register/OPTIONS";

// 계산기 저작 배경 색
const Positioner = styled.div`
  background: ${styles.styleColor.white300};
`;

// 계산기 저작 배경 컴포넌트 사이즈 고정
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: ${styles.styleLayout.basic300};
  ${styles.sizes.desktop};
  padding: ${styles.styleLayout.basic350};
`;

/**
 * 계산기 등록 페이지 컴포넌트
 * - 여러 컴포넌트에서 관리하는 state들을 관리
 */
function Register() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bigCategory, setBigCategory] = useState("");
  const [smallCategory, setSmallCategory] = useState("");
  // 대분류 종류에 맞는 소분류 옵션 배열
  const [smallCategoryOption, setSmallCategoryOption] = useState([
    { value: "default", name: "-" },
  ]);
  const [address, setAddress] = useState("");
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");

  // monaco editor의 값을 가져오기 위해 필요한 것
  const editorRef = useRef(null);

  const [htmlScript, setHtmlScript] = useState("<!DOCTYPE html>");
  const [markdown, setMarkdown] = useState("### write detail!");

  /**
   * 계산기 제목 입력값 change 함수
   * @param {*} event
   */
  function titleChange(event) {
    setTitle(event.target.value);
    console.log(event.target);
  }

  /**
   * 계산기 한 줄 설명 change 함수
   * @param {*} event
   */
  function descriptionChange(event) {
    setDescription(event.target.value);
  }

  /**
   * 계산기 대분류 change 함수
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * - 해당하는 대분류에 속하는 소분류 옵션을 세팅
   * @param {*} event
   */
  function bigCategoryChange(event) {
    const targetValue = event.target.value;
    const option = OPTIONS_BIG_CATEGORY.filter((x) => x.value === targetValue);
    const smallOption = OPTIONS_SMALL_CATEGORY.filter(
      (x) => x.big === option[0].value
    );
    setBigCategory(option[0].name);
    setSmallCategoryOption(smallOption[0].options);
  }

  /**
   * 계산기 소분류 change 함수
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * @param {*} event
   */
  function smallCategoryChange(event) {
    const targetValue = event.target.value;
    const option = smallCategoryOption.filter((x) => x.value === targetValue);
    setSmallCategory(option[0].name);
  }

  /**
   * email 세팅하는 함수 = address + @ + domain
   */
  function settingEmail() {
    setEmail(`${address}@${domain}`);
  }

  /**
   * 저작자 이메일의 주소 부분 change 함수
   * - email도 같이 세팅
   * @param {*} event
   */
  function addressChange(event) {
    setAddress(event.target.value);
    settingEmail();
  }

  /**
   * 저작자 이메일의 도메인 부분 change 함수 (input 박스)
   * - email도 같이 세팅
   * @param {*} event
   */
  function domainChange(event) {
    setDomain(event.target.value);
    settingEmail();
  }

  /**
   * 저작자 이메일의 도메인 부분 change 함수 (select 박스)
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * - email도 같이 세팅
   * @param {*} event
   */
  function domainSelectChange(event) {
    const targetValue = event.target.value;
    const option = OPTIONS_EMAIL_ADDRESS.filter((x) => x.value === targetValue);
    setDomain(option[0].name);
    settingEmail();
  }

  /**
   * HTML 코드 change 함수 (monaco editor)
   * @param {*} event
   */
  function htmlScriptChange(event) {
    setHtmlScript(editorRef.current.getValue());
  }

  /**
   * MARKDOWN 코드 change 함수 (monaco editor)
   * @param {*} event
   */
  function markdownChange(event) {
    setMarkdown(editorRef.current.getValue());
  }

  return (
    <Positioner>
      <Wrapper>
        <WriteInform
          title={title}
          description={description}
          bigCategory={bigCategory}
          smallCategoryOption={smallCategoryOption}
          smallCategory={smallCategory}
          address={address}
          domain={domain}
          email={email}
          titleChange={titleChange}
          descriptionChange={descriptionChange}
          bigCategoryChange={bigCategoryChange}
          smallCategoryChange={smallCategoryChange}
          addressChange={addressChange}
          domainChange={domainChange}
          domainSelectChange={domainSelectChange}
        />
        <WriteCode
          editorRef={editorRef}
          htmlScript={htmlScript}
          markdown={markdown}
          htmlScriptChange={htmlScriptChange}
          markdownChange={markdownChange}
        />
        <UploadDoneBtn
          title={title}
          description={description}
          bigCategory={bigCategory}
          smallCategory={smallCategory}
          email={email}
          htmlScript={htmlScript}
          markdown={markdown}
        />
      </Wrapper>
    </Positioner>
  );
}

export default Register;
