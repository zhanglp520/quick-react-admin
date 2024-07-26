import { useEffect, useState } from "react";
import { Col, Row, TreeDataNode, TreeProps } from "antd";
import DirectoryTree from "antd/es/tree/DirectoryTree";
import { CodeMirror } from "@ainiteam/quick-react-ui";
import { getFile, getTreeData } from "@/api/developerTools/generator/template";

const Template: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [treeData, setTreeData] = useState<TreeDataNode[]>();
  const [code, setCode] = useState<string>("");
  const [key, setKey] = useState<string>("");

  const loadTree = async () => {
    const res = await getTreeData();
    const { data } = res;
    setTreeData(data);
  };
  const loadFile = async () => {
    const res = await getFile(key);
    const { data } = res;
    setCode(data);
  };
  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
    setKey(selectedKeys[0].toString());
  };
  useEffect(() => {
    if (isInitialized) {
      loadFile();
    } else {
      setIsInitialized(true);
    }
  }, [key]);
  useEffect(() => {
    loadTree();
  }, []);
  return (
    <div>
      <Row>
        <Col span={4}>
          <DirectoryTree treeData={treeData} onSelect={onSelect} />
        </Col>
        <Col span={20}>
          <CodeMirror value={code}></CodeMirror>
        </Col>
      </Row>
    </div>
  );
};

export default Template;
