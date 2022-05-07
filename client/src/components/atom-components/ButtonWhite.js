import styled from "styled-components";
import propTypes from "prop-types";
import { React } from "react";
import styles from "../styles.js";
import { Icons } from "./Icons.js";

//스타일드 버튼
const StyledButton = styled.button`
  display: flex;
  flex-direction: row;

  align-items: center;

  padding: ${styles.styleLayout.basic100};

  background: ${styles.styleColor.white300};
  color: ${styles.styleColor.blue900};

  ${styles.styleBorder.basic100};
  ${styles.styleEffect.opacity100};

  cursor: pointer;

  &:hover {
    background: ${styles.styleColor.blue900};
    color: ${styles.styleColor.white300};
  }
`;

// 스타일드 아이콘?
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
      <path d={Icons[props.name].path} />
    </svg>
  );
};
//스타일드 텍스트
const StyledText = styled.div`
  ${styles.sytleText.buttonWhite}
`;

// 흰색버튼
/**
 * 이벤트 나중에 구현
 * onClickHandler onClick={onClickHandler}
 * onClickHandler: propTypes.string */
function ButtonWhite({ text, icon }) {
  return (
    <>
      <StyledButton>
        <div>
          {icon === undefined ? (
            ""
          ) : (
            <div style={{ marginRight: 10 }}>
              <StyledIcon name={icon}></StyledIcon>
            </div>
          )}
        </div>
        <StyledText>{text}</StyledText>
      </StyledButton>
    </>
  );
}
ButtonWhite.propTypes = {
  text: propTypes.string.isRequired,
  icon: propTypes.string,
};
export default ButtonWhite;
