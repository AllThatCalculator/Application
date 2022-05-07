import styled from "styled-components";
import propTypes from "prop-types";
import { React } from "react";
import styles from "../styles.js";

//스타일드 버튼
const StyledButton = styled.button`
  display: flex;
  flex-direction: column;

  width: 255px;
  height: 100px;

  padding: ${styles.styleLayout.basic100};

  background: ${styles.styleColor.white100.color};
  opacity: ${styles.styleColor.white100.opacity};
  color: ${styles.styleColor.black};

  ${styles.styleBorder.basic200};

  cursor: pointer;
`;
// 프로필, 계산기이름 감쌈
const Positioner = styled.div`
  display: flex;
  margin-bottom: 5px;
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
// 간격
const Spacer = styled.div`
  margin-right: 5px;
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
          <Spacer>
            <StyledProfileImg profileImg={profileImg}></StyledProfileImg>
          </Spacer>
          <StyledName>{name}</StyledName>
        </Positioner>
        <StyledDescription>{description}</StyledDescription>
      </StyledButton>
    </>
  );
}
BoxRecCalculator.propTypes = {
  name: propTypes.string.isRequired,
  description: propTypes.string,
  profileImg: propTypes.string,
};
export default BoxRecCalculator;
