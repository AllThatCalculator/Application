import styled from "styled-components";
import styles from "../styles";
import { FlexColumnLayout, ResponsiveTabletLayout } from "../Layout";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import useSx from "../../hooks/useSx";
import { FlexBox, FlexColumnBox } from "../global-components/FlexBox";
import BoxRecCalculator from "../atom-components/BoxRecCalculator";

/**
 * 계산기 정보 입력창 컴포넌트 (정보 입력 + 배너 미리보기)
 * @param {*} props
 * props: 계산기에 대한 정보 state들
 */
function WriteInform(props) {
  const { subTitleSx } = useSx();
  const gapSx = { gap: "0.8rem" };

  // 대분류, 소분류 SelectBox 필요한 정보들
  const categorys = [
    {
      options: props.mainOption,
      placeholder: "대분류",
      selected: props.categoryMain,
      onChange: props.changeCategoryMain,
      isLine: true,
    },
    {
      options: props.categorySubOption,
      placeholder: "소분류",
      selected: props.categorySub,
      onChange: props.changeCategorySub,
      isLine: false,
      isValid: props.isValidSub,
    },
  ];

  return (
    <Grid container spacing={4} columns={{ xs: 1, sm: 2 }}>
      <Grid item xs={1} sm={1.15}>
        <FlexColumnBox gap="1.6rem">
          <Typography sx={{ ...subTitleSx }}>계산기 정보 입력</Typography>
          <TextField
            label="계산기 이름"
            value={props.title}
            onChange={props.changeTitle}
            required
          />
          <TextField
            label="계산기 요약 설명"
            value={props.description}
            onChange={props.changeDescription}
            required
          />
          <Grid container gap="0.8rem">
            {/* <Grid item xs>
              <FormControl fullWidth required>
                <InputLabel>대분류</InputLabel>
                <Select
                  label="대분류"
                  value={props.categoryMain || ""}
                  onChange={props.changeCategoryMain}
                >
                  {props.mainOption &&
                    props.mainOption.map((data) => (
                      <MenuItem key={data.value} value={data.value}>
                        {data.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs>
              <FormControl fullWidth required>
                <InputLabel>소분류</InputLabel>
                <Select
                  label="소분류"
                  value={props.categorySub || ""}
                  onChange={props.changeCategorySub}
                >
                  {props.categorySubOption &&
                    props.categorySubOption.map((data) => (
                      <MenuItem key={data.value} value={data.value}>
                        {data.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid> */}
            {categorys.map((data) => (
              <Grid item xs key={data.placeholder}>
                <FormControl
                  fullWidth
                  required
                  disabled={
                    data.placeholder === "소분류" && !props.categoryMain
                  }
                >
                  <InputLabel>{data.placeholder}</InputLabel>
                  <Select
                    label={data.placeholder}
                    value={data.selected || ""}
                    onChange={data.onChange}
                  >
                    {data.options &&
                      data.options.map((data) => (
                        <MenuItem key={data.value} value={data.value}>
                          {data.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            ))}
          </Grid>
        </FlexColumnBox>
      </Grid>
      <Grid item xs={1} sm={0.85} gap="1.6rem">
        <Typography sx={{ ...subTitleSx }}>배너 미리보기</Typography>
        <FlexBox
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Paper
            elevation={4}
            sx={{
              pointerEvents: "none",
              // width: "32rem",
              width: "100%",
              margin: { xs: "0 5.8rem", sm: "0 2.4rem", md: "0 5.8rem" },
            }}
          >
            <BoxRecCalculator
              name={props.title}
              nickName={props.userName}
              description={props.description}
              profile={props.profileImgSrc}
            />
          </Paper>
        </FlexBox>
      </Grid>
    </Grid>
  );
}

export default WriteInform;
// import styled from "styled-components";
// import styles from "../styles";
// import PreviewBanner from "./PreviewBanner";
// import MiddleTitle from "./MiddleTitle";
// import BigTitle from "../atom-components/BigTitle";
// import { FlexColumnLayout, ResponsiveTabletLayout } from "../Layout";
// import {
//   ExplanationInputBox,
//   ExplanationSelectBox,
// } from "../global-components/Explanation";

// /**
//  * 정보칸 + 배너 미리보기 감싸는 스타일 정의
//  */
// const WrapperInformBanner = styled(ResponsiveTabletLayout)`
//   padding-bottom: ${styles.styleLayout.basic1000};
//   gap: ${styles.styleLayout.basic300};
//   border-bottom: 1px solid ${styles.styleColor.blue50};
// `;

// /**
//  * 정보칸 감싸는 스타일 정의
//  */
// const WrapperInform = styled(FlexColumnLayout)`
//   width: 713px;
//   gap: ${styles.styleLayout.basic900};
// `;

// /**
//  * 배너 미리보기 감싸는 스타일 정의
//  */
// const WrapperBanner = styled(FlexColumnLayout)`
//   align-self: stretch;
//   width: 347px;
// `;

// /**
//  * 입력 칸들 감싸는 박스 스타일 정의
//default  *;
// cons  styled(FlexColumnLayout)`
//   padding: ${styles.styleLayout.basic900} ${styles.styleLayout.basic900} 0px;
//   gap: ${styles.styleLayout.basic900};
//   border: 1px solid ${styles.styleColor.blue50};
//   border-radius: 7px;
// `;

// /**
//  * 계산기 정보 입력창 컴포넌트 (정보 입력 + 배너 미리보기)
//  * @param {*} props
//  * props: 계산기에 대한 정보 state들
//  */
// function WriteInform(props) {
//   // 대분류, 소분류 SelectBox 필요한 정보들
//   const categorys = [
//     {
//       options: props.mainOption,
//       placeholder: "대분류",
//       selected: props.categoryMain,
//       onChange: props.changeCategoryMain,
//       isLine: true,
//     },
//     {
//       options: props.categorySubOption,
//       placeholder: "소분류",
//       selected: props.categorySub,
//       onChange: props.changeCategorySub,
//       isLine: false,
//       isValid: props.isValidSub,
//     },
//   ];

//   return (
//     <WrapperInformBanner>
//       <WrapperInform>
//         <BigTitle content="정보 입력하기" />
//         <MiddleTitle content="계산기 정보" default>
//        >//           <ExplanationInputBox
//             isLine={true}
//             ratioLeft="1"
//             ratioRight="2.8"
//             explanation="계산기 이름"
//             placeholder="ex. 사칙연산 계산기"
//             defaultValue={props.title}
//             onChange={props.changeTitle}
//           />
//           <ExplanationInputBox
//             isLine={true}
//             ratioLeft="1"
//             ratioRight="2.8"
//             explanation="계산기에 대한 간단한 설명"
//             placeholder="ex. 사칙연산을 하는 계산기입니다."
//             defaultValue={props.description}
//             onChange={props.changeDescription}
//           />
//           <ExplanationSelectBox
//             isLine={false}
//             ratioLeft="1"
//             ratioRight="2.8"
//             explanation="카테고리"
//             categorys={categorys}
//           /default
//         >//       </WrapperInform>
//       <WrapperBanner>
//         <PreviewBanner
//           profile={props.profileImg}
//           title={props.title}
//           description={props.description}
//         />
//       </WrapperBanner>
//     </WrapperInformBanner>
//   );
// }

// export default WriteInform ;
