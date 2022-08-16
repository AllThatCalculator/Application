import styled from "styled-components";
import styles from "../components/styles";
import WriteCode from "../components/register/WriteCode";
import { WriteInform } from "../components/register/WriteInform";
import UploadDoneBtn from "../components/register/UploadDoneBtn";
import { useState, useEffect } from "react";
import { ContentLayout, White300Layout } from "../components/Layout";
import useInput from "../user-hooks/UseInput";
import { useNavigate } from "react-router-dom";
import loadUserInfo from "../user-actions/userInfo";
import calculetCategory from "../user-actions/calculetCategory";
import AuthUser from "../user-actions/AuthUser";

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
    const main = mainOption[targetValue].name;
    // 소분류 옵션 리스트
    const subOptionList = subOption[targetValue];

    setCategoryMain(main);
    setCategoryMainId(targetValue);
    setCategorySub(null);
    setCategorySubId(null);
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
  function requestUserInfo(userEmail) {
    const request = loadUserInfo(userEmail);
    request.then((res) => {
      setUserInfo(res);
    });
  }

  /**
   * 백엔드에서 사용자 정보 불러오는 함수
   */
  function loadUserEmail() {
    const request = AuthUser();
    request.then((res) => {
      if (res.success) {
        requestUserInfo(res.userEmail);
      } else {
        navigate("/login");
      }
    });
  }

  /**
   * 카테고리 서버에 요청 후, 데이터 가공
   */
  function loadCategory() {
    const request = calculetCategory();
    request.then((res) => {
      const mainOptionList = [];
      let subOptionList = [[]];
      const main = res.main;
      const sub = res.sub;

      for (let i = 0; i < main.length; i++) {
        mainOptionList.push({ value: main[i].id, name: main[i].main });
        subOptionList[i + 1] = [{ value: sub[0].id, name: sub[0].sub }];
      }

      for (let i = 0; i < sub.length - 1; i++) {
        subOptionList[sub[i].main_id].push({
          value: sub[i].id,
          name: sub[i].sub,
        });
      }

      // 대분류마다 기타 소분류 추가
      for (let i = 0; i < main.length; i++) {
        subOptionList[i].push({
          value: sub[sub.length - 1].id,
          name: sub[sub.length - 1].sub,
        });
      }

      setMainOption(mainOptionList);
      setSubOption(subOptionList);
    });
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
        {userInfo && (
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
        )}
        <WriteCode
          srcCode={srcCode}
          manual={manual}
          setSrcCode={setSrcCode}
          setManual={setManual}
        />
        {userInfo && (
          <UploadDoneBtn
            title={title.value}
            description={description.value}
            categoryMainId={categoryMainId}
            categorySubId={categorySubId}
            srcCode={srcCode}
            manual={manual}
          />
        )}
      </RegisterLayout>
    </White300Layout>
  );
}

export default Register;
