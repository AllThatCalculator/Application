import { BtnText } from "../atom-components/ButtonTemplate";
import SmallTitle from "../global-component/SmallTitle";
import { FlexRowLayout } from "../Layout";

/**
 * 사용자가 특정 수행을 할 수 있도록 안내하는 컴포넌트
 *
 * @param {string, string} param0
 * guide : 특정 수행 내용을 안내
 * lead : 사용자가 할 특정 수행 내용
 */
function ActGuide({ guide, lead }) {
  return (
    <FlexRowLayout gap="5px">
      <SmallTitle content={guide} />
      <BtnText text={lead} />
    </FlexRowLayout>
  );
}
export default ActGuide;
