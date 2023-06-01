import WriteCode from "../components/register/WriteCode";
import WriteInform from "../components/register/WriteInform";
import { Box, Grid } from "@mui/material";
import { PageScreenBox } from "../components/global-components/PageScreenBox";
import Title from "../components/global-components/Title";
import PageScreenBottom from "../components/global-components/PageScreenBottom";
import CheckIcon from "@mui/icons-material/Check";
import PreviewCalculet from "../components/register/PreviewCalculet";
import LoadingPage from "../components/global-components/LoadingPage";
import WriteUpdate from "../components/register/WriteUpdate";

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
  return (
    <>
      <Grid container sx={{ backgroundColor: "white" }}>
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
      </Box>
    </>
  );
}

export default Register;
