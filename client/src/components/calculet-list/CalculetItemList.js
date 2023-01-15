import Heading from "../atom-components/Heading";
import { FlexColumnLayout, FlexRowLayout } from "../Layout";
import styles from "../styles";
import CalculetItem from "./CalculetItem";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React, { useCallback, useEffect } from "react";
import URL from "../PageUrls";

// trigger

const Wrapper = styled(FlexRowLayout)`
  flex-wrap: wrap;
`;
/**
 * 대분류1, 소분류*, 계산기* 목록들을 나열하여 반환하는 컴포넌트
 * @param {object} item 나열할 대분류, 소분류, 계산기 정보
 * @param {*} contentsShortcut 바로가기 버튼에 대한 정보 (ref 참조 위함)
 * @param {*} setIsActive 바로가기 버튼 활성화 함수
 * @param {*} scrollPosition 현재 스크롤 Y 위치
 */
function CalculetItemList({
  item,
  contentsShortcut,
  setIsActive,
  scrollPosition,
}) {
  const navigate = useNavigate();

  /**
   * 각 바로가기 버튼에 맞는 대분류의 위치 얻기
   * @param {int} index 바로가기 버튼의 index
   */
  const locationRef = useCallback(
    (index) => {
      return Math.round(
        contentsShortcut[index].itemRef.element.current.getBoundingClientRect()
          .top +
          window.pageYOffset -
          80
      );
    },
    [contentsShortcut]
  );
  /**
   * Ref의 위치와 스크롤 Y 위치를 비교하여, 스크롤 Y 에 따라 바로가기 버튼 활성화
   * @param {int} index 바로가기 버튼의 index
   */
  const checkScroll = useCallback(
    (index) => {
      const scrollY = Math.round(scrollPosition);
      return (
        scrollY >= locationRef(index) &&
        contentsShortcut[index] &&
        scrollY < locationRef(index + 1)
      );
    },
    [contentsShortcut, locationRef, scrollPosition]
  );
  const onHandlerSetIsActive = useCallback(() => {
    for (let i = 0; i < contentsShortcut.length; i++)
      if (checkScroll(i)) setIsActive(i);
  }, [checkScroll, contentsShortcut.length, setIsActive]);
  /**
   * useEffect 경고 막기 위함
   */
  useEffect(() => {
    onHandlerSetIsActive();
  }, [onHandlerSetIsActive]);

  /**
   * 계산기 나열
   * @param {object} calculet 계산기 정보 (id, title)
   */
  function handleCalculet(calculet) {
    return (
      <CalculetItem
        key={calculet.id}
        content={calculet.title}
        onClick={() => navigate(URL.CALCULET + calculet.id)}
      />
    );
  }
  /**
   * 소분류 카테고리 나열
   * @param {object} sub 소분류 카테고리 정보 (categorySub, subItems)
   * @param {string} categoryMain 해당 소분류의 대분류가 '기타' 인지 확인하기 위한 대분류 이름
   */
  function handleSubList(sub, categoryMain) {
    return (
      <FlexColumnLayout key={sub.categorySub}>
        {categoryMain !== "기타" && (
          <Heading
            key={sub.categorySub}
            content={sub.categorySub}
            h={2}
            isLine={true}
          />
        )}
        <Wrapper>
          {sub.subItems.length ? (
            sub.subItems.map((calculet) => handleCalculet(calculet))
          ) : (
            <CalculetItem content="존재하지 않습니다." item={false} />
          )}
        </Wrapper>
      </FlexColumnLayout>
    );
  }
  /**
   * 대분류 카테고리 나열
   * @param {object} main 대분류 카테고리 정보 (categoryMain, mainItemss)
   * @param {int} mainIndex 대분류 카테고리 인덱스
   */
  function handleMainList(main, mainIndex) {
    const etcGap = main.categoryMain !== "기타" ? "28px" : "0px";
    return (
      <FlexColumnLayout gap={etcGap} key={main.categoryMain}>
        <Heading
          key={main.categoryMain}
          ref={contentsShortcut[mainIndex].itemRef.element}
          content={main.categoryMain}
          h={1}
          color={styles.styleColor.blue900}
          isLine={main.categoryMain === "기타" && true}
        />
        {main.mainItems.length ? (
          main.mainItems.map((sub) => handleSubList(sub, main.categoryMain))
        ) : (
          <CalculetItem content="존재하지 않습니다." item={false} />
        )}
      </FlexColumnLayout>
    );
  }
  return (
    <FlexColumnLayout gap="56px">
      {item.map((main, mainIndex) => handleMainList(main, mainIndex))}
    </FlexColumnLayout>
  );
}
export default CalculetItemList;
