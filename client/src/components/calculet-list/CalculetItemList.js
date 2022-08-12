import Heading from "../atom-components/Heading";
import { FlexColumnLayout, FlexRowLayout } from "../Layout";
import styles from "../styles";
import CalculetItem from "./CalculetItem";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React, { useEffect } from "react";
import { CALCULET } from "../PageUrls";

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
  function locationRef(index) {
    return Math.round(
      contentsShortcut[index].itemRef.element.current.getBoundingClientRect()
        .top +
        window.pageYOffset -
        80
    );
  }
  /**
   * Ref의 위치와 스크롤 Y 위치를 비교하여, 스크롤 Y 에 따라 바로가기 버튼 활성화
   * @param {int} index 바로가기 버튼의 index
   */
  function checkScroll(index) {
    const scrollY = Math.round(scrollPosition);
    return (
      scrollY >= locationRef(index) &&
      contentsShortcut[index] &&
      scrollY < locationRef(index + 1)
    );
  }
  useEffect(() => {
    [0, 1, 2, 3, 4].map((index) => {
      if (checkScroll(index)) setIsActive(index);
    });
  }, [scrollPosition]);

  return (
    <FlexColumnLayout gap="56px">
      {item.map((main, index) => (
        <FlexColumnLayout gap="28px">
          <Heading
            key={main.categoryMain}
            ref={contentsShortcut[index].itemRef.element}
            content={main.categoryMain}
            h={1}
            color={styles.styleColor.blue900}
          />
          {main.mainItems.length ? (
            main.mainItems.map((sub) => (
              <FlexColumnLayout>
                <Heading
                  key={sub.categorySub}
                  content={sub.categorySub}
                  h={2}
                  isLine={true}
                />
                <Wrapper>
                  {sub.subItems.length ? (
                    sub.subItems.map((calculet) => (
                      <CalculetItem
                        content={calculet.title}
                        onClick={() => navigate(CALCULET + calculet.id)}
                      />
                    ))
                  ) : (
                    <CalculetItem content="존재하지 않습니다." item={false} />
                  )}
                </Wrapper>
              </FlexColumnLayout>
            ))
          ) : (
            <CalculetItem content="존재하지 않습니다." item={false} />
          )}
        </FlexColumnLayout>
      ))}
    </FlexColumnLayout>
  );
}
export default CalculetItemList;
