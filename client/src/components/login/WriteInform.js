import { ExplanationInputBox } from "../global-components/Explanation";
import { InformBox } from "../register/WriteInform";
import styles from "../styles";
/**
 * 로그인 페이지에서
 * 이메일, 비밀번호 입력 컴포넌트 반환
 *
 * @param {string, string, funtion, funtion} param0
 * email: 입력된 이메일
 * pw : 입력된 비밀번호
 * changeEmail : 이메일 입력 이벤트
 * changePw : 비밀번호 입력 이벤트
 */
function WriteInform(props) {
  return (
    <InformBox>
      <ExplanationInputBox
        type="email"
        isLine={true}
        ratioLeft="1"
        ratioRight="11"
        icon="PersonFill"
        iconColor={styles.styleColor.blue900}
        placeholder="이메일"
        defaultValue={props.email}
        onChange={props.changeEmail}
      />
      <ExplanationInputBox
        type="password"
        secureTextEntry={true}
        isLine={false}
        ratioLeft="1"
        ratioRight="11"
        icon="LockFill"
        iconColor={styles.styleColor.blue900}
        placeholder="비밀번호"
        defaultValue={props.pw}
        onChange={props.changePw}
      />
    </InformBox>
  );
}
export default WriteInform;
