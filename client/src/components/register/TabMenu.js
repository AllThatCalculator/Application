import styled from "styled-components";
import { StyledIcon } from "../atom-components/ButtonTemplate.js";
import styles from "../styles.js";

// 탭의 가장 바깥 스타일 정의
const StyledTab = styled.div`
  display: flex;
  flex-direction: row;
  background: ${styles.styleColor.white300};
  padding: 0px;
  gap: ${styles.styleLayout.basic200};
  border-bottom: 1px solid ${styles.styleColor.blue50};
`;

// 기본 탭 버튼 배경 스타일 정의
const StyledBg = styled.div`
  align-items: center;
  padding: ${styles.styleLayout.basic200};
  background: ${styles.styleColor.white300};
  ${styles.sytleText.text100};
  color: black;

  cursor: pointer;
`;

// 기본 탭 버튼 클릭됐을 때 스타일 정의
const StyledBgClicked = styled(StyledBg)`
  ${styles.sytleText.buttonWhite};
  border-bottom: 4px solid ${styles.styleColor.green100};
`;

// 기본 탭 버튼 스타일 정의
const StyledButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${styles.styleColor.white300};
  padding: ${styles.styleLayout.basic50};
  gap: ${styles.styleLayout.basic200};
  border-radius: 7px;
  &:hover {
    background: ${styles.styleColor.green25a};
  }
`;

/**
 * 탭 안의 버튼 컴포넌트
 * @param {string, string, boolean, function} param0
 * text: 버튼 텍스트
 * icon: 버튼 아이콘
 * isClick: 지금 클릭되어 있는지 확인하는 변수
 * onClick: 버튼 클릭 함수
 */
function TabButton({ text, icon, isClick, onClick }) {
  return (
    <>
      {isClick ? (
        <StyledBgClicked id={text} onClick={onClick}>
          <StyledButton id={text}>
            {icon && <StyledIcon id={text} name={icon}></StyledIcon>}
            <div id={text}>{text}</div>
          </StyledButton>
        </StyledBgClicked>
      ) : (
        <StyledBg id={text} onClick={onClick}>
          <StyledButton id={text}>
            {icon && <StyledIcon id={text} name={icon}></StyledIcon>}
            <div id={text}>{text}</div>
          </StyledButton>
        </StyledBg>
      )}
    </>
  );
}

/**
 * 탭 메뉴 컴포넌트
 * @param {object array} param0
 * tabInforms: 탭의 메뉴 정보가 담긴 객체 배열
 * - text: 탭 메뉴 text
 * - icon: 탭 메뉴 icon
 * - isClick: 현재 선택됐는지 확인
 * - onClick: 클릭 시 함수
 */
function TabMenu({ tabs }) {
  return (
    <StyledTab>
      {tabs.map((menu, key) => (
        <TabButton
          text={menu.text}
          icon={menu.icon}
          isClick={menu.isClick}
          onClick={menu.onClick}
          key={key}
        />
      ))}
    </StyledTab>
  );
}

export { TabButton, TabMenu };
