import styled from "styled-components";
import propTypes from "prop-types";
import { React } from "react";
import styles from "../styles.js";

//스타일드 버튼
const StyledButton = styled.button`
  display: flex;

  align-items: center;
  justify-content: center;

  padding: ${styles.styleLayout.basic200};
  ${styles.styleSize.buttonOperator};

  background: ${styles.styleColor.blue200};
  color: ${styles.styleColor.white300};

  ${styles.styleBorder.basic100};
  ${styles.styleEffect.opacity100};

  cursor: pointer;

  &:hover {
    background: ${styles.styleColor.blue400};
  }
`;
//스타일드 텍스트
const StyledText = styled.div`
  ${styles.sytleText.text400}
`;

// 흰색버튼
/**
 * 이벤트 나중에 구현
 * onClickHandler onClick={onClickHandler}
 * onClickHandler: propTypes.string */
function ButtonOperator({ text }) {
  return (
    <>
      <StyledButton>
        <StyledText>{text}</StyledText>
      </StyledButton>
    </>
  );
}
ButtonOperator.propTypes = {
  text: propTypes.string.isRequired,
};
export default ButtonOperator;
