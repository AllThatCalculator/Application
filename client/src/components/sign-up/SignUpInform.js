import { useEffect, useState } from "react";
import styled from "styled-components";
import { BoxBorder } from "../atom-components/BoxBorder";
import BoxTitle from "../atom-components/BoxTitle";
import { BtnIndigo } from "../atom-components/ButtonTemplate";
import { FlexColumnLayout } from "../Layout";
import { OPTIONS_SEX, OPTIONS_YEAR, OPTIONS_MONTH } from "./constants";
import fillOptionsList from "./fillOptionsList";
import ProfileChange from "./ProfileChange";
import WarningGuide from "../global-components/WarningGuide";
import useInput from "../../hooks/useInput";
import signUpUser from "../../user-actions/SignUpUser";
import UserInfoForm from "./UserInfoForm";

import { auth } from "../../firebase";

/**
 * 양쪽으로 꽉 차게 스타일 정의
 */
const WrapperStretch = styled(FlexColumnLayout)`
  width: 100%;
`;

/**
 * 회원가입 페이지
 */
function SignUpInform({ activateEvent, deactivateEvent }) {
  // 회원가입한 사람의 UID
  const userUid = auth.currentUser.uid;
  // 회원가입한 사람의 이메일
  const userEmail = auth.currentUser.email;

  /**
   * 프로필 사진 profileImg - type : Blob
   *
   * 닉네임 userName
   * 성별 sex
   * 생년월일 birthdate -> year, month, date
   * 직업 job
   * 자기소개 문구 bio
   */
  const [profileImg, setProfileImg] = useState("/img/defaultProfile.png");

  const userName = useInput("1");
  const [sex, setSex] = useState("여");
  const [year, setYear] = useState("2000");
  const [month, setMonth] = useState("2");
  const [date, setDate] = useState("2");

  const job = useInput("1");
  const bio = useInput("1");

  // 주의 문구 여부: 다 입력되었는지 여부 & 요청 정보 오류
  // bio 빼고 모두 필수
  const [warningAll, setWarningAll] = useState("");

  // 년도와 월로 일수 구하기
  const [dateEnd, setDateEnd] = useState(1);
  const [dates, setDates] = useState(null);

  // 년도에 따른 월의 마지막 날 계산 & 일수 구하기 (년도와 월을 둘 다 선택해야 갱신)
  useEffect(() => {
    if (year && month) {
      setDateEnd(Number(new Date(Number(year), Number(month), 0).getDate()));
      setDates(fillOptionsList(1, dateEnd));
    }
  }, [year, month, dateEnd]);

  // 입력 변경 사항 있을 시, 회원가입 후 경고 메세지 & 모든 사항 입력 경고 메세지 초기화
  useEffect(() => {
    setWarningAll("");
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

  /**
   * 인자로 넘어온 정보에 대한 change 함수
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * @param {*} event
   * event : 이벤트
   * optionData : 옵션 데이터
   * setData : change할 state
   */
  function changeData(event, optionData, setData) {
    event.preventDefault();
    const targetValue = event.target.value;
    const option = optionData.filter((x) => x.value === targetValue);
    setData(option[0].name);
  }

  /**
   * 폼 제출
   * - 입력된 비밀번호와 비밀번호 확인에 따른 경고 안내문 & 회원가입 성공
   */
  function onSubmitHandler(event) {
    event.preventDefault();
    deactivateEvent();

    // 다 입력했는지 확인
    if (!userName.value || !sex || !year || !month || !date || !job.value) {
      setWarningAll("필수 사항을 모두 입력해 주세요.");
      activateEvent();
      return;
    }
    setWarningAll("");

    // DB 데이터 타입에 맞게 처리
    const sexDb = sex === "여자" ? "F" : "M";
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
        setWarningAll("올바른 정보를 입력해 주세요.");
        activateEvent();
      } else if (result.success) {
        // 회원 가입 성공 -> 자동 로그인 -> 메인화면
        window.location.href = "/";
      }
    });
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <BoxBorder gap="20px">
        <BoxTitle content="회원가입" />
        <ProfileChange profileImg={profileImg} setProfileImg={setProfileImg} />
        <WrapperStretch gap="10px">
          <UserInfoForm
            userName={userName.value}
            sex={sex}
            year={year}
            month={month}
            date={date}
            dates={dates}
            job={job.value}
            bio={bio.value}
            changeUserName={userName.onChange}
            changeSex={(event) => changeData(event, OPTIONS_SEX, setSex)}
            changeYear={(event) => {
              changeData(event, OPTIONS_YEAR, setYear);
              setDate(null);
            }}
            changeMonth={(event) => {
              changeData(event, OPTIONS_MONTH, setMonth);
              setDate(null);
            }}
            changeDate={(event) => changeData(event, dates, setDate)}
            changeJob={job.onChange}
            changeBio={bio.onChange}
          />
          {warningAll && <WarningGuide content={warningAll} />}
        </WrapperStretch>
        <WrapperStretch>
          <BtnIndigo text="가입하기" onClick={onSubmitHandler} />
        </WrapperStretch>
      </BoxBorder>
    </form>
  );
}
export default SignUpInform;
