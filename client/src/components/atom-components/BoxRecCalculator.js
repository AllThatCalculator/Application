import {
  Avatar,
  ButtonBase,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { FlexBox, FlexColumnBox } from "../global-components/FlexBox.js";
import useSx from "../../hooks/useSx.js";

/**
 *
 * 추천 계산기 컴포넌트(카드 같이 생긴 거)를 반환하는 함수
 *
 * @param {string, string, string, string}
 * name : 계산기 이름
 * nickName : 계산기 저작한 사용자 닉네임
 * description : 계산기에 대한 간단한 설명
 * profile : 프로필 이미지 경로
 *
 */
function BoxRecCalculator({ name, nickName, description, profile }) {
  const { atcLinearWhite, ellipsis } = useSx();

  return (
    <ButtonBase
      type="button"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
      }}
      // onClick={() => handleIdPage(Id)}
    >
      <Card
        sx={{
          width: "100%",
          height: "100%",
          background: atcLinearWhite[100],
        }}
        elevation={0}
      >
        <CardContent>
          <FlexBox
            sx={{
              width: "100%",
              gap: "1.6rem",
              alignItems: "center",
            }}
          >
            <Avatar src={profile} sx={{ width: "5.6rem", height: "5.6rem" }} />
            <FlexColumnBox>
              {/* 계산기 제목 */}
              <Typography
                variant="subtitle1"
                align="left"
                sx={{
                  fontWeight: "bold",
                  ...ellipsis,
                  WebkitLineClamp: "1",
                }}
              >
                {name}
              </Typography>
              {/* 닉네임 */}
              <Typography
                variant="subtitle2"
                color="grey.600"
                align="left"
                sx={{
                  ...ellipsis,
                  WebkitLineClamp: "1",
                }}
              >
                {nickName}
              </Typography>
            </FlexColumnBox>
          </FlexBox>
          {/* 설명 */}
          <Typography
            variant="body2"
            align="left"
            sx={{
              mt: "0.8rem",
              ...ellipsis,
              WebkitLineClamp: "2",
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}

export default BoxRecCalculator;

// import styled, { keyframes } from "styled-components";
// import styles from "../styles.js";
// //스타일드 애니메이션
// const fadein = keyframes`
//   to {
//     background: ${styles.styleColor.white200.color};
//     opacity: ${styles.styleColor.white200.opacity};
//   }
// `;
// const transform = keyframes`
//   from {
//     transform: scale(1);
//   }
//   to {
//     transform: scale(0.97);
//   }
// `;
// //스타일드 버튼
// const StyledButton = styled.button`
//   display: flex;
//   flex-direction: column;
//   padding: ${styles.styleLayout.basic400};
//   ${styles.styleSize.buttonRecommend};

//   ${styles.styleColor.white100};
//   color: ${styles.styleColor.black};
//   gap: ${styles.styleLayout.basic700};
//   ${styles.styleBorder.basic200};
//   text-align: left;
//   cursor: pointer;
//   &:hover {
//     animation-duration: 0.3s;
//     animation-name: ${fadein};
//     animation-fill-mode: forwards;
//   }
//   &:active {
//     animation-duration: 0.5s;
//     animation-name: ${transform};
//     animation-fill-mode: forwards;
//     background: ${styles.styleColor.white200.color};
//     opacity: ${styles.styleColor.white200.opacity};
//   }
// `;
// // 프로필, 계산기이름 감쌈
// const Positioner = styled.div`
//   display: flex;
//   align-items: center;
//   height: ${styles.styleLayout.basic1000};
//   width: 100%;
//   gap: ${styles.styleLayout.basic700};
// `;
// // 프로필
// const StyledProfileImg = styled.img`
//   background: ${styles.styleColor.blue900};
//   ${styles.styleSize.big};
//   border-radius: 50%;
// `;
// // 계산기 이름
// const StyledName = styled.div`
//   display: flex;
//   align-items: center;
//   ${styles.sytleText.text300};
// `;
// // 계산기 이름 - overflow
// const StyledNameOF = styled.div`
//   ${styles.sytleText.text300};
//   display: inline-block;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;

//   white-space: normal;
//   line-height: 1;
//   height: 2em;

//   display: -webkit-box;
//   -webkit-line-clamp: 2;
//   -webkit-box-orient: vertical;
// `;
// // 계산기 설명
// const StyledDescriptionOF = styled(StyledNameOF)`
//   ${styles.sytleText.text100};
// `;

// /**
//  *
//  * 추천 계산기 컴포넌트(카드 같이 생긴 거)를 반환하는 함수
//  *
//  * @param {string, string, string}
//  * name : 계산기 이름
//  * description : 계산기에 대한 간단한 설명
//  * profile : 프로필 이미지 경로
//  *
//  */
// function BoxRecCalculator({ name, description, profile }) {
//   return (
//     <StyledButton id={name} description={description}>
//       <Positioner>
//         <StyledProfileImg src={profile}></StyledProfileImg>

//         {name.length <= 20 ? (
//           <StyledName>{name}</StyledName>
//         ) : (
//           <StyledNameOF>{name}</StyledNameOF>
//         )}
//       </Positioner>
//       <StyledDescriptionOF>{description}</StyledDescriptionOF>
//     </StyledButton>
//   );
// }

// export default BoxRecCalculator;
