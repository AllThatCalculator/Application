import styled from "styled-components";
import { React } from "react";
import LogoHeader from "../atom-components/LogoHeader.js";
import BoxSearchInput from "../atom-components/BoxSearchInput.js";
import {
  BtnSmallIcon,
  BtnMiddleIcon,
  BtnInputIcon,
} from "../atom-components/ButtonIcon.js";
import { svgPath } from "../atom-components/svgs/svgPath";
import styles from "../styles.js";
import {
  ButtonTemplate,
  BtnWhite,
  BtnBlue,
  BtnGray,
} from "../atom-components/ButtonTemplate";
// 상단 고정
const Positioner = styled.div`
  top: 0px;
  width: 100%;
  padding: ${styles.styleLayout.basic600};
`;
// 내용 정렬
const WhiteBackground = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
`;
const HeaderContents = styled.div`
  display: flex;
  gap: 10px;
`;

function Header() {
  return (
    <Positioner>
      <WhiteBackground>
        <HeaderContents>
          <BtnMiddleIcon text="메뉴" icon="List" color="white" />
          <LogoHeader />
        </HeaderContents>
        <HeaderContents>
          <BoxSearchInput text="계산하고 싶은 것을 검색하세요." />
          <BtnWhite text="로그인" icon="Person" />
        </HeaderContents>
      </WhiteBackground>
    </Positioner>
  );
}

export default Header;
