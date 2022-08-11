import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { BtnTrans, BtnTransToggle } from "../atom-components/ButtonTemplate";
import { DESKTOP, FlexColumnLayout, PHONE, TABLET } from "../Layout";
import { CALCULET } from "../PageUrls";
import styles from "../styles";
/**
 * 스타일드 애니메이션
 */
const slideIn = keyframes`
  from {
    margin-left: -100%;
  }
  to {
    margin-left: 0;
  }
`;
const slideInOut = keyframes`
  from {
    margin-left: 0;
  }
  to {
    margin-left: -100%;
  }
`;
const Positioner = styled.div`
  position: fixed;
  top: 60px;
  left: 0;

  @media (min-width: ${PHONE}) and (max-width: ${TABLET}) {
    ${styles.styleSize.categoryPhone};
  }
  @media (min-width: ${TABLET}) and (max-width: ${DESKTOP}) {
    ${styles.styleSize.categoryTablet};
  }
  @media screen and (min-width: ${DESKTOP}) {
    ${styles.styleSize.categoryDesktop};
  }

  background: ${styles.styleColor.white300};
  padding: ${styles.styleLayout.basic300} ${styles.styleLayout.basic700};
  height: 100%;
  z-index: 101;
  ${styles.styleEffect.opacity100};
  animation: ${(props) =>
    props.aniMode === true
      ? css`
          ${slideIn}
        `
      : css`
          ${slideInOut}
        `};
  animation-duration: 0.4s;
  animation-fill-mode: forwards;
`;

/**
 * indent만큼 들여쓰기
 */
const StyledIndent = styled.div`
  margin-left: ${(props) => props.indent}em;
`;
/**
 * 카테고리 바 구현
 *
 * @param {object, boolean} param0
 *
 * contents : <배열> 카테고리 바에 들어갈 내용
 * -> categoryMain : 대분류
 * -> categorySub : <배열> 소분류, 계산기들
 *    -> name: 소분류 이름, calculets: 계산기들
 * aniMode : 카테고리바 열 때 slideIn, 닫을 때 slideInOut 으로 작동할 수 있도록 animation의 mode를 제어하는 state
 * setAniMode : aniMode 관리 함수
 */
function CategoryBar({ contents, aniMode, setAniMode }) {
  const navigate = useNavigate();
  // < 카테고리 내용 >
  // 대분류 개수
  const categoryMainLength = contents.length;
  // toggle 상태를 useState 로 관리하기 위한 초기 toggle 세팅 (대분류와 소분류의 각 toggle 상태)
  const categoryToggleSet = [];
  for (let i = 0; i < categoryMainLength; i++) {
    // 소분류 개수
    const categorySubLength = contents[i].mainItems.length;
    const subToggle = [];
    for (let j = 0; j < categorySubLength; j++) {
      // 소분류 toggle 상태
      subToggle.push({ toggle: false });
    }
    // 대분류 toggle + 소분류 toggle
    categoryToggleSet.push({ toggle: false, subToggle });
  }
  const [categoryToggle, setCategoryToggle] = useState(categoryToggleSet);
  // 대분류 toggle 값을 반전시키는 버튼 이벤트 함수
  function onToggleMain(mainIndex) {
    const newCategoryToggle = [...categoryToggle];
    newCategoryToggle[mainIndex].toggle = !categoryToggle[mainIndex].toggle;
    setCategoryToggle(newCategoryToggle);
  }
  // 소분류 toggle 값을 반전시키는 버튼 이벤트 함수
  function onToggleSub(mainIndex, subIndex) {
    const newCategoryToggle = [...categoryToggle];
    newCategoryToggle[mainIndex].subToggle[subIndex].toggle =
      !categoryToggle[mainIndex].subToggle[subIndex].toggle;
    setCategoryToggle(newCategoryToggle);
  }
  /**
   * 계산기 바로가기 생성하는 함수
   * @param {object} calculet 계산기 id, title 포함하는 객체
   */
  function handleLeaf(calculet) {
    return (
      <BtnTrans
        key={calculet.id}
        text={"• " + calculet.title}
        isCenter={false}
        onClick={() => {
          navigate(CALCULET + calculet.id);
          setAniMode(false);
        }}
      />
    );
  }
  /**
   * 계산기를 소분류로 묶어서 반환하는 함수
   * @param {object} sub - 소분류 객체
   * @param {number} subIndex - 소분류 인덱스
   * @param {number} mainIndex - 대분류 인덱스
   * @param {boolean} toggle - 열려있는지 여부
   */
  function handleSub(sub, subIndex, mainIndex, toggle) {
    return (
      <div key={sub.categorySub}>
        <BtnTransToggle
          text={sub.categorySub}
          isToggle={toggle}
          isCenter={false}
          onClick={() => onToggleSub(mainIndex, subIndex)}
        />
        {toggle && (
          <StyledIndent indent={1.5}>
            {sub.subItems.map(handleLeaf)}
          </StyledIndent>
        )}
      </div>
    );
  }
  /**
   * 계산기를 대분류로 묶어서 반환하는 함수
   * @param {object} main - 대분류 객체
   * @param {number} mainIndex - 소분류 인덱스
   * @param {boolean} toggle - 열려있는지 여부
   */
  function handleMain(main, mainIndex, toggle) {
    return (
      <div key={main.categoryMain}>
        <BtnTransToggle
          text={main.categoryMain}
          isToggle={toggle}
          isCenter={false}
          onClick={() => onToggleMain(mainIndex)}
        />
        {toggle && (
          <StyledIndent indent={1.5}>
            {main.mainItems.map((sub, subIndex) =>
              handleSub(
                sub,
                subIndex,
                mainIndex,
                categoryToggle[mainIndex].subToggle[subIndex].toggle
              )
            )}
          </StyledIndent>
        )}
      </div>
    );
  }
  return (
    <Positioner aniMode={aniMode}>
      <FlexColumnLayout gap="3px">
        {contents.map((main, mainIndex) =>
          handleMain(main, mainIndex, categoryToggle[mainIndex].toggle)
        )}
      </FlexColumnLayout>
    </Positioner>
  );
}

export default CategoryBar;
