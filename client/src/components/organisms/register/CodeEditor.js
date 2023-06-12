import Editor from "@monaco-editor/react";

/**
 * 모나코 코드 에디터 컴포넌트
 * @param {string} defaultLanguage 코드 에디터 언어
 * @param {string} defaultValue 초기값
 * @param {function} setData 값 설정하는 함수
 */
function CodeEditor({ defaultLanguage, defaultValue, setData }) {
  /**
   * 모나코 에디터의 값을 관리하는 함수
   * @param {string} value 모나코 에디터 값
   */
  function onChange(value) {
    setData(value);
  }
  return (
    <Editor
      height="100%"
      theme="vs-dark"
      defaultLanguage={defaultLanguage}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
}

export default CodeEditor;
