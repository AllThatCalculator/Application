import {
  ExplanationInputBox,
  ExplanationSelectBox,
} from "../global-component/Explanation";
import { InformBox } from "../register/WriteInform";
import {
  OPTIONS_SEX,
  OPTIONS_YEAR,
  OPTIONS_MONTH,
  OPTIONS_DATE,
} from "./Option";

/**
 * 회원가입 2번째 정보입력창
 *
 * @param { string, string, string, string, string, funtion, funtion, funtion, funtion, funtion} param0
 * sex : 성별
 * year : 년도
 * month : 월
 * date : 일
 * job : 직업
 * bio : 자기소개 문구
 * changeSex : 성별 change 함수
 * changeYear : 년도 change 함수
 * changeMonth : 월 change 함수
 * changeDate : 일 change 함수
 * changeJob : 직업 change 함수
 * changeBio : 자기소개 문구 change 함수
 */
function WriteInformSecond(props) {
  // 성별 SelectBox 필요한 정보들
  const categorySex = [
    {
      options: OPTIONS_SEX,
      placeholder: "성별",
      selected: props.sex,
      onChange: props.changeSex,
      isLine: false,
    },
  ];
  // 년,월,일 SelectBox 필요한 정보들
  const categoryBirthdate = [
    {
      options: OPTIONS_YEAR,
      placeholder: "년도",
      selected: props.year,
      onChange: props.changeYear,
      isLine: true,
    },
    {
      options: OPTIONS_MONTH,
      placeholder: "월",
      selected: props.month,
      onChange: props.changeMonth,
      isLine: true,
    },
    {
      options: OPTIONS_DATE,
      placeholder: "일",
      selected: props.date,
      onChange: props.changeDate,
      isLine: false,
    },
  ];
  return (
    <InformBox>
      <ExplanationSelectBox
        isLine={true}
        ratioLeft="1"
        ratioRight="3.5"
        explanation="성별"
        categorys={categorySex}
      />
      <ExplanationSelectBox
        isLine={true}
        ratioLeft="1"
        ratioRight="3.5"
        explanation="생년월일"
        categorys={categoryBirthdate}
      />
      <ExplanationInputBox
        isLine={true}
        ratioLeft="1"
        ratioRight="3.5"
        explanation="직업"
        placeholder="본인의 직업을 입력하세요. (ex.학생)"
        defaultValue={props.job}
        onChange={props.changeJob}
      />
      <ExplanationInputBox
        isLine={false}
        ratioLeft="1"
        ratioRight="3.5"
        explanation="자기소개 문구"
        placeholder="다른 사람에게 보이고 싶은 문구를 입력하세요."
        defaultValue={props.bio}
        onChange={props.changeBio}
      />
    </InformBox>
  );
}
export default WriteInformSecond;
