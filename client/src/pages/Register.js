import { Alert, Box, Button, Tab, Tabs, Toolbar } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { RegisterPageScreenBottom } from "../components/organisms/common/PageScreenBottom";
import { PageScreenBox } from "../components/organisms/common/PageScreenBox";
import WriteManual from "../components/organisms/register/WriteManual";
import WriteInform from "../components/organisms/register/WriteInform";
import { SubHeader } from "../components/organisms/header/SubHeader";
import { MainButton } from "../components/organisms/common/Buttons";
import WriteCode from "../components/organisms/register/WriteCode";
import { FlexBox } from "../components/organisms/common/FlexBox";
import Title from "../components/organisms/common/Title";
import useTabs from "../hooks/useTabs";
import useSx from "../hooks/useSx";
import { ID_SELECT_REGISTER_INFO } from "../constants/register";
import PreviewCalculet from "../components/organisms/register/PreviewCalculet";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// page layout
function PageLayout({ children, isFull }) {
  const sx = { pt: 3, px: 8, pb: 4 };

  const childrenComponent = (
    <>
      <Toolbar /** Header가 있는 자리 */ />
      <Toolbar /** sub Header가 있는 자리 */ />
      {children}
    </>
  );

  return (
    <>
      {isFull ? (
        <Box sx={{ ...sx }}>{childrenComponent}</Box>
      ) : (
        <PageScreenBox sx={{ ...sx }}>{childrenComponent}</PageScreenBox>
      )}
    </>
  );
}

/**
 * 계산기 등록 페이지 컴포넌트
 * - 여러 컴포넌트에서 관리하는 state들을 관리
 */
function Register({
  isEditMode,
  isLoading,
  getRegisterPageTitle,
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
  //
  srcCode,
  manual,
  setSrcCode,
  onChangeManual,
  //
  userInfo,
  registerCalculet,
  //
  inputUpdate,
}) {
  const { isWindowSmDown } = useSx();

  const {
    values: { selectRegisterInfo },
    onChange: onChangeRegisterTabs,
  } = useTabs({
    // 정보 입력하기 | 계산기 만들기 | 설명 입력하기
    selectRegisterInfo: 0,
  });

  // tab : 정보 입력하기 | 계산기 만들기 | 설명 입력하기
  const tabRegisterInfoList = [
    {
      label: "정보 입력하기", // label
      isComplete: false, // 입력 완료 여부
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
      isComplete: true,
      content: <WriteCode srcCode={srcCode} setSrcCode={setSrcCode} />,
      isFull: true, // 페이지 레이아웃 full 여부
    },
    {
      label: "설명 입력하기",
      isComplete: true,
      content: <WriteManual data={manual} onChange={onChangeManual} />,
    },
  ];

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
          <Title content={`계산기 ${getRegisterPageTitle()}`} />
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
                      <CheckCircleIcon />
                    ) : (
                      <CheckCircleOutlineOutlinedIcon />
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
              onClick={registerCalculet}
            >
              저작 완료
            </MainButton>
          </FlexBox>
          {/* <FlexBox gap="1.2rem" sx={{ alignItems: "center" }}>
              {!previewResultQuizState ? (
                <Tooltip title="미리 보기">
                  <div>
                    <OutlinedIconButton onClick={onClickPreview}>
                      <VisibilityIcon />
                    </OutlinedIconButton>
                  </div>
                </Tooltip>
              ) : (
                <Tooltip title="편집 하기">
                  <div>
                    <OutlinedIconButton onClick={onClickEdit}>
                      <EditIcon />
                    </OutlinedIconButton>
                  </div>
                </Tooltip>
              )}
              <Tooltip title={`${writeQuizPageTitle} 완료`}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleClickSubmitWrite}
                    disabled={!isCanSubmit}
                  >
                    {`${writeQuizPageTitle} 완료`}
                  </Button>
                </div>
              </Tooltip>
            </FlexBox> */}
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
                    <PageLayout isFull={isFull}>{content}</PageLayout>
                  )}
                </Box>
              );
            })
        }
        {isPreview && ( // {{ display:  "none" }} 대신, 입력한 소스코드에 따라 컴포넌트 업데이트 되도록
          <PageLayout>
            <PreviewCalculet
              title={title}
              userName={userInfo.userName}
              profileImgSrc={userInfo.profileImgSrc}
              srcCode={srcCode}
              manual={manual}
              handleIsPreview={handleIsPreview}
              isPreview={isPreview}
            />
          </PageLayout>
        )}
      </Box>
      <RegisterPageScreenBottom
        onClickLeftButton={() => {}}
        onClickRightButton={() => {}}
      />
    </>
  );
}

export default Register;
