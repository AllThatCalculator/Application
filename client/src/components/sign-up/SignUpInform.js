import {
  OPTIONS_SEX,
  OPTIONS_YEAR,
  OPTIONS_MONTH,
  OPTIONS_DATE,
  USERNAME_LIMIT,
  JOB_LIMIT,
  BIO_LIMIT,
} from "./constants";
import {
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FlexBox, FlexColumnBox } from "../global-components/FlexBox";
import ProfileChange from "./ProfileChange";

/**
 * 회원가입 페이지
 */
function SignUpInform({
  profileImg,
  setProfileImg,
  isOpenProfileImgPopUp,
  setIsOpenProfileImgPopUp,

  errorType,
  keyErrorUserName,
  keyErrorBirthdate,
  keyErrorJob,
  authError,

  inputUserName,
  inputSex,
  inputYear,
  inputMonth,
  inputDate,
  inputJob,
  inputBio,
  setSignUpInputs,
  setSignUpSelects,

  idInputUserName,
  idInputSex,
  idInputYear,
  idInputMonth,
  idInputDate,
  idInputJob,
  idInputBio,
}) {
  return (
    <Card variant="outlined">
      <CardContent>
        <FlexColumnBox gap="1.6rem" sx={{ mb: "1.2rem" }}>
          <Typography variant="subtitle1" color="text.disabled">
            아래 내용을 작성해 주세요.
          </Typography>

          <FlexColumnBox gap="1.6rem">
            <FlexBox
              // 프로필 사진
              sx={{
                width: "100%",
                justifyContent: "center",
              }}
            >
              <ProfileChange
                profileImg={profileImg}
                setProfileImg={setProfileImg}
                isPopUpOpen={isOpenProfileImgPopUp}
                setIsPopUpOpen={setIsOpenProfileImgPopUp}
              />
            </FlexBox>
            <TextField
              required
              fullWidth
              id={idInputUserName}
              label="닉네임"
              inputProps={{
                maxLength: USERNAME_LIMIT,
              }}
              helperText={`${errorType === keyErrorUserName ? authError : ""} ${
                inputUserName.length
              }/${USERNAME_LIMIT} 
              `}
              value={inputUserName}
              onChange={setSignUpInputs}
              error={errorType === keyErrorUserName}
            />
            <FormControl fullWidth required>
              <InputLabel>성별</InputLabel>
              <Select
                name={idInputSex}
                value={inputSex}
                label="성별"
                onChange={setSignUpSelects}
              >
                {OPTIONS_SEX.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid container gap="0.8rem">
              <Grid item xs>
                <FormControl
                  fullWidth
                  required
                  error={errorType === keyErrorBirthdate}
                >
                  <InputLabel>생년</InputLabel>
                  <Select
                    name={idInputYear}
                    value={inputYear}
                    label="생년"
                    onChange={setSignUpSelects}
                  >
                    {OPTIONS_YEAR.map((item) => (
                      <MenuItem key={item.value} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormHelperText error>
                  {errorType === keyErrorBirthdate && authError}
                </FormHelperText>
              </Grid>
              <Grid item xs>
                <FormControl
                  fullWidth
                  required
                  error={errorType === keyErrorBirthdate}
                >
                  <InputLabel>월</InputLabel>
                  <Select
                    name={idInputMonth}
                    value={inputMonth}
                    label="월"
                    onChange={setSignUpSelects}
                  >
                    {OPTIONS_MONTH.map((item) => (
                      <MenuItem key={item.value} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl
                  fullWidth
                  required
                  error={errorType === keyErrorBirthdate}
                >
                  <InputLabel>일</InputLabel>
                  <Select
                    name={idInputDate}
                    value={inputDate}
                    label="일"
                    onChange={setSignUpSelects}
                  >
                    {OPTIONS_DATE.map((item) => (
                      <MenuItem key={item.value} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TextField
              required
              fullWidth
              id={idInputJob}
              label="직업"
              inputProps={{
                maxLength: JOB_LIMIT,
              }}
              helperText={`${errorType === keyErrorJob ? authError : ""} ${
                inputJob.length
              }/${JOB_LIMIT}`}
              value={inputJob}
              onChange={setSignUpInputs}
              error={errorType === keyErrorJob}
            />
            <TextField
              fullWidth
              id={idInputBio}
              label="자기소개 문구"
              inputProps={{
                maxLength: BIO_LIMIT,
              }}
              helperText={`${inputBio.length}/${BIO_LIMIT}`}
              value={inputBio}
              onChange={setSignUpInputs}
            />
          </FlexColumnBox>
        </FlexColumnBox>
      </CardContent>
    </Card>
  );
}
export default SignUpInform;
