import {
  ExplanationEmail,
  ExplanationInputBox,
} from "../global-components/Explanation";
import { OPTIONS_EMAIL_ADDRESS } from "./constants";
import { InformBox } from "../register/WriteInform";
/**
 * 회원가입 1번째 정보입력창
 *
 * @param {string, string, string, string, string, string, funtion, funtion, funtion, funtion, funtion, funtion} props
 * address : 주소
 * writtenDomain : 직접 입력한 도메인 값
 * selectedDomain : select 박스에서 선택한 도메인 값
 * userName : 닉네임
 * pw : 비밀번호
 * pwConfirmation : 비밀번호 확인
 * changeAddress : 주소 change 함수
 * changeDomain : 직접 입력한 도메인 값 change 함수
 * changeSelectedDomain : select 박스에서 선택한 도메인 값 change 함수
 * changeUserName : 닉네임 change 함수
 * changePw : 비밀번호 change 함수
 * changePwConfirmation : 비밀번호 확인 change 함수
 */
function WriteInformFirst(props) {
  return (
    <InformBox>
      <ExplanationEmail
        isLine={true}
        ratioLeft="1"
        ratioRight="3.5"
        address={props.address}
        onChangeAddress={props.changeAddress}
        writtenDomain={props.writtenDomain}
        selectedDomain={props.selectedDomain}
        onChangeDomain={props.changeDomain}
        emailAddressOptions={OPTIONS_EMAIL_ADDRESS}
        onChangeSelectedDomain={props.changeSelectedDomain}
      />
      <ExplanationInputBox
        isLine={true}
        ratioLeft="1"
        ratioRight="3.5"
        explanation="닉네임"
        placeholder="닉네임을 입력하세요."
        defaultValue={props.userName}
        onChange={props.changeUserName}
      />
      <ExplanationInputBox
        type="password"
        isLine={true}
        ratioLeft="1"
        ratioRight="3.5"
        explanation="비밀번호"
        placeholder="비밀번호를 입력하세요."
        defaultValue={props.pw}
        onChange={props.changePw}
      />
      <ExplanationInputBox
        type="password"
        isLine={false}
        ratioLeft="1"
        ratioRight="3.5"
        explanation="비밀번호 확인"
        placeholder="비밀번호를 다시 입력하세요."
        defaultValue={props.pwConfirmation}
        onChange={props.changePwConfirmation}
      />
    </InformBox>
  );
}
export default WriteInformFirst;
