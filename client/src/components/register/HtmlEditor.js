import React, { useEffect, useState, useRef } from "react";
import Editor from "@monaco-editor/react";

//지금은 안 쓰는 컴포넌트
//로컬 스토리지에 htmlScript 저장

function HtmlEditor() {
  const editorRef = useRef(null);

  const [htmlScript, setHtmlScript] = useState(
    () => localStorage.getItem("htmlScript") || "<!DOCTYPE html>"
  );

  useEffect(() => {
    localStorage.setItem("htmlScript", htmlScript);
    console.log(htmlScript);
  }, [htmlScript]);

  return (
    <Editor
      height="63vh"
      theme="vs-dark"
      defaultLanguage="html"
      defaultValue={htmlScript}
      onMount={(editor) => {
        editorRef.current = editor;
      }}
      onChange={(value, event) => {
        setHtmlScript(editorRef.current.getValue());
      }}
    />
  );
}

export default HtmlEditor;
