import React from "react";
import styled from "styled-components";
import { StyledIcon, StyledProfileImgBig } from "../atom-components/BoxIcon";
import StyledScrollbar from "../atom-components/StyledScrollbar";
import styles from "../styles";

// 가로 감쌈
const Wrapper = styled.div`
  display: flex;
`;
// 가로 갭 8
const WrapperGap8 = styled(Wrapper)`
  gap: ${styles.styleLayout.basic200};
  text-align: center;
`;
// 가로 감쌈
const Positioner = styled(Wrapper)`
  height: 100%;
`;
// 세로 감쌈
const PositionerCol = styled.div`
  display: flex;
  flex-direction: column;
`;
// 세로 갭 3
const PositionerColGap3 = styled(PositionerCol)`
  gap: ${styles.styleLayout.basic50};
`;
// 세로 갭 20
const PositionerColGap20 = styled(PositionerCol)`
  gap: ${styles.styleLayout.basic300};
  width: 100%;
`;
// 세로 갭 20 센터
const PositionerColGap20Center = styled(PositionerColGap20)`
  align-items: center;
`;
// 세로 갭 10
const PositionerColGap10 = styled(PositionerCol)`
  gap: ${styles.styleLayout.basic700};
`;
// 세로 갭 10
const PositionerColGap10Hei100 = styled(PositionerColGap10)`
  height: 100%;
`;
// 등록일 * 업데이트일
const PositionerPad18 = styled(Positioner)`
  padding: ${styles.styleLayout.basic950};
  background: ${styles.styleColor.white300};
  ${styles.styleEffect.opacity50};
  ${styles.styleBorder.basic200};

  overflow: auto;
`;
// 밑에 경계선 있게 감쌈
const PositionerUnder = styled(PositionerColGap10)`
  border-bottom: ${styles.styleLayout.basic25} solid;
  border-color: ${styles.styleColor.blue50};
  padding-bottom: ${styles.styleLayout.basic950};
  width: 100%;
`;
// 밑에 경계선 있게 감쌈 + 가운데 정렬
const PositionerUnderCenter = styled(PositionerUnder)`
  align-items: center;
`;
// 프로필 & 누적 정보 감쌈
const StyledBoxL = styled.div`
  flex-grow: 1;
  padding: ${styles.styleLayout.basic350};

  background: ${styles.styleColor.white300};
  border-right: ${styles.styleLayout.basic25} solid;
  border-color: ${styles.styleColor.blue50};
  border-bottom-left-radius: ${styles.styleLayout.basic700};
`;
// 계산기 이름 & 등록일 & 업데이트일 정보 감쌈
const StyledBoxR = styled.div`
  flex-grow: 4;
  padding: ${styles.styleLayout.basic300} ${styles.styleLayout.basic900};
`;

const StyledFont300 = styled.div`
  ${styles.sytleText.text300};
`;
const StyledFont100 = styled.div`
  ${styles.sytleText.text100};
`;
const StyledFont50 = styled.div`
  ${styles.sytleText.text50};
`;
// Text100 + blue300
const StyledFont100Blue300 = styled(StyledFont100)`
  color: ${styles.styleColor.blue300};
`;
// Text50 + blue300
const StyledFont50Blue300 = styled(StyledFont50)`
  color: ${styles.styleColor.blue300};
`;
// blue400
const StyledBlue400 = styled.div`
  display: flex;
  color: ${styles.styleColor.blue400};
`;
// Green100
const StyledGreen100 = styled.div`
  display: flex;
  color: ${styles.styleColor.green100};
`;
// 들여쓰기
const StyledFont50Indent = styled(StyledFont50)`
  margin-left: 2.5em;
`;

function IconBox({ icon, color }) {
  return (
    <>
      {color === "blue400" && (
        <StyledBlue400>
          <StyledIcon name={icon}></StyledIcon>
        </StyledBlue400>
      )}
      {color === "green100" && (
        <StyledGreen100>
          <StyledIcon name={icon}></StyledIcon>
        </StyledGreen100>
      )}
    </>
  );
}

function InfoBox({ explain, contents, icon, color }) {
  return (
    <PositionerColGap10>
      <StyledFont50Blue300>{explain}</StyledFont50Blue300>
      <WrapperGap8>
        {icon && <IconBox icon={icon} color={color}></IconBox>}
        <StyledFont100>{contents}</StyledFont100>
      </WrapperGap8>
    </PositionerColGap10>
  );
}

function UpdateBox({ explain, contents, icon, color }) {
  return (
    <PositionerColGap10>
      <StyledFont50Blue300>{explain}</StyledFont50Blue300>
      {contents.map((conts, index) => (
        <PositionerColGap3 key={index}>
          <WrapperGap8>
            <IconBox icon={icon} color={color}></IconBox>
            <StyledFont100>{conts[0]}</StyledFont100>
          </WrapperGap8>
          {conts[1].map((cont) => (
            <StyledFont50Indent>• {cont}</StyledFont50Indent>
          ))}
        </PositionerColGap3>
      ))}
    </PositionerColGap10>
  );
}

function LeftBox({ info }) {
  return (
    <PositionerColGap20Center>
      <PositionerCol>
        <PositionerColGap20>
          <PositionerUnderCenter>
            {info.profile_img ? (
              <StyledProfileImgBig src={info.profile_img}></StyledProfileImgBig>
            ) : (
              <StyledIcon name="PeopleCircle"></StyledIcon>
            )}
            <StyledFont100>{info.contributor_id}</StyledFont100>
          </PositionerUnderCenter>
          <InfoBox
            explain="누적 연산 수"
            contents={info.calculation_cnt}
          ></InfoBox>
          <InfoBox explain="누적 사용자 수" contents={info.user_cnt}></InfoBox>
        </PositionerColGap20>
      </PositionerCol>
    </PositionerColGap20Center>
  );
}
function RightBox_log({ info }) {
  return (
    <PositionerPad18>
      <StyledScrollbar>
        <PositionerColGap20>
          <PositionerUnder>
            <InfoBox
              explain="등록일"
              contents={info.birthday}
              icon="Check2Circle"
              color="blue400"
            ></InfoBox>
          </PositionerUnder>
          <UpdateBox
            explain="업데이트"
            contents={info.update_log}
            icon="Circle"
            color="green100"
          ></UpdateBox>
        </PositionerColGap20>
      </StyledScrollbar>
    </PositionerPad18>
  );
}

/**
 * 계산기 정보 팝업창에 들어갈 내용
 *
 * @param {object} param0
 *
 * info : 계산기 정보 팝업창에 들어갈 내용
 * -> profile_img: 제작자 프로필 사진
 * -> contributor_id : 제작자 ID
 * -> calculation_cnt : 누적 연산 수
 * -> user_cnt : 누적 사용자 수
 * -> title : 계산기 이름
 * -> category_main : 대분류
 * -> category_sub : 소분류
 * -> birthday : 등록일
 * -> update_log : <배열> 업데이트 날짜,메세지
 */
function ModalCalculetInfo({ info }) {
  return (
    <Positioner>
      {/* 제작자 프로필 & ID / 누적 연산 수 / 누적 사용자 수 */}
      <StyledBoxL>
        <LeftBox info={info}></LeftBox>
      </StyledBoxL>

      {/* 계산기 이름 / 대분류 & 소분류 / 등록일 / 업뎃로그 */}
      <StyledBoxR>
        <PositionerColGap10Hei100>
          <PositionerColGap10>
            <StyledFont300>{info.title}</StyledFont300>
            <Wrapper>
              <StyledFont100Blue300>
                {info.category_main} / {info.category_sub}
              </StyledFont100Blue300>
            </Wrapper>
          </PositionerColGap10>
          <RightBox_log info={info}></RightBox_log>
        </PositionerColGap10Hei100>
      </StyledBoxR>
    </Positioner>
  );
}

export default ModalCalculetInfo;
