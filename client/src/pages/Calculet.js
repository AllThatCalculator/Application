import ButtonBlue from "../components/atom-components/ButtonBlue";
import Recommend from "../components/global-component/Recommend";
import styled from "styled-components";

const Positioner = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  align-self: center;
  gap: 14px;
`;
function Calculet() {
  return (
    <Positioner>
      <ButtonBlue text="계산기 등록" icon="BsUpload" />
      <Recommend />
    </Positioner>
  );
}

export default Calculet;
