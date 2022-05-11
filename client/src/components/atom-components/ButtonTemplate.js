import styled from "styled-components";
import styles from "../styles.js";
import { React } from "react";
import { svgPath } from "./svgs/svgPath";
// 스타일드 기본 버튼
const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  min-width: max-content;
  align-items: center;
  gap: ${styles.styleLayout.basic700};

  padding: ${styles.styleLayout.basic100};

  background: ${styles.styleColor.white300};
  color: ${styles.styleColor.blue900};
  ${styles.styleBorder.basic100};

  cursor: pointer;
`;
// 스타일드 기본 텍스트
const StyledText = styled.div`
  flex: none;
  ${styles.sytleText.text100}
`;
// 스타일드 기본 아이콘
const ImgIcon = styled.object`
  color: ${styles.styleColor.blue900};
`;
const StyledDiv = styled.div`
  display: flex;
`;
//========================================================
// 흰색버튼
const StyledBtnWhite = styled(StyledButton)`
  ${styles.styleEffect.opacity100};
`;
const StyledBtnWhiteText = styled(StyledText)`
  ${styles.sytleText.buttonWhite};
`;
//========================================================
// 파란버튼
const StyledBtnBlue = styled(StyledButton)`
  padding: ${styles.styleLayout.basic400};

  background: ${styles.styleColor.blue900};
  color: ${styles.styleColor.green100};
  ${styles.styleBorder.basic200};
  ${styles.styleEffect.opacity100};
`;
const StyledBtnBlueText = styled(StyledText)`
  ${styles.sytleText.buttonBlue}
`;
//========================================================
// 회색버튼
const StyledBtnGray = styled(StyledButton)`
  padding: ${styles.styleLayout.basic700};
  background: ${styles.styleColor.blue50};
  color: ${styles.styleColor.blue900};
  ${styles.styleBorder.basic100};
`;
const StyledBtnGrayText = styled(StyledText)`
  ${styles.sytleText.text200};
`;

function ButtonTemplate({ text, icon }) {
  return (
    <>
      <StyledBtnBlue>
        {icon === undefined ? (
          ""
        ) : (
          <StyledDiv>
            <ImgIcon data={svgPath[icon]} className={icon} />
          </StyledDiv>
        )}
        <StyledText>{text}</StyledText>
      </StyledBtnBlue>
    </>
  );
}
function BtnWhite({ text, icon }) {
  return (
    <>
      <StyledBtnWhite>
        {icon === undefined ? (
          ""
        ) : (
          <StyledDiv>
            <ImgIcon data={svgPath[icon]} className={icon} />
          </StyledDiv>
        )}
        <StyledBtnWhiteText>{text}</StyledBtnWhiteText>
      </StyledBtnWhite>
    </>
  );
}
function BtnBlue({ text, icon }) {
  return (
    <>
      <StyledBtnBlue>
        {icon === undefined ? (
          ""
        ) : (
          <StyledDiv>
            <ImgIcon data={svgPath[icon]} className={icon} />
          </StyledDiv>
        )}
        <StyledBtnBlueText>{text}</StyledBtnBlueText>
      </StyledBtnBlue>
    </>
  );
}
function BtnGray({ text, icon }) {
  return (
    <>
      <StyledBtnGray>
        {icon === undefined ? (
          ""
        ) : (
          <StyledDiv>
            <ImgIcon data={svgPath[icon]} className={icon} />
          </StyledDiv>
        )}
        <StyledBtnGrayText>{text}</StyledBtnGrayText>
      </StyledBtnGray>
    </>
  );
}
export { ButtonTemplate, BtnWhite, BtnBlue, BtnGray };
