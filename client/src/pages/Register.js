import WriteCode from "../components/organisms/register/WriteCode";
import WriteInform from "../components/organisms/register/WriteInform";
import { Box, Button, Grid, Tab, Tabs, Toolbar } from "@mui/material";
import { PageScreenBox } from "../components/organisms/common/PageScreenBox";
import Title from "../components/organisms/common/Title";
import PageScreenBottom, {
  RegisterPageScreenBottom,
} from "../components/organisms/common/PageScreenBottom";
import CheckIcon from "@mui/icons-material/Check";
import PreviewCalculet from "../components/organisms/register/PreviewCalculet";
import LoadingPage from "../components/organisms/common/LoadingPage";
import WriteUpdate from "../components/organisms/register/WriteUpdate";
import {
  SubHeader,
  SubHeaderBar,
} from "../components/organisms/header/SubHeader";
import { FlexBox, FlexColumnBox } from "../components/organisms/common/FlexBox";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import { MainButton } from "../components/organisms/common/Buttons";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useTabs from "../hooks/useTabs";
import { ID_SELECT_REGISTER_INFO } from "../constants/register";

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
  setManual,
  //
  userInfo,
  registerCalculet,
  //
  inputUpdate,
}) {
  const {
    values: { selectRegisterInfo },
    onChange: onChangeRegisterTabs,
  } = useTabs({
    // 정보 입력하기 | 계산기 만들기 | 설명 입력하기
    selectRegisterInfo: 0,
  });

  const tabRegisterInfoList = [
    {
      label: "정보 입력하기",
      isComplete: false,
      content: (
        <PageScreenBox
          // 계산기 정보 입력 | 배너 미리보기
          sx={{
            // display: isPreview ? "none" : "",
            py: 2,
          }}
        >
          <Toolbar /** Header가 있는 자리 */ />
          <Toolbar /** sub Header가 있는 자리 */ />
          <WriteInform
            title={title}
            description={description}
            categoryMainId={categoryMainId}
            categorySubId={categorySubId}
            onChangeInputs={onChangeInputs}
            onChangeCategoryMain={onChangeCategoryMain}
            onChangeCategorySub={onChangeCategorySub}
          />
        </PageScreenBox>
      ),
    },
    {
      label: "계산기 만들기",
      isComplete: true,
      content: <></>,
    },
    {
      label: "설명 입력하기",
      isComplete: true,
      content: <></>,
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
            <Button variant="outlined" startIcon={<PlayArrowOutlinedIcon />}>
              미리보기
            </Button>
            <MainButton
              variant="contained"
              // onClick={handleClickSubmitWrite}
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
      {tabRegisterInfoList.map((data, index) => {
        const { label, content } = data;

        return (
          <Grid
            container
            key={"register-info-id" + label}
            sx={{ backgroundColor: "white", py: 1.2 }}
          >
            {selectRegisterInfo === index && content}
          </Grid>
        );
      })}
      <RegisterPageScreenBottom />

      {/* <Grid container sx={{ backgroundColor: "white" }}>
        <PageScreenBox
          // 계산기 정보 입력 | 배너 미리보기
          gap="2.4rem"
          sx={{ display: isPreview ? "none" : "" }}
        >
          <Title content={`계산기 ${getRegisterPageTitle()}`} />
          {isLoading ? (
            <LoadingPage />
          ) : (
            <>
              <WriteInform
                title={title}
                description={description}
                categoryMainId={categoryMainId}
                categorySubId={categorySubId}
                onChangeInputs={onChangeInputs}
                onChangeCategoryMain={onChangeCategoryMain}
                onChangeCategorySub={onChangeCategorySub}
              />
              <WriteCode
                // 계산기 코드 입력
                srcCode={srcCode}
                manual={manual}
                setSrcCode={setSrcCode}
                setManual={setManual}
                handleIsPreview={handleIsPreview}
              />
              {isEditMode && (
                // 계산기 업데이트 내용
                <WriteUpdate value={inputUpdate} onChange={onChangeInputs} />
              )}
            </>
          )}
        </PageScreenBox>
        {isPreview && ( // {{ display:  "none" }} 대신, 입력한 소스코드에 따라 컴포넌트 업데이트 되도록
          <PageScreenBox
            // 미리보기
            gap="2.4rem"
            // sx={{ display:  "none" }}
          >
            <PreviewCalculet
              title={title}
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
          buttonText={`${getRegisterPageTitle()} 완료`}
          handleButton={registerCalculet}
          buttonIcon={<CheckIcon />}
        />
      </Box> */}
    </>
  );
}

export default Register;
