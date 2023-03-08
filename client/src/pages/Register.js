import WriteCode from "../components/register/WriteCode";
import WriteInform from "../components/register/WriteInform";
import { useState } from "react";
import useInput from "../hooks/useInput";
import { Box, Grid } from "@mui/material";
import { PageScreenBox } from "../components/global-components/PageScreenBox";
import Title from "../components/global-components/Title";
import PageScreenBottom from "../components/global-components/PageScreenBottom";
import CheckIcon from "@mui/icons-material/Check";
import postRegisterCalculetTemp from "../user-actions/postRegisterCalculetTemp";
import usePage from "../hooks/usePage";
import PreviewCalculet from "../components/register/PreviewCalculet";
import { useSelector } from "react-redux";
import useSnackbar from "../hooks/useSnackbar";

/**
 * 계산기 등록 페이지 컴포넌트
 * - 여러 컴포넌트에서 관리하는 state들을 관리
 */
function Register() {
  const { loginPage, calculetPage } = usePage();
  const { openSnackbar } = useSnackbar();

  const { idToken, userInfo } = useSelector((state) => ({
    idToken: state.userInfo.idToken,
    userInfo: state.userInfo,
  }));

  const title = useInput("");
  // markdown
  const description = useInput("");

  // 선택된 대분류, 소분류 id
  const [categoryMainId, setCategoryMainId] = useState("");
  const [categorySubId, setCategorySubId] = useState("");

  const [srcCode, setSrcCode] = useState(
    `<!DOCTYPE html>\n<html lang="ko">\n<head>\n  <meta charset="UTF-8">\n  <title>계산기 이름</title>\n</head>\n<body>\n  <h1>본인이 구현한 계산기 코드를 작성해주세요.</h1>\n  <input id="input" type="text" class="atc-input atc-calculet-input" atcDesc="입력" value="입력 예시"/>\n  <div id="output" class="atc-output atc-calculet-output" atcDesc="결과">결과 예시</div>\n  <button id="button" class="atc-button">버튼 예시</button>\n</body>\n</html>`
  );

  // const [srcCode, setSrcCode] = useState(`<!DOCTYPE html>`);
  const [manual, setManual] = useState(
    "# 계산기 이름\n본인이 구현한 계산기에 대한 설명을 작성해주세요."
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
    setCategoryMainId(targetValue);
    setCategorySubId(""); // 초기화
  }

  /**
   * 계산기 소분류 change 함수
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * @param {*} event
   */
  function changeCategorySub(event) {
    const targetValue = Number(event.target.value);
    setCategorySubId(targetValue);
  }

  // 미리보기 활성화
  const [isPreview, setPreview] = useState(false);
  function handleIsPreview() {
    setPreview((prev) => !prev);
  }

  /**
   * 계산기 등록
   */
  function registerCalculet() {
    if (!idToken) {
      loginPage();
      return;
    }

    if (
      !title.value ||
      !description.value ||
      !categoryMainId ||
      !categorySubId
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
      title: title.value,
      srcCode: srcCode,
      manual: manual,
      description: description.value,
      categoryMainId: categoryMainId,
      categorySubId: categorySubId,
    };

    const request = postRegisterCalculetTemp(body, idToken);
    request.then((res) => {
      // console.log(res);
      if (res === "/") {
        // 안내 팝업창
        calculetPage();
        // console.log("성공!");
        openSnackbar(
          "success",
          "성공적으로 임시 등록되었습니다.",
          true,
          "top",
          "center",
          2400 // 지속시간
        );
      } else {
        // 실패 팝업 처리
        openSnackbar(
          "error",
          "계산기 등록에 실패했습니다. 다시 시도해 주세요.",
          true,
          "top",
          "center",
          2400 // 지속시간
        );
      }
    });
  }

  return (
    <>
      <Grid container sx={{ backgroundColor: "white" }}>
        <PageScreenBox
          // 계산기 정보 입력 | 배너 미리보기
          gap="2.4rem"
          sx={{ display: isPreview ? "none" : "" }}
        >
          <Title content="계산기 저작" />
          <WriteInform
            title={title.value}
            description={description.value}
            categoryMainId={categoryMainId}
            categorySubId={categorySubId}
            changeTitle={title.onChange}
            changeDescription={description.onChange}
            changeCategoryMain={changeCategoryMain}
            changeCategorySub={changeCategorySub}
          />
          <WriteCode
            // 계산기 코드 입력
            srcCode={srcCode}
            manual={manual}
            setSrcCode={setSrcCode}
            setManual={setManual}
            handleIsPreview={handleIsPreview}
          />
        </PageScreenBox>
        {isPreview && (
          <PageScreenBox
            // 미리보기
            gap="2.4rem"
            // sx={{ display:  "none" }}
          >
            <PreviewCalculet
              title={title.value}
              userName={userInfo.userName}
              profileImgSrc={userInfo.profileImgSrc}
              srcCode={srcCode}
              manual={manual}
              handleIsPreview={handleIsPreview}
              isPreview={isPreview}
            />
          </PageScreenBox>
        )}
      </Grid>
      <Box sx={{ pb: "24rem" }}>
        <PageScreenBottom
          helpText="계산기를 등록하세요!"
          buttonText="계산기 등록"
          handleButton={registerCalculet}
          buttonIcon={<CheckIcon />}
        />
      </Box>
    </>
  );
}

export default Register;
