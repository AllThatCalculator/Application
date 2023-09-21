import { Box, Button, Dialog, Tab, Tabs, Toolbar, Zoom } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { RegisterPageScreenBottom } from "../components/organisms/common/PageScreenBottom";
import PreviewCalculet from "../components/organisms/register/PreviewCalculet";
import { PageScreenBox } from "../components/organisms/common/PageScreenBox";
import WriteManual from "../components/organisms/register/WriteManual";
import WriteInform from "../components/organisms/register/WriteInform";
import { SubHeader } from "../components/organisms/header/SubHeader";
import { MainButton } from "../components/organisms/common/Buttons";
import WriteCode from "../components/organisms/register/WriteCode";
import { FlexBox } from "../components/organisms/common/FlexBox";
import Title from "../components/organisms/common/Title";
import useTabs from "../hooks/useTabs";
import { ID_SELECT_REGISTER_INFO } from "../constants/register";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useState } from "react";
import UpdateLogDialog from "../components/organisms/register/UpdateLogDialog";
import {
  validateAllComponents,
  validateExistCalculetButton,
} from "../components/organisms/register-editor/validateComponentProperties";

// page layout (editor page, bottom button)
function PageLayout({
  children,
  isFull,
  isPreview = false,
  isFirstPage,
  isLastPage,
  setPage,
}) {
  const sx = { pt: 3, pb: 4 };
  const psbPx = { px: 8 };

  const childrenComponent = (
    <>
      <Toolbar /** Header가 있는 자리 */ />
      <Toolbar /** sub Header가 있는 자리 */ />
      {children}
    </>
  );

  function onClickLeftButton() {
    setPage((pre) => pre - 1);
  }
  function onClickRightButton() {
    setPage((pre) => pre + 1);
  }

  return (
    <>
      {isFull ? (
        <Box sx={{ ...sx }}>{childrenComponent}</Box>
      ) : (
        <PageScreenBox sx={{ ...sx, ...psbPx }}>
          {childrenComponent}
        </PageScreenBox>
      )}
      <RegisterPageScreenBottom
        isBottom={isFull}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        onClickLeftButton={onClickLeftButton}
        onClickRightButton={onClickRightButton}
        helpText={`${
          isPreview
            ? "계산기 수정은 편집하기 모드에서 이어 할 수 있습니다."
            : ""
        }`}
      />
    </>
  );
}

/**
 * 계산기 등록 페이지 컴포넌트
 * - 여러 컴포넌트에서 관리하는 state들을 관리
 */
function Register({
  isEditMode,
  // isLoading,
  registerPageTitle,
  isPreview,
  handleIsPreview,
  //
  title,
  description,
  categoryMainId,
  categorySubId,
  onChangeInputs,
  onChangeCategoryMain,
  onChangeCategorySub,
  type,
  //
  srcCode,
  // userEditorComp,
  // changeUserEditorComp,
  // onClickClearUserEditorComp,
  //
  manual,
  onChangeManual,
  //
  userInfo,
  registerCalculet,
  //
  updateLog,
}) {
  // 0: 정보 입력하기 | 1: 계산기 만들기 | 2: 설명 입력하기
  const [selectRegisterInfo, setRegisterTabs] = useState(0);
  function onChangeRegisterTabs(event, newValue) {
    setRegisterTabs(newValue);
  }
  // tab : 정보 입력하기 | 계산기 만들기 | 설명 입력하기
  const tabRegisterInfoList = [
    {
      label: "정보 입력하기", // label
      isComplete: isCompleteInputInfo(), // 입력 완료 여부
      content: (
        // 해당 컴포넌트
        <WriteInform
          title={title}
          description={description}
          categoryMainId={categoryMainId}
          categorySubId={categorySubId}
          onChangeInputs={onChangeInputs}
          onChangeCategoryMain={onChangeCategoryMain}
          onChangeCategorySub={onChangeCategorySub}
        />
      ),
    },
    {
      label: "계산기 만들기",
      isComplete: isCompleteInputSrcCode(),
      content: (
        <DndProvider backend={HTML5Backend}>
          <WriteCode />
        </DndProvider>
      ),
      isFull: true, // 페이지 레이아웃 full 여부
    },
    {
      label: "설명 입력하기",
      isComplete: isCompleteInputManual(),
      content: <WriteManual data={manual} onChange={onChangeManual} />,
    },
  ];

  // 입력 검사) 정보 입력하기
  function isCompleteInputInfo() {
    return !(
      title.length === 0 ||
      description.length === 0 ||
      categoryMainId.length === 0 ||
      categorySubId.length === 0
    );
  }

  // 입력 검사) 계산기 만들기
  function isCompleteInputSrcCode() {
    // 사용자 함수 입력했는지 확인
    const userFunctionLen = !!srcCode.userFunction
      ? Object.keys(srcCode.userFunction).length
      : 0;
    if (userFunctionLen === 0) {
      return false;
    }

    // 컴포넌트 조합했는지 확인, 편집창에 있는 컴포넌트 개수와 저장되어 있는 컴포넌트 개수 맞는지 비교
    const componentCnt = !!srcCode.components
      ? Object.keys(srcCode.components).length
      : 0;
    const layoutCnt = !!srcCode.layout ? srcCode.layout.length : 0;
    if (componentCnt === 0 || layoutCnt === 0 || componentCnt !== layoutCnt) {
      return false;
    }
    //  속성 입력 했는지 확인
    if (!validateAllComponents(srcCode.components)) {
      return false;
    }

    // 중복된 변수명 있는지 확인
    // ...
    // validateDuplicatedId

    // 계산하기 버튼 있는지 확인
    if (!validateExistCalculetButton(srcCode.components)) {
      return false;
    }

    return true;
  }

  // 입력 검사) 설명 입력하기
  function isCompleteInputManual() {
    return !(manual.length === 0);
  }

  /**
   * {bool} modalOpen 업데이트 로그 작성 모달창
   */
  const [modalOpen, setModalOpen] = useState(false);
  function onModalOpen() {
    setModalOpen(true);
  }

  /** 입력 완료 여부 */
  function isComplete() {
    return (
      isCompleteInputInfo() &&
      isCompleteInputSrcCode() &&
      isCompleteInputManual()
    );
  }

  return (
    <>
      <SubHeader>
        <FlexBox
          sx={{
            width: 1,
            gap: 2,
            px: 8,
            py: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title content={`계산기 ${registerPageTitle}`} />
          <Tabs
            value={selectRegisterInfo}
            onChange={onChangeRegisterTabs}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ visibility: isPreview ? "hidden" : "visible" }}
          >
            {tabRegisterInfoList.map((data) => {
              const { label, isComplete } = data;
              return (
                <Tab
                  id={ID_SELECT_REGISTER_INFO}
                  key={label}
                  label={label}
                  icon={
                    isComplete ? (
                      <Zoom in={isComplete}>
                        <CheckCircleIcon />
                      </Zoom>
                    ) : (
                      <CheckCircleOutlineOutlinedIcon sx={{ opacity: 0.2 }} />
                    )
                  }
                  iconPosition="end"
                />
              );
            })}
          </Tabs>
          <FlexBox gap={1.2} sx={{ alignItems: "center" }}>
            <Button
              variant="outlined"
              startIcon={
                isPreview ? <EditOutlinedIcon /> : <PlayArrowOutlinedIcon />
              }
              onClick={handleIsPreview}
            >
              {isPreview ? "편집하기" : "미리보기"}
            </Button>
            <MainButton
              variant="contained"
              sx={{ py: 0.6 }}
              onClick={isEditMode ? onModalOpen : registerCalculet}
              disabled={!isComplete()}
            >
              {`${registerPageTitle} 완료`}
            </MainButton>
          </FlexBox>
        </FlexBox>
      </SubHeader>
      <Box sx={{ flexGrow: 1, bgcolor: "white" }}>
        {/* {isWindowSmDown && (
          <Alert severity="warning" sx={{ m: "1.2rem 0.8rem" }}>
            스크린 크기를 키워주세요.
          </Alert>
        )} */}
        {
          // !isWindowSmDown &&
          !isPreview &&
            tabRegisterInfoList.map((data, index) => {
              const { label, content, isFull } = data;

              return (
                <Box key={"register-info-id" + label} sx={{ flexGrow: 1 }}>
                  {selectRegisterInfo === index && (
                    <PageLayout
                      isFull={isFull}
                      setPage={setRegisterTabs}
                      isFirstPage={selectRegisterInfo === 0}
                      isLastPage={
                        selectRegisterInfo === tabRegisterInfoList.length - 1
                      }
                    >
                      {content}
                    </PageLayout>
                  )}
                </Box>
              );
            })
        }
        {isPreview && ( // {{ display:  "none" }} 대신, 입력한 소스코드에 따라 컴포넌트 업데이트 되도록 함.
          <PageLayout isPreview>
            <PreviewCalculet
              title={title}
              userName={userInfo.userName}
              profileImgSrc={userInfo.profileImgSrc}
              srcCode={srcCode}
              manual={manual}
              handleIsPreview={handleIsPreview}
              type={type}
              isPreview
            />
          </PageLayout>
        )}
        <UpdateLogDialog
          open={modalOpen}
          setOpen={setModalOpen}
          updateLog={updateLog}
          onChangeInputs={onChangeInputs}
          onClick={registerCalculet}
        />
      </Box>
    </>
  );
}

export default Register;
