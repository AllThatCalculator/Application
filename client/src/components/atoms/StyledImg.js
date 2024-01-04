import styled from "styled-components";

/**
 * 사진 width x height
 */
const StyledImg = styled.img`
  display: flex;
  align-self: center;
  width: ${(props) => props.width};
  height: ${(props) => props.heigth};

  -webkit-user-drag: none;
`;

export default StyledImg;
