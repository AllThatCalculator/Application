import { useDispatch, useSelector } from "react-redux";
import usePage from "../hooks/usePage";
import useSnackbar from "../hooks/useSnackbar";
import Register from "../pages/Register";
import { useCallback, useEffect, useState } from "react";
import {
  changeCategoryMain,
  changeCategorySub,
} from "../utils/changeCategorySelect";
import useInputs from "../hooks/useInputs";
import useSelects from "../hooks/useSelects";
import {
  ID_INPUT_TITLE,
  ID_INPUT_DESCRIPTION,
  ID_INPUT_CATEGORY_MAIN_ID,
  ID_INPUT_CATEGORY_SUB_ID,
  DEFAULT_VALUE_INPUT_SRC_CODE,
} from "../constants/register";
import useGetUrlParam from "../hooks/useGetUrlParam";
import {
  handleEditMyCalculet,
  handleGetMyCalculet,
  handlePostCalculet,
} from "../utils/handleUserActions";
import { ID_MAIN_CONVERTER } from "../constants/calculetList";
import useInput from "../hooks/useInput";
import { v4 as uuidv4 } from "uuid";
import {
  onAppendNewComponent,
  onUpdateUserComponent,
  onUpdateUserFunction,
} from "../modules/calculetEditor";
import {
  validateAllComponents,
  validateOneComponent,
} from "../components/organisms/register-editor/validateComponentProperties";

/**
 * 수정 페이지에서 useEffect로 calculet을 가져올 때 리렌더링 현상이 심함
 * -> cnt를 정해서 1번만 불러오도록 하기 위해 변수 선언
 */
let isloadedCalculet = false;

function RegisterContainer() {
  const { loginPage, myCalculetPage } = usePage();
  const { openSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  /**
   * 현재 url에서 저작한 계산기 id 뽑아 내기 => 계산기 저작 || 수정 구분을 위해
   */
  const { id, blockedUrlId } = useGetUrlParam();

  // 수정 하기 모드인지
  const isEditMode = id !== undefined;

  // 저작 or 수정 페이지 제목
  const registerPageTitle = isEditMode ? "수정" : "저작";

  const {
    idToken,
    userInfo,
    components: userEditorComp,
  } = useSelector((state) => ({
    idToken: state.userInfo.idToken,
    userInfo: state.userInfo,
    // components
    components: state.calculetEditor,
    // layout
  }));

  // console.log("userEditorComp >>", userEditorComp);
  // 계산기 수정에서 보낼 type
  const [calculetType, setCalceultType] = useState(1);

  // inputs handle
  const {
    values: { inputTitle, inputDescription, inputUpdateLog },
    onChange: onChangeRegisterInputs,
    onSetValues: onSetRegisterInputs,
  } = useInputs({
    inputTitle: "",
    inputDescription: "",
    inputUpdateLog: "", // 업데이트 내용
  });

  const {
    values: { inputCategoryMainId, inputCategorySubId },
    onSetValue: setRegisterSelect,
    onSetValues: setRegisterSelects,
  } = useSelects({
    inputCategoryMainId: "",
    inputCategorySubId: "",
  });

  // 계산기 만들기
  // type 0
  const [srcCode, setSrcCode] = useState(DEFAULT_VALUE_INPUT_SRC_CODE);
  // type 1
  // redux) 계산 함수 입력 초기화 이벤트
  function onInitUserFunction(value) {
    dispatch(onUpdateUserComponent(value));
  }

  // 설명 입력하기
  const [manual, setManual] = useState("");
  // set manual CKEditor
  function onChangeManual(event, editor) {
    const data = editor.getData();
    setManual(data);
  }

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

  // 속성이 유효한지 확인하는 함수
  // const invalidComponentOption = useCallback(() => {
  //   for (const key in userEditorComp) {
  //     console.log(
  //       userEditorComp[key].id,
  //       validateOneComponent(userEditorComp, userEditorComp[key])
  //     );
  //   }
  //   console.log("all", validateAllComponents(userEditorComp));
  // }, [userEditorComp]);

  // 계산기 등록
  async function registerCalculet() {
    if (!idToken) {
      loginPage();
      return;
    }
    // inputs check
    if (
      !inputTitle ||
      !inputDescription ||
      !inputCategoryMainId ||
      (inputCategorySubId !== Number(ID_MAIN_CONVERTER) &&
        !inputCategorySubId) ||
      (isEditMode && !inputUpdateLog) ||
      !validateAllComponents(userEditorComp.components)
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
      srcCode: JSON.stringify(userEditorComp),
      manual: manual,
      description: inputDescription,
      categoryMainId: inputCategoryMainId,
      categorySubId: inputCategorySubId,
      type: calculetType,
    };

    let response = false;
    //-------------- (1) 저작하기 ----------------
    if (!isEditMode) {
      response = await handlePostCalculet(idToken, body);
    }
    //-------------- (2) 수정하기 ----------------
    else {
      body = {
        updateMessage: inputUpdateLog,
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
          isEditMode ? "수정" : "임시 등록"
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
          isEditMode ? "수정" : "임시 등록"
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
  const getMyCalculetWithId = useCallback(async () => {
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
    await setCalceultType(type);

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
    if (type === 0) {
      await setSrcCode(srcCode);
    } else if (type === 1) {
      const srcCodeObj = JSON.parse(srcCode);
      await onInitUserFunction({
        components: srcCodeObj.components,
        layout: srcCodeObj.layout,
        userFunction: srcCodeObj.userFunction,
      });
    }

    // 계산기 설명
    await setManual(manual);

    await setIsLoading(false);
  }, [blockedUrlId, id, idToken, onSetRegisterInputs, setRegisterSelects]);

  useEffect(() => {
    if (id !== undefined && !isloadedCalculet) {
      // Id 있으면 수정, 없으면 등록
      getMyCalculetWithId();
      isloadedCalculet = true;
    }
  }, [id, getMyCalculetWithId]);

  // type 에 따른 소스코드
  const typeSrcCode =
    calculetType === 0 ? srcCode : calculetType === 1 ? userEditorComp : "";

  return (
    <>
      {((isEditMode && !isLoading) || !isEditMode) && (
        <Register
          isEditMode={isEditMode}
          // isLoading={isEditMode ? isLoading : false}
          registerPageTitle={registerPageTitle}
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
          type={calculetType}
          //
          srcCode={typeSrcCode}
          manual={manual}
          onChangeManual={onChangeManual}
          //
          userInfo={userInfo}
          registerCalculet={registerCalculet}
          //
          updateLog={inputUpdateLog}
        />
      )}
    </>
  );
}
export default RegisterContainer;
