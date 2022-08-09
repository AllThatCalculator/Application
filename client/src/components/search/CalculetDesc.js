import BigLink from "../atom-components/LinkPage";
import { Font } from "../atom-components/StyledText";
import { FlexColumnLayout } from "../Layout";
import styles from "../styles";

/**
 * 검색 결과 계산기 정보 (왼쪽 정보)
 * @param {*} props
 *
 * -> title
 * -> description
 * -> categoryMain
 * -> categorySub
 * -> userName
 */
export default function CalculetDesc(props) {
  return (
    <FlexColumnLayout gap="5px">
      <BigLink key={props.id} to={"/" + props.id} content={props.title} />
      <Font font="text200" color={styles.styleColor.gray100}>
        {props.description}
      </Font>
      <Font font="text100" color={styles.styleColor.gray100}>
        {props.categoryMain} / {props.categorySub}
      </Font>
      <Font font="text100">{props.userName}</Font>
    </FlexColumnLayout>
  );
}
