import React, { useState } from "react";
import { UnControlled } from "react-codemirror2";
import "codemirror/lib/codemirror.js";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/yonce.css";
// 代码模式，clike是包含java,c++等模式的
import "codemirror/mode/clike/clike";
import "codemirror/mode/javascript/javascript"; //js
import "codemirror/mode/python/python.js"; //python
//代码高亮
import "codemirror/addon/selection/active-line";

// 代码折叠
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
//代码滚动
import "codemirror/addon/scroll/simplescrollbars.js";
import "codemirror/addon/scroll/simplescrollbars.css";
const CodeMirror: React.FC = (props) => {
  const { itemData } = props;
  const [instance, setInstance] = useState("");
  const [myCodeMirror, setMyCodeMirror] = useState("");
  const changeCode = (CodeMirror, changeObj, value) => {
    if (!value) return;
    // 获取 CodeMirror.doc.getValue()
    // 赋值 CodeMirror.doc.setValue(value) // 会触发 onChange 事件，小心进入无线递归。
    // this.setState({ text: value });
  };
  return (
    <>
      <div>
        {itemData}
        <UnControlled
          // id="scriptDesc"
          editorDidMount={(editor) => {
            setInstance(editor);
          }}
          value={itemData}
          onChange={changeCode}
          // eslint-disable-next-line no-return-assign
          ref={(c) => setMyCodeMirror(c)} // 添加ref属性获取dome节点
          options={{
            lineNumbers: true, // 显示行号
            mode: { name: "text/x-java" || "javascript" }, // 语言
            autofocus: true, // 自动获取焦点
            styleActiveLine: true, // 光标代码高亮
            theme: "yonce", // 主题
            scrollbarStyle: "overlay",
            lineWrapping: true, // 代码自动换行
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirrorfoldgutter"], // end
          }}
        />
      </div>
    </>
  );
};

export default CodeMirror;
