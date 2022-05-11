import styled from "styled-components";
import { React } from "react";
import styles from "../styles.js";
import { svgPath } from "./svgs/svgPath";
//스타일드 버튼
const StyledButton = styled.button`
  color: ${(props) =>
    props.color === "blue"
      ? `${styles.styleColor.blue900}`
      : `${styles.styleColor.white300}`};

  background-color: transparent;
  padding: 0;
  border: none;
  ${styles.styleEffect.opacity100};
  cursor: pointer;
`;
const ImgIcon = styled.img`
  width: 100%;
`;
//작은 아이콘 버튼
const StyledBtnSmallIcon = styled(StyledButton)`
  color: ${styles.styleSize.small};
`;
//중간 아이콘 버튼
const StyledBtnMiddleIcon = styled(StyledButton)`
  color: ${styles.styleSize.middle};
`;

// 검색창 안에 검색버튼용
const StyledBtnInputIcon = styled(StyledBtnSmallIcon)`
  position: absolute;
  top: 23%;
  right: 0%;
  width: 8%;
  right: 4%;
`;

/**
 *
 * @param {무슨 용도, 아이콘 이름, 파란색?하얀색?} param0
 * @returns
 */
function BtnSmallIcon({ text, icon, color }) {
  return (
    <>
      <StyledBtnSmallIcon id={text} name={icon} color={color}>
        <ImgIcon src={svgPath[icon]} />
      </StyledBtnSmallIcon>
    </>
  );
}
function BtnMiddleIcon({ text, icon, color }) {
  return (
    <>
      <StyledBtnSmallIcon id={text} name={icon} color={color}>
        <ImgIcon src={svgPath[icon]} />
      </StyledBtnSmallIcon>
    </>
  );
}
function BtnInputIcon({ text, icon, color }) {
  return (
    <>
      <StyledBtnInputIcon id={text} name={icon} color={color}>
        <ImgIcon src={svgPath[icon]} />
      </StyledBtnInputIcon>
    </>
  );
}
export { BtnSmallIcon, BtnMiddleIcon, BtnInputIcon };
