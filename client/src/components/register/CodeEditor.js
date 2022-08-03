import Editor from "@monaco-editor/react";

/**
 * 모나코 코드 에디터 컴포넌트
 * @param {string, string, function, function} param0
 * defaultLanguage: 코드 에디터 언어
 * defaultValue: 초기값
 * onMount: 에디터에 적힌 값 관리
 * onChange: 에디터 값 변경 관리
 */
function CodeEditor({ defaultLanguage, defaultValue, onMount, onChange }) {
  return (
    <Editor
      height="100%"
      theme="vs-dark"
      defaultLanguage={defaultLanguage}
      defaultValue={defaultValue}
      onMount={onMount}
      onChange={onChange}
    />
  );
}

export default CodeEditor;
