// import styled from "styled-components";
// import propTypes from "prop-types";
// import { React, useState } from "react";
// // import styles from "../styles.js";
// import { Icons } from "./Icons.js";

// //스타일드 버튼
// const StyledButton = styled.button`
//   display: flex;
//   flex-direction: row;

//   align-items: center;

//   padding: ${styles.styleLayout.basic300};

//   background: ${styles.styleColor.blue50};
//   color: ${styles.styleColor.blue900};

//   ${styles.styleBorder.basic100};

//   cursor: pointer;
// `;

// // 스타일드 아이콘?
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
//       <path d={Icons[props.name].path} />
//     </svg>
//   );
// };
// //스타일드 텍스트
// const StyledText = styled.div`
//   ${styles.sytleText.text200}
// `;

// // 회색버튼
// /**
//  * 이벤트 나중에 구현
//  * onClickHandler onClick={onClickHandler}
//  * onClickHandler: propTypes.string */
// function ButtonGray({ text, toggle, onClick }) {
//   return (
//     <>
//       <StyledButton onClick={onClick}>
//         <div>
//           <div style={{ marginRight: 10 }}>
//             {toggle ? (
//               <StyledIcon name={`CaretDownFill`}></StyledIcon>
//             ) : (
//               <StyledIcon name={`CaretRightFill`}></StyledIcon>
//             )}
//           </div>
//         </div>
//         <StyledText>{text}</StyledText>
//       </StyledButton>
//     </>
//   );
// }
// ButtonGray.propTypes = {
//   text: propTypes.string.isRequired,
// };
// export default ButtonGray;
