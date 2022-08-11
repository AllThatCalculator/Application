import styled from "styled-components";
import styles from "../components/styles";
import WriteCode from "../components/register/WriteCode";
import { WriteInform } from "../components/register/WriteInform";
import UploadDoneBtn from "../components/register/UploadDoneBtn";
import { useState, useEffect } from "react";
import { ContentLayout, White300Layout } from "../components/Layout";
import { CalculetCss } from "../components/register/CalculetString";
import axios from "axios";
import useInput from "../user-hooks/UseInput";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const title = useInput("");
  const description = useInput("");

  // 대분류 옵션
  const [mainOption, setMainOption] = useState(null);

  // 소분류 옵션
  const [subOption, setSubOption] = useState(null);

  const [categoryMain, setCategoryMain] = useState("");
  const [categorySub, setCategorySub] = useState("");
  // 대분류 종류에 맞는 소분류 옵션 배열
  const [categorySubOption, setCategorySubOption] = useState(null);

  const [categoryMainId, setCategoryMainId] = useState(null);
  const [categorySubId, setCategorySubId] = useState(null);

  const [srcCode, setSrcCode] = useState("<!DOCTYPE html>");
  const [manual, setManual] = useState("### write detail!");

  // atc-css 적용한 최종 srcCode
  const [finalSrcCode, setFinalSrcCode] = useState(null);

  // 사용자가 입력한 srcCode에 우리 코드 붙이기
  useEffect(
    () => setFinalSrcCode(`<style>${CalculetCss}</style>` + srcCode),
    [srcCode]
  );

  /**
   * 계산기 대분류 change 함수
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * - 해당하는 대분류에 속하는 소분류 옵션을 세팅
   * @param {*} event
   */
  function changeCategoryMain(event) {
    // 대분류 타겟 value 값
    const targetValue = Number(event.target.value);
    // 대분류 옵션 네임
    const main = mainOption[targetValue - 1].name;
    // 소분류 옵션 리스트
    const subOptionList = subOption[targetValue];

    setCategoryMain(main);
    setCategoryMainId(targetValue);
    setCategorySub(null);
    if (subOptionList.length) {
      setCategorySubOption(subOptionList);
    } else {
      setCategorySubOption(null);
    }
  }

  /**
   * 계산기 소분류 change 함수
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * @param {*} event
   */
  function changeCategorySub(event) {
    const targetValue = Number(event.target.value);
    if (categorySubOption) {
      const option = categorySubOption.filter((x) => x.value === targetValue);
      setCategorySub(option[0].name);
      setCategorySubId(targetValue);
    }
  }

  // 유저 정보
  const [userInfo, setUserInfo] = useState(null);

  /**
   * 사용자 정보 서버에 요청
   */
  async function loadUserInfo(userEmail) {
    try {
      await axios.get(`/users/${userEmail}`).then((response) => {
        setUserInfo(response.data.userInfo);
      });
    } catch (error) {
      // 404 페이지
    }
  }

  /**
   * 백엔드에서 사용자 정보 불러오는 함수
   */
  async function loadUserEmail() {
    try {
      await axios.get(`/users/me`).then((response) => {
        loadUserInfo(response.data.userEmail);
      });
    } catch (error) {
      navigate("/login");
    }
  }

  async function loadCategory() {
    try {
      await axios.get(`/calculets/category`).then((response) => {
        const mainOptionList = [];
        let subOptionList = [[]];
        const main = response.data.categoryMain;
        const sub = response.data.categorySub;

        for (let i = 0; i < main.length; i++) {
          mainOptionList.push({ value: main[i].id, name: main[i].main });
          subOptionList[i + 1] = new Array();
        }

        for (let i = 0; i < sub.length; i++) {
          subOptionList[sub[i].main_id].push({
            value: sub[i].id,
            name: sub[i].sub,
          });
        }

        setMainOption(mainOptionList);
        setSubOption(subOptionList);
      });
    } catch (error) {}
  }

  /**
   * 현재 로그인한 사용자 계정 가져오기
   */
  useEffect(() => {
    loadUserEmail();
    loadCategory();
  }, []);

  return (
    <White300Layout>
      <RegisterLayout>
        {userInfo !== null ? (
          <WriteInform
            title={title.value}
            description={description.value}
            mainOption={mainOption}
            categoryMain={categoryMain}
            categorySubOption={categorySubOption}
            categorySub={categorySub}
            profileImg={userInfo.profileImg}
            changeTitle={title.onChange}
            changeDescription={description.onChange}
            changeCategoryMain={changeCategoryMain}
            changeCategorySub={changeCategorySub}
          />
        ) : (
          <></>
        )}
        <WriteCode
          srcCode={srcCode}
          previewSrcCode={finalSrcCode}
          manual={manual}
          setSrcCode={setSrcCode}
          setManual={setManual}
        />
        {userInfo !== null ? (
          <UploadDoneBtn
            title={title.value}
            description={description.value}
            categoryMainId={categoryMainId}
            categorySubId={categorySubId}
            email={userInfo.email}
            srcCode={finalSrcCode}
            manual={manual}
          />
        ) : (
          <></>
        )}
      </RegisterLayout>
    </White300Layout>
  );
}

export default Register;
