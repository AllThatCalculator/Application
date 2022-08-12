import styled from "styled-components";
import { BtnTrans } from "../atom-components/ButtonTemplate";
import Heading from "../atom-components/Heading";
import { FlexColumnLayout } from "../Layout";
import styles from "../styles";

const Wrapper = styled(FlexColumnLayout)`
  margin: 0 auto;
  justify-content: center;
  color: ${styles.styleColor.black};
`;

/**
 * 클릭 시, 각 대분류로 바로가기
 * @param {object} contentsShortcut 바로가기 버튼에 대한 정보
 * @param {int} isActive 어떤 바로가기 버튼이 활성화 되었는지 알기위한 state
 * @param {function} setIsActive 바로가기 버튼 활성화 함수
 */
function Shortcut({ contentsShortcut, isActive, setIsActive }) {
  /**
   * 바로가기 버튼에서 활성화된 값
   * - 각 버튼마다 id부여하여 index로 접근해서 활성화 여부 알기
   * - 각 버튼에 맞는 대분류 ref로 가기
   */
  function onClickShortcut(event, currentRef) {
    setIsActive(parseInt(event.target.id));
    currentRef.onMoveToElement();
  }

  return (
    <Wrapper gap="14px">
      <Heading
        content="바로가기"
        h={2}
        color={styles.styleColor.gray100}
        isLine={true}
      />
      {contentsShortcut.map((cont, index) => (
        <BtnTrans
          key={cont.text}
          id={index}
          text={cont.text}
          icon={cont.icon}
          isActive={index === isActive ? true : false}
          onClick={(event) => onClickShortcut(event, cont.itemRef)}
          direction={true}
        />
      ))}
    </Wrapper>
  );
}
export default Shortcut;
