// import styled, { keyframes } from "styled-components";
// import propTypes from "prop-types";
// import { React } from "react";
// // import styles from "../styles.js";
// import { Icons } from "./Icons.js";

// //스타일드 애니메이션
// const transform = keyframes`
//   from {
//     transform: scale(1);
//   }
//   to {
//     transform: scale(0.95);
//   }
// `;
// //스타일드 버튼
// const StyledButton = styled.button`
//   display: flex;
//   flex-direction: row;

//   align-items: center;

//   padding: ${styles.styleLayout.basic400};

//   background: ${styles.styleColor.blue900};
//   color: ${styles.styleColor.green100};

//   ${styles.styleBorder.basic200};
//   ${styles.styleEffect.opacity100};

//   cursor: pointer;

//   &:active {
//     animation-duration: 0.7s;
//     animation-timing-function: ease-out;
//     animation-name: ${transform};
//     animation-fill-mode: forwards;
//   }
// `;

// // 스타일드 아이콘?
// const path = (props) => {
//   props.forEach((element) => <path d={element} />);
// };

// const StyledIcon = (props) => {
//   return (
//     <svg
//       stroke="currentColor"
//       fill="currentColor"
//       strokeWidth="0"
//       xmlns="http://www.w3.org/2000/svg"
//       height={Icons[props.name].height}
//       width={Icons[props.name].width}
//       viewBox={Icons[props.name].viewBox}
//     >
//       <path d={Icons[props.name].path[0]} />
//       <path d={Icons[props.name].path[1]} />
//     </svg>
//   );
// };
// //스타일드 텍스트
// const StyledText = styled.div`
//   ${styles.sytleText.buttonBlue}
// `;

// // 파란버튼
// /**
//  * 이벤트 나중에 구현
//  * onClickHandler onClick={onClickHandler}
//  * onClickHandler: propTypes.string */
// function ButtonBlue({ text, icon }) {
//   return (
//     <>
//       <StyledButton>
//         <div>
//           {icon === undefined ? (
//             ""
//           ) : (
//             <div style={{ marginRight: 10 }}>
//               <StyledIcon name={icon}></StyledIcon>
//             </div>
//           )}
//         </div>
//         <StyledText>{text}</StyledText>
//       </StyledButton>
//     </>
//   );
// }
// ButtonBlue.propTypes = {
//   text: propTypes.string.isRequired,
//   icon: propTypes.string,
// };
// export default ButtonBlue;
