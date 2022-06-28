import styled from "styled-components";
import styles from "../components/styles";
import TabMenu from "../components/register/TabMenu";
import WriteInform from "../components/register/WriteInform";
import UploadDoneBtn from "../components/register/UploadDoneBtn";
import { useState, useRef } from "react";
import {
  OPTIONS_BIG_CATEGORY,
  OPTIONS_EMAIL_ADDRESS,
  OPTIONS_SMALL_CATEGORY,
} from "../components/register/CONSTANT";

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

function Register() {
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

  const editorRef = useRef(null);

  const [htmlScript, setHtmlScript] = useState("<!DOCTYPE html>");
  const [markdown, setMarkdown] = useState("### wirte detail!");

  function titleChange(event) {
    setTitle(event.target.value);
    console.log(event.target);
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

  function htmlScriptChange(event) {
    setHtmlScript(editorRef.current.getValue());
  }
  function markdownChange(event) {
    setMarkdown(editorRef.current.getValue());
  }

  return (
    <>
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
          <TabMenu
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
    </>
  );
}
export default Register;
