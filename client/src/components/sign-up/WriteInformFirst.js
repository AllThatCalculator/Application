import {
  ExplanationEmail,
  ExplanationInputBox,
} from "../global-component/Explanation";
import { OPTIONS_EMAIL_ADDRESS } from "../register/Option";
import { InformBox } from "../register/WriteInform";

function WriteInformFirst(props) {
  return (
    <InformBox>
      <ExplanationEmail
        isLine={true}
        ratioLeft="1"
        ratioRight="3.5"
        address={props.address}
        onChangeAddress={props.changeAddress}
        writedDomain={props.writedDomain}
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
        isLine={true}
        ratioLeft="1"
        ratioRight="3.5"
        explanation="비밀번호"
        placeholder="비밀번호를 입력하세요."
        defaultValue={props.pw}
        onChange={props.changePw}
      />
      <ExplanationInputBox
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
