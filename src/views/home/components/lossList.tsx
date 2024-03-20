import React from "react";
import { Avatar, List } from "antd";

const data = [
  {
    name: "电动玩具小熊",
    code: "000154478284",
  },
  {
    name: "牙刷",
    code: "000154478284",
  },
  {
    name: "毛巾",
    code: "000154478284",
  },
  {
    name: "电动玩具小熊",
    code: "000154478284",
  },
  {
    name: "捏捏乐",
    code: "000154478284",
  },
  {
    name: "笔记本电脑",
    code: "000154478284",
  },
  {
    name: "电动玩具小熊",
    code: "000154478284",
  },
];

const LosssList: React.FC = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item actions={[<a key="list-loadmore-edit">订单详情</a>]}>
        <List.Item.Meta
          title={item.name}
          description={`订单编号：${item.code}`}
        />
      </List.Item>
    )}
  />
);

export default LosssList;
