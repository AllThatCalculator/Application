import React from "react";
import styled from "styled-components";
import { StyledIcon, StyledProfileImgBig } from "../atom-components/BoxIcon";
import StyledScrollbar from "../atom-components/StyledScrollbar";
import styles from "../styles";
import { FlexColumnLayout, FlexRowLayout } from "../Layout.js";

const Positioner = styled.div`
  display: flex;
  height: 100%;
`;
// 세로 갭 props.gap
const PositionerColGap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: ${(props) => (props.gap ? `${props.gap}` : `0px`)};
`;
// 세로 갭 센터 props.gap
const PositionerColGapCenter = styled(PositionerColGap)`
  align-items: center;
`;

// 밑에 경계선
const PositionerBorderUnder = styled.div`
  border-bottom: ${styles.styleLayout.basic25} solid;
  border-color: ${styles.styleColor.blue50};
  padding-bottom: ${styles.styleLayout.basic950};
`;
// 밑에 경계선 + 가운데 정렬
const PositionerUnderCenter = styled(PositionerBorderUnder)`
  align-items: center;
`;

// 등록일 * 업데이트일 로그 박스 패딩 18px
const PositionerPad18 = styled(Positioner)`
  padding: ${styles.styleLayout.basic950};
  background: ${styles.styleColor.white300};
  ${styles.styleEffect.opacity50};
  ${styles.styleBorder.basic200};

  overflow: auto;
`;
// 프로필 & 누적 정보 박스
const StyledBoxL = styled.div`
  flex-grow: 1;
  padding: ${styles.styleLayout.basic350};

  background: ${styles.styleColor.white300};
  border-right: ${styles.styleLayout.basic25} solid;
  border-color: ${styles.styleColor.blue50};
  border-bottom-left-radius: ${styles.styleLayout.basic700};
`;
// 계산기 이름 & 등록일 & 업데이트일 정보 박스
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
          <StyledIcon name={icon} />
        </StyledBlue400>
      )}
      {color === "green100" && (
        <StyledGreen100>
          <StyledIcon name={icon} />
        </StyledGreen100>
      )}
    </>
  );
}

function InfoBox({ explain, contents, icon, color }) {
  return (
    <FlexColumnLayout gap="10px">
      <StyledFont50Blue300>{explain}</StyledFont50Blue300>
      <FlexRowLayout gap="8px">
        {icon && <IconBox icon={icon} color={color} />}
        <StyledFont100>{contents}</StyledFont100>
      </FlexRowLayout>
    </FlexColumnLayout>
  );
}

function UpdateBox({ explain, contents, icon, color }) {
  return (
    <FlexColumnLayout gap="10px">
      <StyledFont50Blue300>{explain}</StyledFont50Blue300>
      {contents.map((conts, index) => (
        <FlexColumnLayout key={index} gap="3px">
          <FlexRowLayout gap="8px">
            <IconBox icon={icon} color={color} />
            <StyledFont100>{conts[0]}</StyledFont100>
          </FlexRowLayout>
          {conts[1].map((cont) => (
            <StyledFont50Indent>• {cont}</StyledFont50Indent>
          ))}
        </FlexColumnLayout>
      ))}
    </FlexColumnLayout>
  );
}

function LeftBox({ info }) {
  return (
    <PositionerColGapCenter>
      <FlexColumnLayout>
        <PositionerColGap gap="20px">
          <PositionerUnderCenter>
            <PositionerColGapCenter gap="10px">
              <StyledProfileImgBig src={info.profile_img} />
              <StyledFont100>{info.contributor_id}</StyledFont100>
            </PositionerColGapCenter>
          </PositionerUnderCenter>
          <InfoBox explain="누적 연산 수" contents={info.calculation_cnt} />
          <InfoBox explain="누적 사용자 수" contents={info.user_cnt} />
        </PositionerColGap>
      </FlexColumnLayout>
    </PositionerColGapCenter>
  );
}
function RightBoxLog({ info }) {
  return (
    <PositionerPad18>
      <StyledScrollbar>
        <PositionerColGap gap="20px">
          <PositionerBorderUnder>
            <InfoBox
              explain="등록일"
              contents={info.birthday}
              icon="Check2Circle"
              color="blue400"
            />
          </PositionerBorderUnder>
          <UpdateBox
            explain="업데이트"
            contents={info.update_log}
            icon="Circle"
            color="green100"
          />
        </PositionerColGap>
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
        <LeftBox info={info} />
      </StyledBoxL>

      {/* 계산기 이름 / 대분류 & 소분류 / 등록일 / 업뎃로그 */}
      <StyledBoxR>
        <PositionerColGap gap="10px">
          <StyledFont300>{info.title}</StyledFont300>
          <StyledFont100Blue300>
            {info.category_main} / {info.category_sub}
          </StyledFont100Blue300>
          <RightBoxLog info={info} />
        </PositionerColGap>
      </StyledBoxR>
    </Positioner>
  );
}

export default ModalCalculetInfo;
