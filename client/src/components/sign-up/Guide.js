import { BtnText } from "../atom-components/ButtonTemplate";
import SmallTitle from "../global-component/SmallTitle";
import { FlexRowLayout } from "../Layout";

/**
 * 가이드에 따라 리드
 */
function Guide({ guide, lead }) {
  return (
    <FlexRowLayout gap="5px">
      <SmallTitle content={guide} />
      <BtnText text={lead} />
    </FlexRowLayout>
  );
}
export default Guide;
