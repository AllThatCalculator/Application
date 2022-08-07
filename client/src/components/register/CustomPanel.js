import styled from "styled-components";
import StyledScrollbar from "../atom-components/StyledScrollbar";
import { FlexColumnLayout } from "../Layout";
import BoxClassName from "./BoxClassName";
import { Design, InputOutput, Save } from "./Designs";
import Guides from "./Guides";
import GuideText from "./GuideText";

/**
 * 패널을 감싸는 최상위 컴포넌트 스타일 정의
 */
const Wrapper = styled(FlexColumnLayout)`
  width: 100%;
`;

/**
 * 스크롤 있는 패널 스타일 정의
 */
const ScrollWrapper = styled(StyledScrollbar)`
  height: 300px;
`;

/**
 * 기본 커스텀 패널 컴포넌트
 * @param {string, array}
 * guide: 패널에 대한 설명
 * designs: BoxClassName에 대한 정보 배열
 */
function DefaultCustomPanel({ guide, designs }) {
  return (
    <Wrapper>
      <GuideText content={guide} />
      <BoxClassName designs={designs} />
    </Wrapper>
  );
}

/**
 * 스크롤 되는 커스텀 패널 컴포넌트
 * @param {string, array}
 * guide: 패널에 대한 설명
 * designs: BoxClassName에 대한 정보 배열
 */
function ScrollCustomPanel({ guide, designs }) {
  return (
    <Wrapper>
      <ScrollWrapper>
        <DefaultCustomPanel guide={guide} designs={designs} />
      </ScrollWrapper>
    </Wrapper>
  );
}

function CustomPanel() {
  return (
    <>
      <DefaultCustomPanel guide={Guides["InputOutput"]} designs={InputOutput} />
      {/* <DefaultCustomPanel guide={Guides["Save"]} designs={Save} /> */}
      <ScrollCustomPanel guide={Guides["Design"]} designs={Design} />
    </>
  );
}

export { DefaultCustomPanel, CustomPanel };
