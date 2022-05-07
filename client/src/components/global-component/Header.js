import styled from "styled-components";
import { React } from "react";
import ButtonIcon from "../atom-components/ButtonIcon.js";
import LogoHeader from "../atom-components/LogoHeader.js";
import BoxSearchInput from "../atom-components/BoxSearchInput.js";
import ButtonWhite from "../atom-components/ButtonWhite.js";
import styles from "../styles.js";

// 상단 고정
const Positioner = styled.div`
  display: flex;
  flex-direction: column;
  top: 0px;
  width: 100%;

  padding: ${styles.styleLayout.basic600};
`;
// 내용 정렬
const WhiteBackground = styled.div`
  display: flex;
  justify-content: space-around;
`;
const HeaderContents = styled.div`
  display: flex;

  flex-direction: row;
  align-items: center;
`;

// 간격
const Spacer = styled.div`
  margin: 0px 10px;
`;

function Header() {
  return (
    <Positioner>
      <WhiteBackground>
        <HeaderContents>
          <Spacer>
            <ButtonIcon text="메뉴" icon="BsList" />
          </Spacer>
          <Spacer>
            <LogoHeader />
          </Spacer>
        </HeaderContents>
        <HeaderContents>
          <Spacer>
            <BoxSearchInput text="계산하고 싶은 것을 검색하세요." />
          </Spacer>
          <Spacer>
            <ButtonIcon text="검색" icon="BsSearch" color="blue" />
          </Spacer>
          <Spacer>
            <ButtonWhite text="로그인" icon="BsPerson" />
          </Spacer>
        </HeaderContents>
      </WhiteBackground>
    </Positioner>
  );
}

export default Header;
