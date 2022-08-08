import styled from "styled-components";
import { BtnTrans } from "../atom-components/ButtonTemplate";
import Heading from "../atom-components/Heading";
import { FlexColumnLayout } from "../Layout";
import styles from "../styles";

/**
 * 바로가기 버튼 이름
 */
const BTN_MATH = "수학";
const BTN_SCIENCE = "과학"; // + "<br />" + "공학";
const BTN_ECONOMY = "경제"; // + "<br />" + "사회";
const BTN_DAILY = "일상";
const BTN_ETC = "기타";

const Wrapper = styled(FlexColumnLayout)`
  margin: 0 auto;
  justify-content: center;
  color: ${styles.styleColor.black};
`;

/**
 * 각 대분류로 바로가기
 * @param {object} math 대분류 수학 Ref, Ref로 스크롤 이동하는 함수
 * @param {object} science 대분류 과학-공학 Ref, Ref로 스크롤 이동하는 함수
 * @param {object} economy 대분류 경제-사회 Ref, Ref로 스크롤 이동하는 함수
 * @param {object} daily 대분류 일상 Ref, Ref로 스크롤 이동하는 함수
 * @param {object} etc 대분류 기타 Ref, Ref로 스크롤 이동하는 함수
 */
function Shortcut({ math, science, economy, daily, etc }) {
  const content = [
    {
      text: BTN_MATH,
      icon: "PlusSlashMinus",
      onClick: math.onMoveToElement,
    },
    {
      text: BTN_SCIENCE,
      icon: "Heart",
      onClick: science.onMoveToElement,
    },
    {
      text: BTN_ECONOMY,
      icon: "People",
      onClick: economy.onMoveToElement,
    },
    {
      text: BTN_DAILY,
      icon: "CalendarWeek",
      onClick: daily.onMoveToElement,
    },
    {
      text: BTN_ETC,
      icon: "ThreeDots",
      onClick: etc.onMoveToElement,
    },
  ];

  return (
    <Wrapper gap="14px">
      <Heading
        content="바로가기"
        h={2}
        color={styles.styleColor.gray100}
        isLine={true}
      />
      {content.map((con) => (
        <BtnTrans
          text={con.text}
          icon={con.icon}
          onClick={con.onClick}
          dire={true}
        />
      ))}
    </Wrapper>
  );
}
export default Shortcut;
