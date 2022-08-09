import { Font } from "../atom-components/StyledText";
import { FlexRowLayout, ResponsiveTabletLayout } from "../Layout";
import styles from "../styles";
import { IconColorBox } from "../atom-components/BoxIcon";
import styled from "styled-components";

/**
 * 너비 200px
 */
const Wrapper = styled(ResponsiveTabletLayout)`
  width: 100%;
`;

/**
 * 비율 조정 컴포넌트
 */
const WrapperRatio = styled(FlexRowLayout)`
  flex: 1;
`;
/**
 * 버튼 아닌, (아이콘) + 정보 반환
 *
 * @param {*} param0
 *
 * content : 정보 내용
 * icon : 아이콘 이름
 * iconColor : 아이콘 색
 */
function Statistic(props) {
  return (
    <WrapperRatio gap="5px">
      <IconColorBox icon={props.icon} color={styles.styleColor.blue900} />
      <Font font="text100" color={styles.styleColor.gray100}>
        {props.content}
      </Font>
    </WrapperRatio>
  );
}

/**
 * 검색 결과 계산기 통계 (오른쪽 정보)
 * @param {*} props
 *
 * -> viewCnt
 * -> likeCnt
 * -> bookmarkCnt
 */

export default function CalculetStatistic(props) {
  return (
    <Wrapper columnGap="10px" rowGap="10px">
      <Statistic icon="Eye" content={props.viewCnt}></Statistic>
      <Statistic icon="Heart" content={props.likeCnt}></Statistic>
      <Statistic icon="BookmarkStar" content={props.bookmarkCnt}></Statistic>
    </Wrapper>
  );
}
