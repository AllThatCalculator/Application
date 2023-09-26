import { Box } from "@mui/material";

export function createMarkup(htmlCodes) {
  return { __html: htmlCodes };
}
/**
 * dangerouslySetInnerHTML
 * DOM에서 innerHTML을 사용하기 위한 React의 대체 방법
 *
 * React에서 직접 HTML을 설정할 수는 있지만, 위험하다는 것을 상기시키기 위해
 * dangerouslySetInnerHTML을 작성하고 __html 키로 객체를 전달
 * @param {*} htmlCodes
 * @returns
 */
function ParseHtml({ htmlCodes }) {
  return (
    <Box
      sx={{ width: "100%" }}
      dangerouslySetInnerHTML={createMarkup(htmlCodes)}
    />
  );
}
export default ParseHtml;
