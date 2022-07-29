import styled from "styled-components";
import { FlexColumnLayout } from "../Layout";
import styles from "../styles";
import GuideText from "./GuideText";

const Wrapper = styled(FlexColumnLayout)`
  width: 100%;
  border-bottom: 1px solid ${styles.styleColor.blue50};
`;

function TagPannel() {
  const explanation =
    "본인 계산기의 계산 이력을 남기기 위하여\n입·출력 컴포넌트의 Class Name을 복사해서\n본인 입·출력 컴포넌트의 Class에 추가해주세요.\n\n그리고, 입력과 결과 태그에 atcDesc=”” 입력해주세요.";
  return (
    <Wrapper>
      <GuideText content={explanation} />
    </Wrapper>
  );
}

export default TagPannel;
