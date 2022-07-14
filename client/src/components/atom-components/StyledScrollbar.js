import React from "react";
import styled from "styled-components";

const StyledScrollbar = styled.nav`
  overflow: auto;
  display: flex;
  width: 100%;
  &::-webkit-scrollbar {
    // 세로 스크롤 넓이
    width: 8px;
    // 가로 스크롤 높이
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  // 스크롤 막대
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

// 리렌더링 방지 memo
export default React.memo(StyledScrollbar);
