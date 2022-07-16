import styled from "styled-components";
import styles from "../components/styles";
import WriteCode from "../components/register/WriteCode";
import WriteInform from "../components/register/WriteInform";
import UploadDoneBtn from "../components/register/UploadDoneBtn";
import { useState, useRef, useEffect } from "react";
import {
  OPTIONS_BIG_CATEGORY,
  OPTIONS_EMAIL_ADDRESS,
  OPTIONS_SMALL_CATEGORY,
} from "../components/register/Option";
import { ContentLayout, White300Layout } from "../components/Layout";

/**
 * ContentLayout을 상속하는 RegisterLayout
 * - flex와 gap, padding 설정을 새로 함
 */
const RegisterLayout = styled(ContentLayout)`
  display: flex;
  flex-direction: column;
  gap: ${styles.styleLayout.basic300};
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
  const [smallCategoryOption, setSmallCategoryOption] = useState(null);
  const [address, setAddress] = useState("");
  const [writedDomain, setWritedDomain] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");

  // monaco editor의 값을 가져오기 위해 필요한 것
  const editorRef = useRef(null);

  const [htmlScript, setHtmlScript] = useState("<!DOCTYPE html>");
  const [markdown, setMarkdown] = useState("### write detail!");

  // 바로 초기화하면 defaultValue로 설정해서인지 값이 안 바뀌어서 나중에 set하기 위해 useEffect 사용
  useEffect(() => setSelectedDomain("직접 입력"), []);

  /**
   * 계산기 제목 입력값 change 함수
   * @param {*} event
   */
  function changeTitle(event) {
    setTitle(event.target.value);
  }

  /**
   * 계산기 한 줄 설명 change 함수
   * @param {*} event
   */
  function changeDescription(event) {
    setDescription(event.target.value);
  }

  /**
   * 계산기 대분류 change 함수
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * - 해당하는 대분류에 속하는 소분류 옵션을 세팅
   * @param {*} event
   */
  function changeBigCategory(event) {
    const targetValue = event.target.value;
    const option = OPTIONS_BIG_CATEGORY.filter((x) => x.value === targetValue);
    const smallOption = OPTIONS_SMALL_CATEGORY.filter(
      (x) => x.big === option[0].value
    );
    setBigCategory(option[0].name);
    setSmallCategory(null);
    if (smallOption.length) {
      setSmallCategoryOption(smallOption[0].options);
    } else {
      setSmallCategoryOption(null);
    }
  }

  /**
   * 계산기 소분류 change 함수
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * @param {*} event
   */
  function changeSmallCategory(event) {
    const targetValue = event.target.value;
    if (smallCategoryOption) {
      const option = smallCategoryOption.filter((x) => x.value === targetValue);
      setSmallCategory(option[0].name);
    }
  }

  /**
   * email 세팅하는 함수 = address + @ + domain
   */
  function settingEmail(address, domain) {
    setEmail(`${address}@${domain}`);
  }

  /**
   * 저작자 이메일의 주소 부분 change 함수
   * - email도 같이 세팅
   * @param {*} event
   */
  function changeAddress(event) {
    setAddress(event.target.value);
    settingEmail(event.target.value, domain);
  }

  /**
   * 저작자 이메일의 도메인 부분 change 함수 (input 박스)
   * - email도 같이 세팅
   * @param {*} event
   */
  function changeDomain(event) {
    const targetValue = event.target.value;
    setWritedDomain(targetValue);
    setDomain(targetValue);
    settingEmail(address, targetValue);
  }

  /**
   * 저작자 이메일의 도메인 부분 change 함수 (select 박스)
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * - email도 같이 세팅
   * @param {*} event
   */
  function changeSelectedDomain(event) {
    const targetValue = event.target.value;
    const option = OPTIONS_EMAIL_ADDRESS.filter((x) => x.value === targetValue);
    const domainValue = option[0].name;
    if (domainValue === "직접 입력") {
      setWritedDomain("");
    } else {
      setWritedDomain(domainValue);
    }
    setSelectedDomain(domainValue);
    setDomain(domainValue);
    settingEmail(address, domainValue);
  }

  /**
   * HTML 코드 change 함수 (monaco editor)
   */
  function changeHtmlScript() {
    setHtmlScript(editorRef.current.getValue());
  }

  /**
   * MARKDOWN 코드 change 함수 (monaco editor)
   */
  function changeMarkdown() {
    setMarkdown(editorRef.current.getValue());
  }

  return (
    <White300Layout>
      <RegisterLayout>
        <WriteInform
          title={title}
          description={description}
          bigCategory={bigCategory}
          smallCategoryOption={smallCategoryOption}
          smallCategory={smallCategory}
          address={address}
          writedDomain={writedDomain}
          selectedDomain={selectedDomain}
          domain={domain}
          email={email}
          changeTitle={changeTitle}
          changeDescription={changeDescription}
          changeBigCategory={changeBigCategory}
          changeSmallCategory={changeSmallCategory}
          changeAddress={changeAddress}
          changeDomain={changeDomain}
          changeSelectedDomain={changeSelectedDomain}
        />
        <WriteCode
          editorRef={editorRef}
          htmlScript={htmlScript}
          markdown={markdown}
          changeHtmlScript={changeHtmlScript}
          changeMarkdown={changeMarkdown}
        />
        <UploadDoneBtn
          title={title}
          description={description}
          bigCategory={bigCategory}
          smallCategory={smallCategory}
          email={address}
          htmlScript={htmlScript}
          markdown={markdown}
        />
      </RegisterLayout>
    </White300Layout>
  );
}

export default Register;
