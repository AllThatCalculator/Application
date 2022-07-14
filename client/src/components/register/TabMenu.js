import styled from "styled-components";
import { StyledIcon } from "../atom-components/ButtonTemplate.js";
import { FlexRowLayout } from "../Layout.js";
import styles from "../styles.js";

/**
 * 탭의 가장 바깥 스타일 정의
 */
const WrapperTab = styled(FlexRowLayout)`
  gap: ${styles.styleLayout.basic200};
  border-bottom: 1px solid ${styles.styleColor.blue50};
`;

/**
 * 기본 탭 버튼 배경 스타일 정의
 * - props로 현재 선택된 값(item)과 해당 탭의 text를 받아서 스타일 지정
 */
const StyledTapBackground = styled.div`
  padding: ${styles.styleLayout.basic200};
  color: ${styles.styleColor.black};

  ${(props) =>
    props.text === props.item
      ? `${styles.sytleText.buttonWhite}`
      : `${styles.sytleText.text100}`};

  border-bottom: ${(props) =>
    props.text === props.item
      ? `4px solid ${styles.styleColor.green100}`
      : `none`};

  cursor: pointer;
`;

/**
 * 기본 탭 버튼 스타일 정의
 */
const StyledButton = styled(FlexRowLayout)`
  padding: ${styles.styleLayout.basic50};
  gap: ${styles.styleLayout.basic200};
  border-radius: 7px;
  &:hover {
    background: ${styles.styleColor.green25a};
  }
`;

/**
 * 탭의 아이콘 스타일 정의
 */
const StyledTapIcon = styled.div`
  pointer-events: none;
`;

/**
 * 탭 안의 버튼 컴포넌트
 * @param {string, string, boolean, function} param0
 * text: 버튼 텍스트
 * icon: 버튼 아이콘
 * isClick: 지금 클릭되어 있는지 확인하는 변수
 * onClick: 버튼 클릭 함수
 */
function TabButton({ text, icon, item, onClick }) {
  return (
    <StyledTapBackground id={text} onClick={onClick} text={text} item={item}>
      <StyledButton id={text}>
        <StyledTapIcon id={text}>
          <StyledIcon name={icon} />
        </StyledTapIcon>
        <div id={text}>{text}</div>
      </StyledButton>
    </StyledTapBackground>
  );
}

/**
 * 탭 메뉴 컴포넌트
 * @param {object array} param0
 * tabInforms: 탭의 메뉴 정보가 담긴 객체 배열
 * - text: 탭 메뉴 text
 * - icon: 탭 메뉴 icon
 * - item: 현재 선택된 값
 * - onClick: 클릭 시 함수
 */
function TabMenu({ tabs }) {
  return (
    <WrapperTab>
      {tabs.map((menu, key) => (
        <TabButton
          text={menu.text}
          icon={menu.icon}
          item={menu.item}
          onClick={menu.onClick}
          key={key}
        />
      ))}
    </WrapperTab>
  );
}

export { TabButton, TabMenu };
