// import "../../css/calculet.css";
import { useRef } from "react";
import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import { FlexBox, FlexColumnBox } from "../global-components/FlexBox";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

/**
 * 클래스 네임에 대한 설명, 예시 디자인, 코드 복사기가 모여있는 컴포넌트
 * @param {string, boolean, string, string, string}
 * text: 이름
 * classCode: css 클래스 이름, 코드 텍스트
 */
function OneBoxClassName({ text, classCode }) {
  const classNameRef = useRef(null);

  async function handleCopyClipBoard() {
    try {
      await navigator.clipboard.writeText(classNameRef.current.innerText);
      alert("복사되었습니다.");
    } catch (error) {
      alert("다시 시도해주세요.");
    }
  }

  return (
    <Grid container spacing={4} sx={{ alignItems: "center" }}>
      {/* 열 너비(각 차지하는 열 수) : 1 ~ 12 */}
      <Grid item xs={2}>
        <Typography
          variant="overline"
          color="info.main"
          sx={{ fontWeight: "bold" }}
        >
          {text}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <FlexBox
          sx={{
            alignItems: "center",
            padding: "0.4rem 0.8rem",
            backgroundColor: "atcBlue.100",
            borderRadius: "4px",
            whiteSpace: "pre",
            position: "relative",
          }}
        >
          {classCode && (
            <div ref={classNameRef}>
              <Typography ref={classNameRef} variant="caption">
                {classCode}
              </Typography>
            </div>
          )}
          <Box sx={{ position: "absolute", right: "0.4rem" }}>
            <IconButton size="small" onClick={() => handleCopyClipBoard()}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
        </FlexBox>
      </Grid>
    </Grid>
  );
}

/**
 * OneBoxClassName 컴포넌트의 배열 컴포넌트
 * @param {array}
 * designs: {text, existDesign, classCode} 으로 이루어진 디자인들 배열
 */
function BoxClassName({ designs }) {
  return (
    <>
      {designs.map((design, index) => (
        <FlexColumnBox key={index} gap="1.2rem">
          <OneBoxClassName text={design.text} classCode={design.classCode} />
          {design.existDesign && (
            <FlexColumnBox gap="1.2rem">
              <FlexBox>
                <div className={design.classCode}>예시</div>
              </FlexBox>
              <Divider />
            </FlexColumnBox>
          )}
        </FlexColumnBox>
      ))}
    </>
  );
}

export default BoxClassName;
// import styled from "styled-components";
// import { FlexRowLayout } from "../Layout";
// import styles from "../styles";
// import "../../css/calculet.css";
// import { StyledIcon } from "../atom-components/ButtonTemplate";
// import { useRef } from "react";

// /**
//  * BoxClassName을 감싸는 최상위 컴포넌트
//  */
// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: ${(props) => props.direction};
//   align-items: ${(props) =>
//     props.direction === `row` ? `center` : `flex-start`};
//   padding: 18px 10px;
//   gap: ${styles.styleLayout.basic700};
//   width: 100%;

//   border-bottom: ${(props) =>
//     props.isLine ? `1px solid ${styles.styleColor.blue50}` : `none`};
// `;

// /**
//  * Text 컴포넌트 스타일 정의
//  */
// const TextWrapper = styled(FlexRowLayout)`
//   ${styles.sytleText.buttonWhite};
//   color: ${styles.styleColor.blue300};
// `;

// /**
//  * ClassName 컴포넌트 스타일 정의
//  */
// const ClassNameWrapper = styled(FlexRowLayout)`
//   justify-content: space-between;
//   align-items: center;

//   padding: ${styles.styleLayout.basic700};

//   width: 100%;

//   ${styles.sytleText.text100};

//   background: ${styles.styleColor.blue30};
//   border-radius: 7px;

//   white-space: pre;
// `;

// /**
//  * 아이콘 감싸는 컴포넌트 스타일 정의
//  */
// const IconWrapper = styled.button`
//   border: 0;
//   outline: 0;
//   background: none;

//   &:hover {
//     color: ${styles.styleColor.blue400};
//   }

//   cursor: pointer;
// `;

// /**
//  * 클래스 네임에 대한 설명, 예시 디자인, 코드 복사기가 모여있는 컴포넌트
//  * @param {string, boolean, string, string, string}
//  * direction: flex 방향
//  * isLine: 밑줄 여부
//  * text: 이름
//  * existDesign: 예시 디자인 존재 여부
//  * className: css 클래스 이름
//  * code: 코드 텍스트
//  */
// function OneBoxClassName({
//   direction,
//   isLine,
//   text,
//   existDesign,
//   className,
//   code,
// }) {
//   const classNameRef = useRef(null);

//   async function handleCopyClipBoard() {
//     try {
//       await navigator.clipboard.writeText(classNameRef.current.innerText);
//     } catch (error) {}
//   }

//   return (
//     <Wrapper direction={direction} isLine={isLine}>
//       <TextWrapper>{text}</TextWrapper>
//       {existDesign && <div className={className}>예시</div>}
//       <ClassNameWrapper>
//         {className && <div ref={classNameRef}>{className}</div>}
//         {code && <div ref={classNameRef}>{code}</div>}
//         <IconWrapper onClick={() => handleCopyClipBoard()}>
//           <StyledIcon name="Clipboard" />
//         </IconWrapper>
//       </ClassNameWrapper>
//     </Wrapper>
//   );
// }

// /**
//  * OneBoxClassName 컴포넌트의 배열 컴포넌트
//  * @param {array}
//  * designs: {direction, isLine, text, existDesign, className, code} 으로 이루어진 디자인들 배열
//  */
// function BoxClassName({ designs }) {
//   return (
//     <>
//       {designs.map((design, index) => (
//         <OneBoxClassName
//           key={index}
//           direction={design.direction}
//           isLine={design.isLine}
//           text={design.text}
//           existDesign={design.existDesign}
//           className={design.className}
//           code={design.code}
//         />
//       ))}
//     </>
//   );
// }

// export default BoxClassName;
