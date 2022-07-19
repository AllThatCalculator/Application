import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BoxBorder } from "../components/atom-components/BoxBorder";
import { StyledImg } from "../components/atom-components/BoxIcon";
import BoxTitle from "../components/atom-components/BoxTitle";
import { BtnIndigo } from "../components/atom-components/ButtonTemplate";
import {
  ContentLayout,
  FlexColumnLayout,
  White300Layout,
} from "../components/Layout";
import {
  OPTIONS_SEX,
  OPTIONS_YEAR,
  OPTIONS_MONTH,
  OPTIONS_DATE,
} from "../components/sign-up/Option";
import { OPTIONS_EMAIL_ADDRESS } from "../components/register/Option";
import ProfileChange from "../components/sign-up/ProfileChange";
import WriteInformFirst from "../components/sign-up/WriteInformFirst";
import WriteInformSecond from "../components/sign-up/WriteInformSecond";
import Guide from "../components/sign-up/Guide";
/**
 * 흰색 뒷 배경
 */
const StyledWhite300 = styled(White300Layout)`
  position: fixed;
  top: 60px;
  bottom: 0;
  z-index: -1;
`;
/**
 * 회원가입 크기 530px
 * 윗부분에 패딩을 주기 위한 스타일 정의
 */
const WrapperPad = styled(ContentLayout)`
  flex-direction: column;
  width: 530px;
  padding: 50px 0px;
  gap: ${(props) => props.gap};
`;
/**
 * 경계선 박스 내 가운데 정렬 스타일 정의
 */
const StyledBorder = styled(BoxBorder)`
  align-items: center;
`;
/**
 * 가입하기 버튼 양쪽으로 꽉 차게 스타일 정의
 */
const WrapperStretch = styled(FlexColumnLayout)`
  width: 100%;
`;

/**
 * 회원가입 페이지
 */
function SignUp() {
  /**
   * 이메일 `email`
   * 닉네임 `userName`
   * 비밀번호 'pw'
   * 비밀번호 확인 'pwConfirmation'
   * 프로필 사진 `profileImg`
   * 자기소개 문구 `bio`
   * 성별 `sex`
   * 생년월일 `birthdate`-> year, month, date
   * 직업 `job`
   */
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [writedDomain, setWritedDomain] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [address, setAddress] = useState("");

  const [userName, setUserName] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirmation, setPwConfirmation] = useState("");

  const [bio, setBio] = useState("");
  const [sex, setSex] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [job, setJob] = useState("");

  const [profileImg, setProfileImg] = useState("/img/defaultProfile.png");
  const inputProfileImg = useRef(null);

  // 바로 초기화하면 defaultValue로 설정해서인지 값이 안 바뀌어서 나중에 set하기 위해 useEffect 사용
  useEffect(() => setSelectedDomain("직접 입력"), []);

  /**
   * 닉네임 Change 함수
   * @param {*} event
   */
  function changeUserName(event) {
    setUserName(event.target.value);
  }
  /**
   * 비밀번호 Change 함수
   * @param {*} event
   */
  function changePw(event) {
    setPw(event.target.value);
  }
  /**
   * 비밀번호 학인 Change 함수
   * @param {*} event
   */
  function changePwConfirmation(event) {
    setPwConfirmation(event.target.value);
  }
  /**
   * 직업 Change 함수
   * @param {*} event
   */
  function changeJob(event) {
    setJob(event.target.value);
  }

  /**
   * 자기소개 문구 Change 함수
   * @param {*} event
   */
  function changeBio(event) {
    setBio(event.target.value);
  }

  /**
   * email 세팅하는 함수 = address + @ + domain
   */
  function settingEmail(address, domain) {
    setEmail(`${address}@${domain}`);
  }

  /**
   * 저작자 이메일의 주소 부분 change 함수
   * - email도 같이 세팅
   * @param {*} event
   */
  function changeAddress(event) {
    setAddress(event.target.value);
    settingEmail(event.target.value, domain);
  }
  /**
   * 저작자 이메일의 도메인 부분 change 함수 (input 박스)
   * - email도 같이 세팅
   * @param {*} event
   */
  function changeDomain(event) {
    const targetValue = event.target.value;
    setWritedDomain(targetValue);
    setDomain(targetValue);
    settingEmail(address, targetValue);
  }
  /**
   * 저작자 이메일의 도메인 부분 change 함수 (select 박스)
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * - email도 같이 세팅
   * @param {*} event
   */
  function changeSelectedDomain(event) {
    const targetValue = event.target.value;
    const option = OPTIONS_EMAIL_ADDRESS.filter((x) => x.value === targetValue);
    const domainValue = option[0].name;
    if (domainValue === "직접 입력") {
      setWritedDomain("");
    } else {
      setWritedDomain(domainValue);
    }
    setSelectedDomain(domainValue);
    setDomain(domainValue);
    settingEmail(address, domainValue);
  }
  /**
   * 성별 change 함수
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * @param {*} event
   */
  function changeSex(event) {
    const targetValue = event.target.value;
    const option = OPTIONS_SEX.filter((x) => x.value === targetValue);
    setSex(option[0].name);
  }
  /**
   * 년도 change 함수
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * @param {*} event
   */
  function changeYear(event) {
    const targetValue = event.target.value;
    const option = OPTIONS_YEAR.filter((x) => x.value === targetValue);
    setYear(option[0].name);
  }
  /**
   * 월 change 함수
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * @param {*} event
   */
  function changeMonth(event) {
    const targetValue = event.target.value;
    const option = OPTIONS_MONTH.filter((x) => x.value === targetValue);
    setMonth(option[0].name);
  }
  /**
   * 일 change 함수
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * @param {*} event
   */
  function changeDate(event) {
    const targetValue = event.target.value;
    const option = OPTIONS_DATE.filter((x) => x.value === targetValue);
    setDate(option[0].name);
  }
  return (
    <>
      <StyledWhite300 />
      <WrapperPad gap="20px">
        <StyledImg src={"/ATCLogoBlueImgText.png"} width="214px" />
        <StyledBorder gap="20px">
          <BoxTitle content="회원가입" />
          <ProfileChange
            profileImg={profileImg}
            setProfileImg={setProfileImg}
          />
          <WriteInformFirst
            email={email}
            address={address}
            writedDomain={writedDomain}
            selectedDomain={selectedDomain}
            domain={domain}
            userName={userName}
            pw={pw}
            pwConfirmation={pwConfirmation}
            changeAddress={changeAddress}
            changeDomain={changeDomain}
            changeSelectedDomain={changeSelectedDomain}
            changeUserName={changeUserName}
            changePw={changePw}
            changePwConfirmation={changePwConfirmation}
          />
          <WriteInformSecond
            profileImg={profileImg}
            bio={bio}
            sex={sex}
            year={year}
            month={month}
            date={date}
            job={job}
            changeSex={changeSex}
            changeYear={changeYear}
            changeMonth={changeMonth}
            changeDate={changeDate}
            changeJob={changeJob}
            changeBio={changeBio}
            inputProfileImg={inputProfileImg}
          />
          <WrapperStretch>
            <BtnIndigo text="가입하기" />
          </WrapperStretch>
        </StyledBorder>
        <StyledBorder>
          <Guide guide="이미 계정이 있으신가요?" lead="로그인하기" />
        </StyledBorder>
      </WrapperPad>
    </>
  );
}
export default SignUp;
