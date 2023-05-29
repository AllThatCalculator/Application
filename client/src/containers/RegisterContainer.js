import { useSelector } from "react-redux";
import usePage from "../hooks/usePage";
import useSnackbar from "../hooks/useSnackbar";
import Register from "../pages/Register";
import useInput from "../hooks/useInput";
import { useEffect, useState } from "react";
import {
  changeCategoryMain,
  changeCategorySub,
} from "../utils/changeCategorySelect";
import postRegisterCalculetTemp from "../user-actions/calculets/postRegisterCalculetTemp";
import useInputs from "../hooks/useInputs";
import useSelects from "../hooks/useSelects";
import {
  ID_INPUT_TITLE,
  ID_INPUT_DESCRIPTION,
  ID_INPUT_CATEGORY_MAIN_ID,
  ID_INPUT_CATEGORY_SUB_ID,
  ID_INPUT_SRC_CODE,
  ID_INPUT_MANUAL,
} from "../constants/register";
import useGetUrlParam from "../hooks/useGetUrlParam";
import {
  handleEditMyCalculet,
  handleGetMyCalculet,
  handlePostCalculet,
} from "../utils/handleUserActions";

function RegisterContainer() {
  const { loginPage, calculetPage, myCalculetPage } = usePage();
  const { openSnackbar } = useSnackbar();

  /**
   * 현재 url에서 저작한 계산기 id 뽑아 내기 => 계산기 저작 || 수정 구분을 위해
   */
  const { id, blockedUrlId } = useGetUrlParam();
  function isEditMode() {
    // 수정 하기 모드인지
    return id !== undefined;
  }
  function getRegisterPageTitle() {
    // 저작 or 수정 페이지 제목
    return isEditMode() ? "수정" : "저작";
  }

  const { idToken, userInfo } = useSelector((state) => ({
    idToken: state.userInfo.idToken,
    userInfo: state.userInfo,
  }));

  // 계산기 수정에서 보낼 type
  const [calculetType, setCalceultType] = useState(null);

  // inputs handle
  const {
    values: registerInputs,
    onChange: onChangeRegisterInputs,
    onSetValues: onSetRegisterInputs,
  } = useInputs({
    inputTitle: "",
    inputDescription: "",
    inputUpdate: "", // 업데이트 내용
  });
  const { inputTitle, inputDescription, inputUpdate } = registerInputs;

  const {
    values: registerSelects,
    onChange: onChangeRegisterSelects,
    onSetValue: setRegisterSelect,
    onSetValues: setRegisterSelects,
  } = useSelects({
    inputCategoryMainId: "",
    inputCategorySubId: "",
  });
  const { inputCategoryMainId, inputCategorySubId } = registerSelects;

  const [srcCode, setSrcCode] = useState(
    `<!DOCTYPE html>\n<html lang="ko">\n<head>\n  <meta charset="UTF-8">\n  <title>계산기 이름</title>\n</head>\n<body>\n  <h1>본인이 구현한 계산기 코드를 작성해주세요.</h1>\n  <input id="input" type="text" class="atc-input atc-calculet-input" atcDesc="입력" value="입력 예시"/>\n  <div id="output" class="atc-output atc-calculet-output" atcDesc="결과">결과 예시</div>\n  <button id="button" class="atc-button">버튼 예시</button>\n</body>\n</html>`
  );

  // const [srcCode, setSrcCode] = useState(`<!DOCTYPE html>`);
  const [manual, setManual] = useState(
    "# 계산기 이름\n본인이 구현한 계산기에 대한 설명을 작성해주세요."
  );

  function handleChangeCategoryMain(event) {
    // 대분류 타겟 value 값
    let value = event.target.value;
    changeCategoryMain(value, setRegisterSelects);
  }
  function handleChangeCategorySub(event) {
    // 소분류 타겟 value 값
    let value = event.target.value;
    changeCategorySub(value, setRegisterSelect);
  }

  // 미리보기 활성화
  const [isPreview, setPreview] = useState(false);
  function handleIsPreview() {
    setPreview((prev) => !prev);
  }

  async function registerCalculet() {
    if (!idToken) {
      loginPage();
      return;
    }

    if (
      !inputTitle ||
      !inputDescription ||
      !inputCategoryMainId ||
      !inputCategorySubId ||
      (isEditMode() && !inputUpdate)
    ) {
      openSnackbar(
        "error",
        "모든 사항을 입력해주세요.",
        true,
        "top",
        "center",
        2400 // 지속시간
      );
      return;
    }

    let body = {
      title: inputTitle,
      srcCode: srcCode,
      manual: manual,
      description: inputDescription,
      categoryMainId: inputCategoryMainId,
      categorySubId: inputCategorySubId,
    };

    let response = false;
    //-------------- (1) 저작하기 ----------------
    if (!isEditMode()) {
      response = await handlePostCalculet(idToken, body);
    }
    //-------------- (2) 수정하기 ----------------
    else {
      body = {
        updateMessage: inputUpdate,
        calculetInfo: {
          id: id,
          type: calculetType,
          blocked: Number(blockedUrlId),
          ...body,
        },
      };
      response = await handleEditMyCalculet(idToken, body);
    }

    if (response) {
      // 안내 팝업창
      myCalculetPage();
      // console.log("성공!");
      openSnackbar(
        "success",
        `성공적으로 ${
          isEditMode() ? "수정" : "임시 등록"
        }되었습니다. 공개 여부는 마이 계산기에서 확인할 수 있습니다.`,
        true,
        "top",
        "center",
        2400 // 지속시간
      );
    } else {
      // 실패 팝업 처리
      openSnackbar(
        "error",
        `계산기 ${
          isEditMode() ? "수정" : "임시 등록"
        }에 실패했습니다. 다시 시도해 주세요.`,
        true,
        "top",
        "center",
        2400 // 지속시간
      );
    }
  }

  //-------------- (2) 수정하기 : id를 통해 calculet info 받아오고 값 채워넣기 ----------------
  const [isLoading, setIsLoading] = useState(true);
  async function getMyCalculetWithId() {
    await setIsLoading(true);
    /** get param */
    let params = {
      calculetId: id,
    };
    let body = {
      blocked: Number(blockedUrlId),
    };
    const response = await handleGetMyCalculet(idToken, params, body);
    const {
      title,
      description,
      categoryMainId,
      categorySubId,
      srcCode,
      manual,
      type,
    } = response;

    // type
    setCalceultType(type);

    // 이름, 요약 설명
    await onSetRegisterInputs([
      { id: ID_INPUT_TITLE, value: title },
      { id: ID_INPUT_DESCRIPTION, value: description },
    ]);

    // 대분류, 소분류
    await setRegisterSelects([
      { name: ID_INPUT_CATEGORY_MAIN_ID, value: categoryMainId },
      { name: ID_INPUT_CATEGORY_SUB_ID, value: categorySubId },
    ]);

    // 계산기 코드
    await setSrcCode(srcCode);
    // 계산기 설명
    await setManual(manual);

    await setIsLoading(false);
  }
  useEffect(() => {
    // quizId 있으면 update, 없으면 write
    if (isEditMode()) {
      getMyCalculetWithId();
    }
  }, [id]);

  return (
    <Register
      isEditMode={isEditMode()}
      isLoading={isEditMode() ? isLoading : false}
      getRegisterPageTitle={getRegisterPageTitle}
      //
      isPreview={isPreview}
      handleIsPreview={handleIsPreview}
      //
      title={inputTitle}
      description={inputDescription}
      categoryMainId={inputCategoryMainId}
      categorySubId={inputCategorySubId}
      onChangeInputs={onChangeRegisterInputs}
      onChangeCategoryMain={handleChangeCategoryMain}
      onChangeCategorySub={handleChangeCategorySub}
      //
      srcCode={srcCode}
      manual={manual}
      setSrcCode={setSrcCode}
      setManual={setManual}
      //
      userInfo={userInfo}
      registerCalculet={registerCalculet}
      //
      inputUpdate={inputUpdate}
    />
  );
}
export default RegisterContainer;
