// import styled from "styled-components";
// import SmallTitle from "./SmallTitle.js";
// import { FlexRowLayout } from "../Layout.js";
// // import styles from "../styles.js";
// import { InputBox, InputBoxLine } from "./InputBox.js";
// import SelectBox from "./SelectBox.js";
// import { IconColorBox } from "../atom-components/BoxIcon.js";

// /**
//  * FlexRowLayout을 상속하는 비율 조정 컴포넌트
//  */
// const WrapperRatio = styled(FlexRowLayout)`
//   gap: ${styles.styleLayout.basic700};
//   flex: ${(props) => `${props.ratio}`};
// `;

// /**
//  * 설명 + 정보 입력 칸의 한 줄 컴포넌트 정의
//  * - isLine 으로 아래 밑줄 구분
//  */
// const Explanation = styled(FlexRowLayout)`
//   width: 100%;
//   padding-bottom: ${styles.styleLayout.basic900};
//   gap: ${styles.styleLayout.basic700};

//   border-bottom: ${(props) =>
//     props.isLine ? `1px solid ${styles.styleColor.blue50}` : `none`};
// `;

// /**
//  * 설명 + 정보 입력 칸에 InputBox를 사용하는 컴포넌트
//  * @param {string, string, string, function}
//  * isLine: 아래 밑줄 여부
//  * ratioLeft: 왼쪽 컴포넌트 비율
//  * ratioRight: 오른쪽 컴포넌트 비율
//  * icon: 아이콘
//  * explanation: 입력 칸의 정보에 대한 설명
//  * placeholder: 인풋 칸 초기값
//  * defaultValue: 인풋값
//  * onChange: 인풋값 관리하는 함수
//  */
// function ExplanationInputBox({
//   isLine,
//   ratioLeft,
//   ratioRight,
//   icon,
//   iconColor,
//   explanation,
//   placeholder,
//   defaultValue,
//   onChange,
//   type,
// }) {
//   return (
//     <Explanation isLine={isLine}>
//       <WrapperRatio ratio={ratioLeft}>
//         {icon && iconColor && <IconColorBox icon={icon} color={iconColor} />}
//         {explanation && <SmallTitle content={explanation} />}
//       </WrapperRatio>
//       <WrapperRatio ratio={ratioRight}>
//         <InputBox
//           type={type}
//           placeholder={placeholder}
//           defaultValue={defaultValue}
//           onChange={onChange}
//         />
//       </WrapperRatio>
//     </Explanation>
//   );
// }

// /**
//  * 설명 + 정보 입력 칸에 SelectBox로 이루어진 컴포넌트
//  * @param {string, array, array, arrya, function}
//  * isLine: 아래 밑줄 여부
//  * ratioLeft: 왼쪽 컴포넌트 비율
//  * ratioRight: 오른쪽 컴포넌트 비율
//  * explanation: 입력 칸의 정보에 대한 설명
//  * categorys: SelectBox 하나 객체
//  *  - options: 카테고리 옵션
//  *  - placeholder: SelectBox 선택 전 값
//  *  - selected: 선택된 옵션 값
//  *  - onChange: 선택 옵션 관리
//  *  - isLine: selectBox에 구분선 여부
//  *  - isValid: selectBox 활성화 여부
//  */
// function ExplanationSelectBox({
//   isLine,
//   ratioLeft,
//   ratioRight,
//   icon,
//   iconColor,
//   explanation,
//   categorys,
// }) {
//   return (
//     <Explanation isLine={isLine}>
//       <WrapperRatio ratio={ratioLeft}>
//         {icon && iconColor && <IconColorBox icon={icon} color={iconColor} />}
//         {explanation && <SmallTitle content={explanation} />}
//       </WrapperRatio>
//       <WrapperRatio ratio={ratioRight}>
//         {categorys.map((category, index) => (
//           <SelectBox
//             options={category.options}
//             placeholder={category.placeholder}
//             selected={category.selected}
//             onChange={category.onChange}
//             isLine={category.isLine}
//             isValid={category.isValid}
//             key={index}
//           />
//         ))}
//       </WrapperRatio>
//     </Explanation>
//   );
// }

// /**
//  * 이메일 입력하는 칸의 컴포넌트
//  * @param {string, function, string, function, array, function}
//  * isLine: 아래 밑줄 여부
//  * ratioLeft: 왼쪽 컴포넌트 비율
//  * ratioRight: 오른쪽 컴포넌트 비율
//  * address: 주소
//  * onChangeAddress: change 함수
//  * writtenDomain: 직접 입력한 도메인 값
//  * selectedDomain: select 박스에서 선택한 도메인 값
//  * onChangeDomain: change 함수
//  * emailAddressOptions: 이메일 옵션
//  * onChangeSelectedDomain: change 함수
//  */
// function ExplanationEmail({
//   isLine,
//   ratioLeft,
//   ratioRight,
//   address,
//   onChangeAddress,
//   writtenDomain,
//   selectedDomain,
//   onChangeDomain,
//   emailAddressOptions,
//   onChangeSelectedDomain,
// }) {
//   return (
//     <Explanation isLine={isLine}>
//       <WrapperRatio ratio={ratioLeft}>
//         <SmallTitle content="이메일" />
//       </WrapperRatio>
//       <WrapperRatio ratio={ratioRight}>
//         <InputBox
//           placeholder="주소"
//           defaultValue={address}
//           onChange={onChangeAddress}
//         />
//         <SmallTitle content="@" />
//         <InputBoxLine
//           placeholder="도메인"
//           defaultValue={writtenDomain}
//           onChange={onChangeDomain}
//           disabled={selectedDomain !== "직접 입력" ? true : false}
//         />
//         <SelectBox
//           options={emailAddressOptions}
//           placeholder="직접 입력"
//           selected={selectedDomain}
//           onChange={onChangeSelectedDomain}
//           isLine={false}
//         />
//       </WrapperRatio>
//     </Explanation>
//   );
// }

// export { ExplanationInputBox, ExplanationSelectBox, ExplanationEmail };
