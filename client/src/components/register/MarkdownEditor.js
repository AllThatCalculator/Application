import React, { useRef } from "react";
import Editor from "@monaco-editor/react";

function MarkdownEditor() {
  const editorRef = useRef(null);

  return (
    <Editor
      height="63vh"
      theme="vs-dark"
      defaultLanguage="markdown"
      defaultValue="### wirte detail"
      onMount={(editor) => (editorRef.current = editor)}
    />
  );
}

export default MarkdownEditor;
