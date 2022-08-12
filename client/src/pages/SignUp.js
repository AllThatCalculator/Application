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
  fillOptionsList,
} from "../components/sign-up/Option";
import { OPTIONS_EMAIL_ADDRESS } from "../components/register/Option";
import ProfileChange from "../components/sign-up/ProfileChange";
import WriteInformFirst from "../components/sign-up/WriteInformFirst";
import WriteInformSecond from "../components/sign-up/WriteInformSecond";
import ActGuide from "../components/sign-up/ActGuide";
import WarningGuide from "../components/global-component/WarningGuide";
import useInput from "../user-hooks/UseInput";
import signUpUser from "../components/user-actions/SignUpUser";
import { useNavigate } from "react-router-dom";
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
 * 양쪽으로 꽉 차게 스타일 정의
 */
const WrapperStretch = styled(FlexColumnLayout)`
  width: 100%;
`;

/**
 * 회원가입 페이지
 */
function SignUp() {
  /**
   * 프로필 사진 profileImg - type : Blob
   *
   * 이메일 email -> address, writtenDomain, selectedDomain
   * 닉네임 userName
   * 비밀번호 pw
   * 비밀번호 확인 pwConfirmation
   *
   * 성별 sex
   * 생년월일 birthdate -> year, month, date
   * 직업 job
   * 자기소개 문구 bio
   */
  const [profileImg, setProfileImg] = useState("/img/defaultProfile.png");

  const address = useInput("");
  const [domain, setDomain] = useState("");
  const [writtenDomain, setwrittenDomain] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");

  const userName = useInput("");
  const pw = useInput("");
  const pwConfirmation = useInput("");

  const [sex, setSex] = useState("");

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");

  const job = useInput("");
  const bio = useInput("");

  // 주의 문구 여부 : 비밀번호 유효성 검사 / 비밀번호 & 비밀번호 확인 비교
  const [warningPw, setWarningPw] = useState("");
  // 주의 문구 여부: 다 입력되었는지 여부 & 요청 정보 오류
  const [warningAll, setWarningAll] = useState("");

  // 년도와 월로 일수 구하기
  const [dateEnd, setDateEnd] = useState(1);
  const [dates, setDates] = useState(null);

  // 라우터 역할 네이게이션
  const navigate = useNavigate();

  // 바로 초기화하면 defaultValue로 설정해서인지 값이 안 바뀌어서 나중에 set하기 위해 useEffect 사용
  useEffect(() => setSelectedDomain("직접 입력"), []);

  // 선택되거나 입력된 도메인 갱신
  useEffect(() => setDomain(writtenDomain), [writtenDomain]);

  // 년도에 따른 월의 마지막 날 계산 & 일수 구하기 (년도와 월을 둘 다 선택해야 갱신)
  useEffect(() => {
    if (year && month) {
      setDateEnd(Number(new Date(Number(year), Number(month), 0).getDate()));
      setDates(fillOptionsList(1, dateEnd));
    }
  }, [year, month, dateEnd]);

  // 비밀번호 유효성 검사 (10자 이상, 알파벳과 특수문자 포함)
  // 비밀번호 & 비밀번호 확인 같은지 검사
  useEffect(() => {
    // 비밀번호 최소 10자, 하나의 문자, 하나의 숫자, 하나의 특수 문자 정규식
    const specialLetter =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/g;
    if (!specialLetter.test(pw.value)) {
      if (pw.value.length > 0) {
        setWarningPw(
          "최소 10자 이상, 숫자와 알파벳과 특수문자를 포함해 주세요."
        );
        return;
      } else setWarningPw("");
    }
    if (pw.value !== pwConfirmation.value) {
      setWarningPw("비밀번호가 일치하지 않습니다.");
    } else setWarningPw("");
  }, [pw.value, pwConfirmation.value]);

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
      setwrittenDomain("");
    } else {
      setwrittenDomain(domainValue);
    }
    setSelectedDomain(domainValue);
  }

  /**
   * 인자로 넘어온 정보에 대한 change 함수
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * @param {*} event
   * event : 이벤트
   * optionData : 옵션 데이터
   * setData : change할 state
   */
  function changeData(event, optionData, setData) {
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
    // 비밀번호 & 비밀번호 확인 비교
    if (warningPw) return;
    // 다 입력했는지 확인
    if (
      !address.value ||
      !domain ||
      !userName.value ||
      !pw.value ||
      !pwConfirmation.value ||
      !sex ||
      !year ||
      !month ||
      !date ||
      !job.value ||
      !bio.value
    ) {
      setWarningAll("모든 사항을 입력해 주세요.");
      return;
    } else setWarningAll("");

    // DB 데이터 타입에 맞게 처리
    const sexDb = sex === "여자" ? "F" : "M";
    const emailDb = address.value + "@" + domain;
    const birthdateDb = year + "-" + month + "-" + date;

    // 서버에 보낼 정보 => body
    let body = {
      email: emailDb,
      userName: userName.value,
      profileImg: profileImg,
      bio: bio.value,
      sex: sexDb,
      birthdate: birthdateDb,
      pw: pw.value,
      job: job.value,
    };

    // 서버에 요청
    const request = signUpUser(body);
    request.then((res) => {
      // 회원 가입 실패
      if (res.message) setWarningAll("올바른 정보를 입력해 주세요.");
      // 회원 가입 성공
      else if (res.location) navigate("/login");
    });
  }
  return (
    <>
      <StyledWhite300 />
      <WrapperPad gap="20px">
        <StyledImg src="/ATCLogoBlueImgText.png" width="214px" />
        <BoxBorder gap="20px">
          <BoxTitle content="회원가입" />
          <ProfileChange
            profileImg={profileImg}
            setProfileImg={setProfileImg}
          />
          <WrapperStretch gap="10px">
            <WriteInformFirst
              address={address.value}
              writtenDomain={writtenDomain}
              selectedDomain={selectedDomain}
              userName={userName.value}
              pw={pw.value}
              pwConfirmation={pwConfirmation.value}
              changeAddress={address.onChange}
              changeDomain={(event) => setwrittenDomain(event.target.value)}
              changeSelectedDomain={changeSelectedDomain}
              changeUserName={userName.onChange}
              changePw={pw.onChange}
              changePwConfirmation={pwConfirmation.onChange}
            />
            {warningPw && <WarningGuide content={warningPw} />}
          </WrapperStretch>
          <WrapperStretch gap="10px">
            <WriteInformSecond
              sex={sex}
              year={year}
              month={month}
              date={date}
              dates={dates}
              job={job.value}
              bio={bio.value}
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
        <BoxBorder>
          <ActGuide
            guide="이미 계정이 있으신가요?"
            lead="로그인하기"
            onClick={() => navigate("/login")}
          />
        </BoxBorder>
      </WrapperPad>
    </>
  );
}
export default SignUp;
