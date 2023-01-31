import { useEffect, useState } from "react";
import { OPTIONS_SEX, OPTIONS_YEAR, OPTIONS_MONTH } from "./constants";
import useInput from "../../hooks/useInput";
import signUpUser from "../../user-actions/SignUpUser";
import { auth } from "../../firebase";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FlexColumnBox } from "../global-components/FlexBox";
import usePage from "../../hooks/usePage";

/**
 * 회원가입 페이지
 */
function SignUpInform({ activateEvent, deactivateEvent }) {
  const { calculetPage } = usePage();

  // 회원가입한 사람의 UID
  const userUid = auth.currentUser.uid;
  // const userUid = 0;
  // 회원가입한 사람의 이메일
  const userEmail = auth.currentUser.email;
  // const userEmail = 0;

  /**
   * 프로필 사진 profileImg - type : Blob
   *
   * 닉네임 userName
   * 성별 sex
   * 생년월일 birthdate -> year, month, date
   * 직업 job
   * 자기소개 문구 bio
   */
  // const [profileImg, setProfileImg] = useState("/img/defaultProfile.png");
  const profileImg = "/img/defaultProfile.png";

  /** 닉네임 최대 길이 */
  const USERNAME_LIMIT = 20;
  const userName = useInput("");

  const [sex, setSex] = useState("");
  function handleSexChange(event) {
    setSex(event.target.value);
  }

  const [year, setYear] = useState("");
  function handleYearChange(event) {
    setYear(event.target.value);
  }

  const [month, setMonth] = useState("");
  function handleMonthChange(event) {
    setMonth(event.target.value);
  }

  const [date, setDate] = useState("");
  function handleDateChange(event) {
    setDate(event.target.value);
  }

  /** 직업 최대 길이 */
  const JOB_LIMIT = 25;
  const job = useInput("");

  /** 자기소개 문구 최대 길이 */
  const BIO_LIMIT = 200;
  const bio = useInput("");

  // 주의 문구 여부: 다 입력되었는지 여부 & 요청 정보 오류
  // bio 빼고 모두 필수
  // const [warningAll, setWarningAll] = useState("");

  // 년도와 월로 일수 구하기
  // const [dateEnd, setDateEnd] = useState(1);
  const dateEnd = 1;
  // const [dates, setDates] = useState([]);
  const dates = [];

  // 년도에 따른 월의 마지막 날 계산 & 일수 구하기 (년도와 월을 둘 다 선택해야 갱신)
  useEffect(() => {
    if (year && month) {
      // const day = new Date(year.getFullYear(), month.getMonth(), 0);
      console.log(new Date(year, month, 1).toDateString()); // last day in January
      // console.log(getLastDayOfMonth(year, month));
      // setDateEnd(Number(new Date(Number(year), Number(month), 0).getDate()));
      // setDates();
    }
  }, [year, month, dateEnd]);

  // 입력 변경 사항 있을 시, 회원가입 후 경고 메세지 & 모든 사항 입력 경고 메세지 초기화
  useEffect(() => {
    // setWarningAll("");
  }, [
    profileImg,
    userName.value,
    sex,
    year,
    month,
    date,
    job.value,
    bio.value,
  ]);

  // /**
  //  * 인자로 넘어온 정보에 대한 change 함수
  //  * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
  //  * @param {*} event
  //  * event : 이벤트
  //  * optionData : 옵션 데이터
  //  * setData : change할 state
  //  */
  // function changeData(event, optionData, setData) {
  //   event.preventDefault();
  //   const targetValue = event.target.value;
  //   const option = optionData.filter((x) => x.value === targetValue);
  //   setData(option[0].name);
  // }

  /**
   * 폼 제출
   * - 입력된 비밀번호와 비밀번호 확인에 따른 경고 안내문 & 회원가입 성공
   */
  function onSubmitHandler(event) {
    event.preventDefault();
    deactivateEvent();

    // 다 입력했는지 확인
    if (!userName.value || !sex || !year || !month || !date || !job.value) {
      // setWarningAll("필수 사항을 모두 입력해 주세요.");
      activateEvent();
      return;
    }
    // setWarningAll("");

    // DB 데이터 타입에 맞게 처리
    const sexDb = sex === "여성" ? "F" : "M";
    const birthdateDb = year + "-" + month + "-" + date;

    // 서버에 보낼 정보 => body
    let body = {
      id: userUid,
      email: userEmail,
      userName: userName.value,
      profileImg: profileImg,
      bio: bio.value,
      sex: sexDb,
      birthdate: birthdateDb,
      job: job.value,
    };

    // 서버에 요청
    const request = signUpUser(body);
    request.then((result) => {
      // 회원 가입 실패
      if (result === 400) {
        // setWarningAll("올바른 정보를 입력해 주세요.");
        activateEvent();
      } else if (result.success) {
        // 회원 가입 성공 -> 자동 로그인 -> 메인화면
        calculetPage();
      }
    });
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <Card variant="outlined">
        <CardContent>
          <FlexColumnBox gap="1.6rem">
            <Typography
              variant="subtitle1"
              color="text.disabled"
              sx={{ mb: "2rem" }}
            >
              아래 내용에 대해 작성해 주세요.
            </Typography>

            {/* <form onSubmit={onSubmitHandler}> */}
            <FlexColumnBox gap="1.6rem">
              <TextField
                // id="outlined-name"
                required
                fullWidth
                label="닉네임"
                inputProps={{
                  maxLength: USERNAME_LIMIT,
                }}
                helperText={`${userName.value.length}/${USERNAME_LIMIT}`}
                value={userName.value}
                onChange={userName.onChange}
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
                  <FormControl fullWidth required>
                    <InputLabel>생년</InputLabel>
                    <Select
                      value={year}
                      label="생년"
                      onChange={handleYearChange}
                    >
                      {OPTIONS_YEAR.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs>
                  <FormControl fullWidth required>
                    <InputLabel>월</InputLabel>
                    <Select
                      value={month}
                      label="월"
                      onChange={handleMonthChange}
                    >
                      {OPTIONS_MONTH.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs>
                  <FormControl fullWidth required>
                    <InputLabel>일</InputLabel>
                    <Select value={date} label="일" onChange={handleDateChange}>
                      {dates.length !== 0 &&
                        dates.map((item) => (
                          <MenuItem key={item.value} value={item.value}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <TextField
                // id="outlined-name"
                required
                fullWidth
                label="직업"
                inputProps={{
                  maxLength: JOB_LIMIT,
                }}
                helperText={`${job.value.length}/${JOB_LIMIT}`}
                value={job.value}
                onChange={job.onChange}
              />
              <TextField
                // id="outlined-name"
                required
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
            {/* </form> */}
            <Button type="submit" variant="contained" onClick={onSubmitHandler}>
              입력 완료
            </Button>
          </FlexColumnBox>
        </CardContent>
      </Card>
    </form>
  );
}
export default SignUpInform;

// import { useEffect, useState } from "react";
// import styled from "styled-components";
// import { BoxBorder } from "../atom-components/BoxBorder";
// import BoxTitle from "../atom-components/BoxTitle";
// import { BtnIndigo } from "../atom-components/ButtonTemplate";
// import { FlexColumnLayout } from "../Layout";
// import { OPTIONS_SEX, OPTIONS_YEAR, OPTIONS_MONTH } from "./constants";
// import fillOptionsList from "./fillOptionsList";
// import ProfileChange from "./ProfileChange";
// import WarningGuide from "../global-components/WarningGuide";
// import useInput from "../../hooks/useInput";
// import signUpUser from "../../user-actions/SignUpUser";
// import UserInfoForm from "./UserInfoForm";

// import { auth } from "../../firebase";

// /**
//  * 양쪽으로 꽉 차게 스타일 정의
//  */
// const WrapperStretch = styled(FlexColumnLayout)`
//   width: 100%;
// `;

// /**
//  * 회원가입 페이지
//  */
// function SignUpInform({ activateEvent, deactivateEvent }) {
//   // 회원가입한 사람의 UID
//   // const userUid = auth.currentUser.uid;
//   const userUid = 0;
//   // 회원가입한 사람의 이메일
//   // const userEmail = auth.currentUser.email;
//   const userEmail = 0;

//   /**
//    * 프로필 사진 profileImg - type : Blob
//    *
//    * 닉네임 userName
//    * 성별 sex
//    * 생년월일 birthdate -> year, month, date
//    * 직업 job
//    * 자기소개 문구 bio
//    */
//   const [profileImg, setProfileImg] = useState("/img/defaultProfile.png");

//   const userName = useInput("");
//   const [sex, setSex] = useState("");
//   const [year, setYear] = useState("");
//   const [month, setMonth] = useState("");
//   const [date, setDate] = useState("");

//   const job = useInput("");
//   const bio = useInput("");

//   // 주의 문구 여부: 다 입력되었는지 여부 & 요청 정보 오류
//   // bio 빼고 모두 필수
//   const [warningAll, setWarningAll] = useState("");

//   // 년도와 월로 일수 구하기
//   const [dateEnd, setDateEnd] = useState(1);
//   const [dates, setDates] = useState(null);

//   // 년도에 따른 월의 마지막 날 계산 & 일수 구하기 (년도와 월을 둘 다 선택해야 갱신)
//   useEffect(() => {
//     if (year && month) {
//       setDateEnd(Number(new Date(Number(year), Number(month), 0).getDate()));
//       setDates(fillOptionsList(1, dateEnd));
//     }
//   }, [year, month, dateEnd]);

//   // 입력 변경 사항 있을 시, 회원가입 후 경고 메세지 & 모든 사항 입력 경고 메세지 초기화
//   useEffect(() => {
//     setWarningAll("");
//   }, [
//     profileImg,
//     userName.value,
//     sex,
//     year,
//     month,
//     date,
//     job.value,
//     bio.value,
//   ]);

//   /**
//    * 인자로 넘어온 정보에 대한 change 함수
//    * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
//    * @param {*} event
//    * event : 이벤트
//    * optionData : 옵션 데이터
//    * setData : change할 state
//    */
//   function changeData(event, optionData, setData) {
//     event.preventDefault();
//     const targetValue = event.target.value;
//     const option = optionData.filter((x) => x.value === targetValue);
//     setData(option[0].name);
//   }

//   /**
//    * 폼 제출
//    * - 입력된 비밀번호와 비밀번호 확인에 따른 경고 안내문 & 회원가입 성공
//    */
//   function onSubmitHandler(event) {
//     event.preventDefault();
//     deactivateEvent();

//     // 다 입력했는지 확인
//     if (!userName.value || !sex || !year || !month || !date || !job.value) {
//       setWarningAll("필수 사항을 모두 입력해 주세요.");
//       activateEvent();
//       return;
//     }
//     setWarningAll("");

//     // DB 데이터 타입에 맞게 처리
//     const sexDb = sex === "여자" ? "F" : "M";
//     const birthdateDb = year + "-" + month + "-" + date;

//     // 서버에 보낼 정보 => body
//     let body = {
//       id: userUid,
//       email: userEmail,
//       userName: userName.value,
//       profileImg: profileImg,
//       bio: bio.value,
//       sex: sexDb,
//       birthdate: birthdateDb,
//       job: job.value,
//     };

//     // 서버에 요청
//     const request = signUpUser(body);
//     request.then((result) => {
//       // 회원 가입 실패
//       if (result === 400) {
//         setWarningAll("올바른 정보를 입력해 주세요.");
//         activateEvent();
//       } else if (result.success) {
//         // 회원 가입 성공 -> 자동 로그인 -> 메인화면
//         window.location.href = "/";
//       }
//     });
//   }

//   return (
//     <form onSubmit={onSubmitHandler}>
//       <BoxBorder gap="20px">
//         <BoxTitle content="회원가입" />
//         <ProfileChange profileImg={profileImg} setProfileImg={setProfileImg} />
//         <WrapperStretch gap="10px">
//           <UserInfoForm
//             userName={userName.value}
//             sex={sex}
//             year={year}
//             month={month}
//             date={date}
//             dates={dates}
//             job={job.value}
//             bio={bio.value}
//             changeUserName={userName.onChange}
//             changeSex={(event) => changeData(event, OPTIONS_SEX, setSex)}
//             changeYear={(event) => {
//               changeData(event, OPTIONS_YEAR, setYear);
//               setDate(null);
//             }}
//             changeMonth={(event) => {
//               changeData(event, OPTIONS_MONTH, setMonth);
//               setDate(null);
//             }}
//             changeDate={(event) => changeData(event, dates, setDate)}
//             changeJob={job.onChange}
//             changeBio={bio.onChange}
//           />
//           {warningAll && <WarningGuide content={warningAll} />}
//         </WrapperStretch>
//         <WrapperStretch>
//           <BtnIndigo text="가입하기" onClick={onSubmitHandler} />
//         </WrapperStretch>
//       </BoxBorder>
//     </form>
//   );
// }
// export default SignUpInform;
