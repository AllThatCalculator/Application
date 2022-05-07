import styled from "styled-components";
import { React } from "react";
import ButtonIcon from "../atom-components/ButtonIcon.js";
import LogoHeader from "../atom-components/LogoHeader.js";
import BoxSearchInput from "../atom-components/BoxSearchInput.js";
import ButtonWhite from "../atom-components/ButtonWhite.js";
import TextWhite from "../atom-components/TextWhite.js";

import styles from "../styles.js";
import BoxRecCalculator from "../atom-components/BoxRecCalculator.js";
import MovePage from "./MovePage.js";

// 가장 크게 감쌀 거
const Positioner = styled.div`
  display: flex;
  width: 897px;
  flex-direction: column;
  align-items: center;
`;
function Container() {
  return <Positioner></Positioner>;
}

export default Container;
