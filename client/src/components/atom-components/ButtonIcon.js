import styled from "styled-components";
import propTypes from "prop-types";
import { React } from "react";
import styles from "../styles.js";

import { Icons } from "./Icons.js";
//스타일드 버튼
const StyledButton = styled.button`
  color: ${(props) =>
    props.color === "blue"
      ? `${styles.styleColor.blue900}`
      : `${styles.styleColor.white300}`};

  display: inline-flex;
  background-color: transparent;
  padding: 0;
  border: none;
  ${styles.styleEffect.opacity100};
  cursor: pointer;
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
function ButtonIcon({ text, icon, color }) {
  return (
    <>
      <StyledButton id={text} name={icon} color={color}>
        <StyledIcon id={text} name={icon}></StyledIcon>
      </StyledButton>
    </>
  );
}
ButtonIcon.propTypes = {
  text: propTypes.string.isRequired,
  icon: propTypes.string.isRequired,
  color: propTypes.string,
};
export default ButtonIcon;
