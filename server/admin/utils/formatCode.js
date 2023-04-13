const beautify_html = require("js-beautify").html;

/**
 * 코드 포맷팅 + 신택스 입히는 함수
 * @param {string} code 포맷팅 되기 전 코드
 * @returns after formatting, syntax code
 */
exports.formatCode = (code) => {
  let formattedCode = beautify_html(code);

  formattedCode = formattedCode
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  formattedCode = `<pre><code id="code" class="language-html">${formattedCode}</code></pre>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
    <script> hljs.highlightAll(); </script>`;

  return formattedCode;
};
