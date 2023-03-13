// import styled from "styled-components";
// import { FlexRowLayout } from "../Layout";
// import styles from "../styles";
// import CalculetDesc from "./CalculetDesc";
// import CalculetStatistic from "./CalculetStatistic";

// /**
//  * 위 구분선 스타일 정의
//  */
// const StyledLine = styled(FlexRowLayout)`
//   width: 100%;
//   border-top: 1px solid ${styles.styleColor.blue50};
//   padding: ${styles.styleLayout.basic350};
//   gap: ${styles.styleLayout.basic700};
// `;

// /**
//  * 비율 조정 컴포넌트
//  */
// const WrapperRatio = styled(FlexRowLayout)`
//   flex: ${(props) => props.ratio};
// `;

// /**
//  * 검색 결과 계산기 컴포넌트
//  * @param {*} props
//  * -> title
//  * -> description
//  * -> categoryMain
//  * -> categorySub
//  * -> userName
//  * -> viewCnt
//  * -> likeCnt
//  * -> bookmarkCnt
//  */
// function SearchCalculet(props) {
//   return (
//     <StyledLine>
//       <WrapperRatio ratio="5">
//         <CalculetDesc
//           id={props.id}
//           title={props.title}
//           description={props.description}
//           categoryMain={props.categoryMain}
//           categorySub={props.categorySub}
//           userName={props.userName}
//         />
//       </WrapperRatio>
//       <WrapperRatio ratio="1">
//         <CalculetStatistic
//           viewCnt={props.viewCnt}
//           likeCnt={props.likeCnt}
//           bookmarkCnt={props.bookmarkCnt}
//         />
//       </WrapperRatio>
//     </StyledLine>
//   );
// }
// export default SearchCalculet;
