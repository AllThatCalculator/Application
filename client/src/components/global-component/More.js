import styled from "styled-components";
import { React } from "react";
import ButtonWhite from "../atom-components/ButtonWhite.js";
import TextWhite from "../atom-components/TextWhite.js";

import styles from "../styles.js";

// 더보기 감싼거
const Positioner = styled.div`
  display: flex;
  flex-direction: column;
`;

// 간격
const Spacer = styled.div`
  margin: 10px 0px;
`;

function More() {
  return (
    <Positioner>
      <Spacer>
        <TextWhite text="Try all the calculators in the world" />
      </Spacer>
      <Spacer>
        <ButtonWhite text="더 보기" />
      </Spacer>
    </Positioner>
  );
}

export default More;
