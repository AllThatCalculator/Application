/**
 * iframe내의 태그를 찾아서 반환해주는 함수
 * @param {string}
 * className: iframe내에 찾고자 하는 클래스 네임
 * @returns 태그 배열
 */
function ApproachIframeTag(className) {
  return window.frames[0].document.querySelectorAll(`.${className}`);
}

export default ApproachIframeTag;
