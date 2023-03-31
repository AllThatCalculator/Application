import { useState } from "react";
import {
  OPTIONS_SEX,
  OPTIONS_YEAR,
  OPTIONS_MONTH,
  OPTIONS_DATE,
  USERNAME_LIMIT,
  JOB_LIMIT,
  BIO_LIMIT,
} from "./constants";
import useInput from "../../hooks/useInput";
import { auth } from "../../firebase";
import {
  Button,
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
import usePage from "../../hooks/usePage";
import { useDispatch, useSelector } from "react-redux";
import useLoading from "../../hooks/useLoading";
import checkValidDate from "../../utils/checkValidDate";
import useError from "../../hooks/useError";
import checkSpecialSymbols from "../../utils/checkSpecialSymbols";
import ProfileChange from "./ProfileChange";
import { handleSignUp } from "../../utils/handleUserActions";
import getUserMe from "../../user-actions/users/getUserMe";
import { onSetUserIdToken, onSetUserInfo } from "../../modules/userInfo";

/**
 * 회원가입 페이지
 */
function SignUpInform({ activateEvent, deactivateEvent }) {
  const { calculetRefreshPage } = usePage();
  const dispatch = useDispatch();

  // loading state
  const { handleOnLoading, handleOffLoading } = useLoading();
  // error state
  const { handleSetAuthError, handleSetErrorType, handleSetClearError } =
    useError();
  // error id
  const ERROR_USER_NAME = "sign-up-user-name";
  const ERROR_BIRTHDATE = "sign-up-birthdate";
  const ERROR_JOB = "sign-up-job";

  // redux state
  const { authError, errorType } = useSelector((state) => ({
    authError: state.error.authError,
    errorType: state.error.errorType,
  }));

  // 회원가입한 사람의 Id Token
  const userIdToken = auth.currentUser.accessToken;

  /**
   * 프로필 사진 profileImg - type : Blob
   *
   * 닉네임 userName
   * 성별 sex
   * 생년월일 birthdate -> year, month, date
   * 직업 job
   * 자기소개 문구 bio
   */

  /** 프로필 사진 */
  const [profileImg, setProfileImg] = useState({ url: "", file: null });

  /** 닉네임 */
  const userName = useInput("");

  // 성별
  const [sex, setSex] = useState("");
  function handleSexChange(event) {
    setSex(event.target.value);
  }

  // 생년
  const [year, setYear] = useState("");
  function handleYearChange(event) {
    setYear(event.target.value);
  }

  // 월
  const [month, setMonth] = useState("");
  function handleMonthChange(event) {
    setMonth(event.target.value);
  }

  // 일
  const [date, setDate] = useState("");
  function handleDateChange(event) {
    setDate(event.target.value);
  }

  /** 직업 */
  const job = useInput("");

  /** 자기소개 */
  const bio = useInput("");

  /**
   * 폼 제출
   * - 입력된 비밀번호와 비밀번호 확인에 따른 경고 안내문 & 회원가입 성공
   */
  function onSubmitHandler(event) {
    event.preventDefault();
    handleSetClearError(); // clear error
    handleOnLoading(); // loading start

    // 닉네임 : 공백 혹은 특수문자 검사
    if (checkSpecialSymbols(userName.value)) {
      handleSetAuthError("special-symbols");
      handleSetErrorType(ERROR_USER_NAME);
      handleOffLoading(); // loading stop
      return;
    }

    // DB 데이터 타입에 맞게 처리 - 날짜 유효성 검사
    const birthdateDb = year + "-" + month + "-" + date;
    if (!checkValidDate(birthdateDb)) {
      handleSetAuthError("invalid-date");
      handleSetErrorType(ERROR_BIRTHDATE);
      handleOffLoading(); // loading stop
      return;
    }

    // 직업 : 공백 혹은 특수문자 검사
    if (checkSpecialSymbols(job.value)) {
      handleSetAuthError("special-symbols");
      handleSetErrorType(ERROR_JOB);
      handleOffLoading(); // loading stop
      return;
    }

    deactivateEvent(); // off event

    // 서버에 보낼 정보 => body
    let body = {
      profileImg: profileImg.file,
      userInfo: {
        userName: userName.value,
        bio: bio.value,
        sex: sex,
        birthdate: birthdateDb,
        job: job.value,
      },
    };
    // 서버에 요청
    // console.log("userIdToken", userIdToken);
    handleSignUp(body, userIdToken).then((result) => {
      handleOffLoading(); // loading stop
      // success
      if (result) {
        /** set user info */
        getUserMe(userIdToken).then((data) => {
          // console.log(data);
          dispatch(onSetUserInfo(data));
        });
        /** set user id token */
        dispatch(onSetUserIdToken(userIdToken));

        // 전에 있던 페이지로 돌아가기
        // backPage();
        // 우선 메인 페이지로
        calculetRefreshPage();
      }
    });
  }

  const [isOpenProfileImgPopUp, setIsOpenProfileImgPopUp] = useState(false);

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
              label="닉네임"
              inputProps={{
                maxLength: USERNAME_LIMIT,
              }}
              helperText={`${errorType === ERROR_USER_NAME ? authError : ""} ${
                userName.value.length
              }/${USERNAME_LIMIT} 
              `}
              value={userName.value}
              onChange={userName.onChange}
              error={errorType === ERROR_USER_NAME}
            />
            <FormControl fullWidth required>
              <InputLabel>성별</InputLabel>
              <Select value={sex} label="성별" onChange={handleSexChange}>
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
                  error={errorType === ERROR_BIRTHDATE}
                >
                  <InputLabel>생년</InputLabel>
                  <Select value={year} label="생년" onChange={handleYearChange}>
                    {OPTIONS_YEAR.map((item) => (
                      <MenuItem key={item.value} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormHelperText error>
                  {errorType === ERROR_BIRTHDATE && authError}
                </FormHelperText>
              </Grid>
              <Grid item xs>
                <FormControl
                  fullWidth
                  required
                  error={errorType === ERROR_BIRTHDATE}
                >
                  <InputLabel>월</InputLabel>
                  <Select value={month} label="월" onChange={handleMonthChange}>
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
                  error={errorType === ERROR_BIRTHDATE}
                >
                  <InputLabel>일</InputLabel>
                  <Select value={date} label="일" onChange={handleDateChange}>
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
              label="직업"
              inputProps={{
                maxLength: JOB_LIMIT,
              }}
              helperText={`${errorType === ERROR_JOB ? authError : ""} ${
                job.value.length
              }/${JOB_LIMIT}`}
              value={job.value}
              onChange={job.onChange}
              error={errorType === ERROR_JOB}
            />
            <TextField
              fullWidth
              label="자기소개 문구"
              inputProps={{
                maxLength: BIO_LIMIT,
              }}
              helperText={`${bio.value.length}/${BIO_LIMIT}`}
              value={bio.value}
              onChange={bio.onChange}
            />
          </FlexColumnBox>
          <Button
            type="submit"
            variant="contained"
            onClick={onSubmitHandler}
            disabled={
              !userName.value || !sex || !year || !month || !date || !job.value
            }
          >
            입력 완료
          </Button>
        </FlexColumnBox>
      </CardContent>
    </Card>
  );
}
export default SignUpInform;
