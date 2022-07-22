import { useEffect, useState } from "react";
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
import ActGuide from "../components/sign-up/ActGuide";
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
   * 프로필 사진 profileImg
   *
   * 이메일 email -> address, writedDomain, selectedDomain
   * 닉네임 userName
   * 비밀번호 pw
   * 비밀번호 확인 pwConfirmation
   *
   * 성별 sex
   * 생년월일 year, month, date
   * 직업 job
   * 자기소개 문구 bio
   */
  const [profileImg, setProfileImg] = useState("/img/defaultProfile.png");

  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [address, setAddress] = useState("");
  const [writedDomain, setWritedDomain] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [userName, setUserName] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirmation, setPwConfirmation] = useState("");

  const [sex, setSex] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [job, setJob] = useState("");
  const [bio, setBio] = useState("");
  /**
   * 비밀번호와 비밀번호 확인이 같은지
   */
  const [isWarning, setIsWarning] = useState(false);

  // 바로 초기화하면 defaultValue로 설정해서인지 값이 안 바뀌어서 나중에 set하기 위해 useEffect 사용
  useEffect(() => setSelectedDomain("직접 입력"), []);

  /**
   * 사용자가 선택한 옵션으로 세팅
   * 이메일 : address @ domain
   * 생년월일 : year - month - date
   */
  useEffect(() => setDomain(writedDomain), [writedDomain]);
  useEffect(() => setEmail(address + "@" + domain), [address, domain]);
  useEffect(
    () => setBirthdate(year + "-" + month + "-" + date),
    [year, month, date]
  );
  /**
   * 저작자 이메일의 도메인 부분 change 함수 (select 박스)
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
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
  }
  /**
   * 인자로 넘어온 정보에 대한 change 함수
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * @param {*} event
   */
  function changeData(event, optionData, setData) {
    const targetValue = event.target.value;
    const option = optionData.filter((x) => x.value === targetValue);
    setData(option[0].name);
  }

  /**
   * 입력된 비밀번호와 비밀번호 확인에 따른 경고 안내문 & 회원가입 성공
   */
  // setIsWarning(true)되면 <ActGuide> 생기는데, 이건 임시에요!!
  // 로그인에서 경고 안내문 컴포넌트 만들었으니까
  // 로그인 머지 후에 수정하겠습니다!
  function onClickSignUp() {
    if (pw !== pwConfirmation) setIsWarning(true);
    else {
      setIsWarning(false);
      console.log({
        email: email,
        userName: userName,
        pw: pw,
        sex: sex,
        birthdate: birthdate,
        job: job,
        bio: bio,
      });
    }
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
            address={address}
            writedDomain={writedDomain}
            selectedDomain={selectedDomain}
            userName={userName}
            pw={pw}
            pwConfirmation={pwConfirmation}
            changeAddress={(event) => setAddress(event.target.value)}
            changeDomain={(event) => setWritedDomain(event.target.value)}
            changeSelectedDomain={changeSelectedDomain}
            changeUserName={(event) => setUserName(event.target.value)}
            changePw={(event) => setPw(event.target.value)}
            changePwConfirmation={(event) =>
              setPwConfirmation(event.target.value)
            }
          />
          {isWarning && (
            <ActGuide guide="비밀번호가 다릅니다." lead="로그인하기" />
          )}
          <WriteInformSecond
            sex={sex}
            year={year}
            month={month}
            date={date}
            job={job}
            bio={bio}
            changeSex={(event) => changeData(event, OPTIONS_SEX, setSex)}
            changeYear={(event) => changeData(event, OPTIONS_YEAR, setYear)}
            changeMonth={(event) => changeData(event, OPTIONS_MONTH, setMonth)}
            changeDate={(event) => changeData(event, OPTIONS_DATE, setDate)}
            changeJob={(event) => setJob(event.target.value)}
            changeBio={(event) => setBio(event.target.value)}
          />
          <WrapperStretch>
            <BtnIndigo text="가입하기" onClick={onClickSignUp} />
          </WrapperStretch>
        </StyledBorder>
        <StyledBorder>
          <ActGuide guide="이미 계정이 있으신가요?" lead="로그인하기" />
        </StyledBorder>
      </WrapperPad>
    </>
  );
}
export default SignUp;
