import styled from "styled-components";
import { React } from "react";
import styles from "../styles.js";

//스타일드 버튼
const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  gap: ${styles.styleLayout.basic700};
  width: 255px;
  height: 100px;

  padding: ${styles.styleLayout.basic100};

  ${styles.styleColor.white100};
  color: ${styles.styleColor.black};

  ${styles.styleBorder.basic200};

  cursor: pointer;
`;
// 프로필, 계산기이름 감쌈
const Positioner = styled.div`
  display: flex;
  gap: ${styles.styleLayout.basic700};
`;
// 프로필
// 배경 바꿔야함 url(`${props.profileImg}`)
const StyledProfileImg = styled.div`
  height: 38px;
  width: 38px;
  background: ${styles.styleColor.blue900};
  border-radius: 100%;
`;
// 계산기 이름 감쌈
const StyledName = styled.div`
  ${styles.sytleText.text300};
  display: flex;
  align-items: center;
`;
const StyledDescription = styled.div`
  ${styles.sytleText.text100};
`;

/**
 *
 * @param {계산기 이름, 간단 설명, 프로필이미지} param0
 * @returns
 */
function BoxRecCalculator({ name, description, profileImg }) {
  return (
    <>
      <StyledButton id={name} description={description} profileImg={profileImg}>
        <Positioner>
          <StyledProfileImg profileImg={profileImg}></StyledProfileImg>
          <StyledName>{name}</StyledName>
        </Positioner>
        <StyledDescription>{description}</StyledDescription>
      </StyledButton>
    </>
  );
}

export default BoxRecCalculator;
