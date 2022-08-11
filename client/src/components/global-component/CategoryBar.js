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
    const categorySubLength = contents[i].categorySub.length;
    const sub_toggle = [];
    for (let j = 0; j < categorySubLength; j++) {
      // 소분류 toggle 상태
      sub_toggle.push({ toggle: false });
    }
    // 대분류 toggle + 소분류 toggle
    categoryToggleSet.push({ toggle: false, sub_toggle });
  }
  const [categoryToggle, setCategoryToggle] = useState(categoryToggleSet);
  // 대분류 toggle 값을 반전시키는 버튼 이벤트 함수
  function onToggleMain(main) {
    setCategoryToggle(
      categoryToggle.map((mainTog, index) =>
        main === index ? { ...mainTog, toggle: !mainTog.toggle } : mainTog
      )
    );
  }
  // 소분류 toggle 값을 반전시키는 버튼 이벤트 함수
  function onToggleSub(main, sub) {
    const newCategoryToggle = categoryToggle.map((mainTog, index) =>
      main === index
        ? {
            ...mainTog,
            sub_toggle: mainTog.sub_toggle.map((subTog, idx) =>
              sub === idx ? { ...subTog, toggle: !subTog.toggle } : subTog
            ),
          }
        : mainTog
    );
    setCategoryToggle(newCategoryToggle);
  }
  return (
    <Positioner aniMode={aniMode}>
      <FlexColumnLayout gap="3px">
        {contents.map((main, index) => (
          <>
            <BtnTransToggle
              key={main.categoryMain}
              text={main.categoryMain}
              isToggle={categoryToggle[index].toggle}
              isCenter={false}
              onClick={() => onToggleMain(index)}
            />
            {categoryToggle[index].toggle && (
              <StyledIndent indent={1.5}>
                {main.categorySub.map((sub, idx) => (
                  <>
                    <BtnTransToggle
                      key={sub.name}
                      text={sub.name}
                      isToggle={categoryToggle[index].sub_toggle[idx].toggle}
                      isCenter={false}
                      onClick={() => onToggleSub(index, idx)}
                    />
                    {categoryToggle[index].sub_toggle[idx].toggle && (
                      <StyledIndent indent={1.5}>
                        {sub.calculets.map((calculet) => (
                          <BtnTrans
                            key={calculet.id}
                            text={"• " + calculet.title}
                            isCenter={false}
                            onClick={() => {
                              navigate(CALCULET + calculet.id);
                              setAniMode(false);
                            }}
                          />
                        ))}
                      </StyledIndent>
                    )}
                  </>
                ))}
              </StyledIndent>
            )}
          </>
        ))}
      </FlexColumnLayout>
    </Positioner>
  );
}
export default CategoryBar;
