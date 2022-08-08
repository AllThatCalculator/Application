import Heading from "../atom-components/Heading";
import { FlexColumnLayout, FlexRowLayout } from "../Layout";
import styles from "../styles";
import CalculetItem from "./CalculetItem";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React from "react";

const Wrapper = styled(FlexRowLayout)`
  flex-wrap: wrap;
`;
/**
 * 대분류1, 소분류*, 계산기* 목록들을 나열하여 반환하는 컴포넌트
 * - 대분류
 *    - 소분류 o
 *      - 계산기 o
 *      - 계산기 x
 *    - 소분류 x
 *      - 계산기 o
 * @param {object} item 대분류, 소분류에 따른 계산기들
 * @param {object} math 대분류 수학 Ref, Ref로 스크롤 이동하는 함수
 * @param {object} science 대분류 과학-공학 Ref, Ref로 스크롤 이동하는 함수
 * @param {object} economy 대분류 경제-사회 Ref, Ref로 스크롤 이동하는 함수
 * @param {object} daily 대분류 일상 Ref, Ref로 스크롤 이동하는 함수
 * @param {object} etc 대분류 기타 Ref, Ref로 스크롤 이동하는 함수
 */
function CalculetItemList({ item, math, science, economy, daily, etc }) {
  const navigate = useNavigate();

  /**
   * 각 대분류의 Ref
   */
  const elementRef = [
    math.element,
    science.element,
    economy.element,
    daily.element,
    etc.element,
  ];

  return (
    <FlexColumnLayout gap="56px">
      {item.map((main, index) => (
        <FlexColumnLayout gap="28px">
          <Heading
            key={main.category_main}
            ref={elementRef[index]}
            content={main.category_main}
            h={1}
            color={styles.styleColor.blue900}
          />
          {main.main_items.length ? (
            main.main_items.map((sub) => (
              <FlexColumnLayout>
                <Heading
                  key={sub.category_sub}
                  content={sub.category_sub}
                  h={2}
                  isLine={true}
                />
                <Wrapper>
                  {sub.sub_items.length ? (
                    sub.sub_items.map((calculet) => (
                      <CalculetItem
                        content={calculet.title}
                        onClick={() => navigate("/:" + calculet.id)}
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
