import React from "react";
const CodeMirror: React.FC = (props) => {
  const { itemData } = props;
  return (
    <>
      <div>{itemData}</div>
    </>
  );
};

export default CodeMirror;
