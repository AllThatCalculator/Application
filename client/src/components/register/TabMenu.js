import styled from "styled-components";
import styles from "../styles";
import { Icons } from "../atom-components/Icons";

// 스타일드 탭
const StyledTab = styled.div`
  display: flex;
  flex-direction: row;
  background: ${styles.styleColor.white300};
  padding: 0px;
  gap: ${styles.styleLayout.basic200};
  border-bottom: 1px solid ${styles.styleColor.blue50};
`;

// 스타일드 기본 탭 버튼 배경
const StyledBg = styled.div`
  align-items: center;
  padding: ${styles.styleLayout.basic200};
  background: ${styles.styleColor.white300};
  ${styles.sytleText.text100};
  color: black;

  cursor: pointer;
`;

// 스타일드 기본 탭 버튼 클릭됨
const StyledBgClicked = styled.div`
  align-items: center;
  padding: ${styles.styleLayout.basic200};
  background: ${styles.styleColor.white300};
  color: black;
  ${styles.sytleText.text100};

  & {
  }

  cursor: pointer;
`;

// 스타일드 기본 탭 버튼
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

// 스타일드 기본 탭 버튼 아이콘
const StyledIcon = (props) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      xmlns="http://www.w3.org/2000/svg"
      height={Icons[props.name].height}
      width={Icons[props.name].width}
      viewBox={Icons[props.name].viewBox}
    >
      <path d={Icons[props.name].path[0]} />
      {Icons[props.name].path[1] && <path d={Icons[props.name].path[1]} />}
    </svg>
  );
};

function ButtonTab({ text, icon, onClick }) {
  return (
    <StyledBg id={text} onClick={onClick}>
      <StyledButton>
        {icon && <StyledIcon name={icon}></StyledIcon>}
        <>{text}</>
      </StyledButton>
    </StyledBg>
  );
}

function TabMenu() {
  function onClickButtonTab(event) {
    console.log(event.target);
  }
  return (
    <StyledTab>
      <ButtonTab text="코드 작성" icon="Code" onClick={onClickButtonTab} />
      <ButtonTab text="미리 보기" icon="Eye" onClick={onClickButtonTab} />
    </StyledTab>
  );
}

export default TabMenu;
