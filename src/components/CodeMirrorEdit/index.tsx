import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css"; // 引入CodeMirror的核心样式
import "codemirror/theme/material.css"; // 引入你选择的编辑器主题样式
interface CodeMirrorProps {
  value: string;
  onChange: (value: string) => void;
}

const CodeMirrorComponent: React.FC<CodeMirrorProps> = ({
  value,
  onChange,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = CodeMirror(editorRef.current, {
      value,
      mode: "javascript",
      theme: "material",
      lineNumbers: true,
      extraKeys: { "Ctrl-Space": "autocomplete" },
    });

    editor.on("change", (instance, change) => {
      if (change.origin !== "setValue") {
        onChange(instance.getValue());
      }
    });

    return () => {
      editor.toTextArea();
    };
  }, []);

  return <div ref={editorRef} />;
};

export default CodeMirrorComponent;
