import styled from "styled-components";
import { IconColorBox, StyledProfileImgBig } from "../atom-components/BoxIcon";
import StyledScrollbar from "../atom-components/StyledScrollbar";
import styles from "../styles";
import { FlexColumnLayout, FlexRowLayout } from "../Layout.js";

const Positioner = styled(FlexRowLayout)`
  height: 100%;
`;
/**
 * 세로 갭 (props.gap)
 */
const PositionerColGap = styled(FlexColumnLayout)`
  height: 100%;
  width: 100%;
`;
/**
 * 세로 갭 센터 (props.gap)
 */
const PositionerColGapCenter = styled(PositionerColGap)`
  align-items: center;
`;
/**
 * 밑에 경계선
 */
const PositionerBorderUnder = styled(FlexColumnLayout)`
  border-bottom: ${styles.styleLayout.basic25} solid;
  border-color: ${styles.styleColor.blue50};
  padding-bottom: ${styles.styleLayout.basic950};
`;
/**
 * 밑에 경계선 + 가운데 정렬
 */
const PositionerUnderCenter = styled(PositionerBorderUnder)`
  align-items: center;
`;
/**
 * 등록일 & 업데이트일 박스 패딩 18px
 */
const PositionerPad18 = styled(Positioner)`
  padding: ${styles.styleLayout.basic950};
  background: ${styles.styleColor.white300};
  ${styles.styleEffect.opacity50};
  ${styles.styleBorder.basic200};

  overflow: auto;
`;
/**
 * 프로필 & 누적 연산, 누적 사용자 수 박스
 */
const StyledBoxL = styled.div`
  flex-grow: 1;
  padding: ${styles.styleLayout.basic350};
  background: ${styles.styleColor.white300};
  border-right: ${styles.styleLayout.basic25} solid;
  border-color: ${styles.styleColor.blue50};
  border-bottom-left-radius: ${styles.styleLayout.basic700};
`;
/**
 * 계산기 이름 & 등록일 & 업데이트일 박스
 */
const StyledBoxR = styled(FlexColumnLayout)`
  flex-grow: 4;
  padding: ${styles.styleLayout.basic300} ${styles.styleLayout.basic900};
`;
/**
 * 폰트 + 색
 */
const StyledFont = styled.div`
  ${(props) =>
    (props.font === "font50" && `${styles.sytleText.text50}`) ||
    (props.font === "font100" && `${styles.sytleText.text100}`) ||
    (props.font === "font300" && `${styles.sytleText.text300}`)};
  color: ${(props) =>
    props.color === "blue300" && `${styles.styleColor.blue300}`};
`;
/**
 * 들여쓰기
 */
const StyledIndent = styled(StyledFont)`
  margin-left: 2.5em;
`;

/**
 * 정보 이름 + 정보에 맞는 내용 반환
 * -> ex. 누적 연산 수 1,000,000
 *
 * @param {string, string, string, string} param0
 *
 * explain : 정보 이름
 * contents : 정보
 * icon : 아이콘 이름
 * color : 아이콘 색
 */
function InfoBox({ explain, contents, icon, color }) {
  return (
    <FlexColumnLayout gap="10px">
      <StyledFont font="font50" color="blue300">
        {explain}
      </StyledFont>
      <FlexRowLayout gap="10px">
        {icon && <IconColorBox icon={icon} color={color} />}
        <StyledFont font="font100">{contents}</StyledFont>
      </FlexRowLayout>
    </FlexColumnLayout>
  );
}
/**
 * 정보 이름 + 정보에 맞는 내용(맵) 반환
 * -> ex. 업데이트 2022.06.26 [버그수정, 오류수정]
 *
 * @param {string, string, string, string} param0
 *
 * explain : 정보 이름
 * contents : 정보
 * icon : 아이콘 이름
 * color : 아이콘 색
 */
function UpdateBox({ explain, contents, icon, color }) {
  return (
    <FlexColumnLayout gap="10px">
      <StyledFont font="font50" color="blue300">
        {explain}
      </StyledFont>
      {contents.map((conts, index) => (
        <FlexColumnLayout key={index} gap="3px">
          <FlexRowLayout gap="10px">
            <IconColorBox icon={icon} color={color} />
            <StyledFont font="font100">{conts.updateDate}</StyledFont>
          </FlexRowLayout>
          {conts.message.map((cont, idx) => (
            <StyledIndent font="font50" key={idx}>
              • {cont}
            </StyledIndent>
          ))}
        </FlexColumnLayout>
      ))}
    </FlexColumnLayout>
  );
}
/**
 * 왼쪽 정보
 * -> 제작자 프로필 & 제작자 ID & 누적 연산 수 & 누적 사용자 수
 *
 * @param {info} param0
 *
 * info
 * -> profile_img : 제작자 프로필 사진
 * -> contributor_id : 제작자 ID
 * -> calculation_cnt : 누적 연산 수
 * -> user_cnt : 누적 사용자 수
 */
function LeftBox({ info }) {
  return (
    <PositionerColGapCenter>
      <FlexColumnLayout gap="20px">
        <PositionerUnderCenter gap="10px">
          <StyledProfileImgBig src={info.profileImg} />
          <StyledFont font="font100">{info.contributorEmail}</StyledFont>
        </PositionerUnderCenter>
        <InfoBox explain="누적 연산 수" contents={info.calculationCnt} />
        <InfoBox explain="누적 사용자 수" contents={info.userCnt} />
      </FlexColumnLayout>
    </PositionerColGapCenter>
  );
}
/**
 * 오른쪽 정보
 * -> 계산기 이름 & 대분류 & 소분류
 *
 * @param {info} param0
 *
 * info
 * -> title : 계산기 이름
 * -> category_main : 대분류
 * -> category_sub : 소분류
 */
function RightBoxTitle({ info }) {
  return (
    <>
      <StyledFont font="font300">{info.title}</StyledFont>
      <StyledFont font="font100" color="blue300">
        {info.categoryMain} / {info.categorySub}
      </StyledFont>
    </>
  );
}
/**
 * 오른쪽 정보
 * -> 등록일 & 업데이트 로그
 *
 * @param {info} param0
 *
 * info
 * -> birthday : 계산기 등록일
 * -> update_log : 업데이트 로그 정보
 */
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
              color={styles.styleColor.blue400}
            />
          </PositionerBorderUnder>
          <UpdateBox
            explain="업데이트"
            contents={info.updateLog}
            icon="Circle"
            color={styles.styleColor.green100}
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
      <StyledBoxL>
        <LeftBox info={info} />
      </StyledBoxL>
      <StyledBoxR gap="10px">
        <RightBoxTitle info={info} />
        <RightBoxLog info={info} />
      </StyledBoxR>
    </Positioner>
  );
}

export default ModalCalculetInfo;
