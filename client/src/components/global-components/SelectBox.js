// import { useEffect, useRef, useState } from "react";
// import styled from "styled-components";
// import { StyledIcon } from "../atom-components/ButtonTemplate.js";
// // import styles from "../styles.js";
// import { FlexRowLayout, FlexColumnLayout } from "../Layout";
// import { InputBox } from "./InputBox.js";
// import StyledScrollbar from "../atom-components/StyledScrollbar.js";

// /**
//  * select 박스와 option 박스를 감싸는 스타일 정의
//  */
// const Wrapper = styled.div`
//   position: relative;
//   width: 100%;
// `;

// /**
//  * select 박스 스타일 정의
//  */
// const StyledSelectBox = styled(FlexRowLayout)`
//   color: ${styles.styleColor.blue900};
//   padding-right: ${styles.styleLayout.basic200};

//   border-right: ${(props) =>
//     props.isLine ? `1px solid ${styles.styleColor.blue50}` : `0px`};

//   pointer-events: ${(props) => (props.isValid ? `auto` : `none`)};

//   cursor: pointer;
// `;

// /**
//  * option box 감싸는 스타일 정의
//  */
// const OptionWrapper = styled.div`
//   display: ${(props) => (props.isActive ? `block` : `none`)};
//   padding-top: ${styles.styleLayout.basic50};
//   margin-top: ${styles.styleLayout.basic900};
//   min-width: 100%;
//   max-width: auto;
//   ${styles.styleEffect.opacity300};

//   position: absolute;
//   z-index: 9;
// `;
// /**
//  * option box 스타일 정의
//  * option + scrollBar
//  */
// const StyledOptionBox = styled(StyledScrollbar)`
//   background: ${styles.styleColor.white300};
//   border: 1px solid ${styles.styleColor.blue50};
//   border-radius: 7px;

//   max-height: 200px;
//   padding: 1px 1px 1px 0;
// `;
// /**
//  * option item box 스타일 정의
//  */
// const StyledOptionItemBox = styled(FlexColumnLayout)`
//   width: 100%;
// `;
// /**
//  * option item 스타일 정의
//  */
// const StyledOptionItem = styled.button`
//   display: flex;
//   flex-direction: row;
//   padding: ${styles.styleLayout.basic200} ${styles.styleLayout.basic700};
//   gap: ${styles.styleLayout.basic200};
//   border: none;
//   background: none;
//   align-items: center;

//   ${styles.sytleText.text100};

//   border-bottom: 1px solid ${styles.styleColor.blue50};

//   &: first-child {
//     border-radius: 7px 7px 0px 0px;
//   }

//   &:hover {
//     background: ${styles.styleColor.blue30};
//   }

//   &:last-child {
//     border-bottom: none;
//     border-radius: 0px 0px 7px 7px;
//   }

//   cursor: pointer;
// `;

// /**
//  * 선택된 옵션 아이템 스타일 정의
//  */
// const StyledOptionSelect = styled.div`
//   pointer-events: none;

//   ${(props) =>
//     props.item === props.value
//       ? `${styles.sytleText.buttonWhite}`
//       : `${styles.sytleText.text100}`};
// `;

// /**
//  * 선택된 옵션 아이템의 아이콘 스타일 정의
//  */
// const StyledIconSelect = styled.div`
//   height: 14px;
//   opacity: ${(props) => (props.item === props.value ? `1` : `0`)};
//   pointer-events: none;
// `;

// /**
//  * select 박스의 option 하나에 대한 컴포넌트
//  * @param {object} props
//  * value: 각 option의 value
//  * onClick: option 클릭 시 실행되는 onClick 함수
//  * item: 현재 선택된 option의 value
//  * name: 각 option의 name
//  * @returns
//  */
// function Option(props) {
//   return (
//     <StyledOptionItem value={props.value} onClick={props.onClick}>
//       <StyledIconSelect item={props.item} value={props.value}>
//         <StyledIcon name="CheckLg" />
//       </StyledIconSelect>
//       <StyledOptionSelect item={props.item} value={props.value}>
//         {props.name}
//       </StyledOptionSelect>
//     </StyledOptionItem>
//   );
// }

// /**
//  * 기본 select 박스에 대한 컴포넌트
//  * @param {array, string, string, function, boolean, boolean}
//  * options: select 박스에 대한 option 리스트들
//  * placeholder: select 박스 선택 전 보이는 회색 글씨에 대한 내용
//  * selected: 선택된 option의 name 저장
//  * onChange: 선택한 option이 바뀔 때 일어나는 함수
//  * isLine: select 박스의 오른쪽에 구분선이 있는지 없는지를 나타내는 변수
//  * isValid: select 박스의 활성 여부
//  * @returns
//  */
// function SelectBox({
//   options,
//   placeholder,
//   selected,
//   onChange,
//   isLine,
//   isValid,
// }) {
//   // option box 활성화 상태에 대한 변수
//   const [isActive, setIsActive] = useState(false);

//   // 현재 선택된 option item의 value 저장
//   const [item, setItem] = useState(null);

//   // 현재 컴포넌트에 접근하기 위한 useRef (컴포넌트 밖 영역 클릭 시 컴포넌트 닫히도록 하기 위해 필요)
//   const modalRef = useRef();

//   function onActiveToggle() {
//     setIsActive((prev) => !prev);
//   }

//   function onSelectItem(event) {
//     onChange(event);
//     setItem(Number(event.target.value));
//     setIsActive(false);
//   }

//   function clickModalOutside(event) {
//     if (!modalRef.current.contains(event.target)) {
//       setIsActive(false);
//     }
//   }

//   useEffect(() => {
//     if (!selected) {
//       setItem(null);
//     }
//   }, [selected]);

//   useEffect(() => {
//     document.addEventListener("mousedown", clickModalOutside);

//     return () => {
//       document.removeEventListener("mousedown", clickModalOutside);
//     };
//   }, []);

//   return (
//     <Wrapper ref={modalRef}>
//       <StyledSelectBox
//         onClick={onActiveToggle}
//         isLine={isLine}
//         isValid={isValid !== undefined ? isValid : true}
//       >
//         <InputBox
//           placeholder={placeholder}
//           onChange={onChange}
//           defaultValue={selected}
//           disabled={true}
//         />
//         <StyledIcon name="CaretDownFill" />
//       </StyledSelectBox>
//       <OptionWrapper isActive={isActive}>
//         <StyledOptionBox>
//           <StyledOptionItemBox>
//             {options &&
//               options.map((option) => (
//                 <Option
//                   value={option.value}
//                   name={option.name}
//                   key={option.value}
//                   item={item}
//                   onClick={onSelectItem}
//                 />
//               ))}
//           </StyledOptionItemBox>
//         </StyledOptionBox>
//       </OptionWrapper>
//     </Wrapper>
//   );
// }

// export default SelectBox;
