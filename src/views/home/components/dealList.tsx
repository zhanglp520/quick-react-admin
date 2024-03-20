import React from "react";
import { Avatar, List } from "antd";

const data = [
  {
    name: "小米机械键盘",
    code: "000154478284",
  },
  {
    name: "不粘锅超大炒菜锅",
    code: "000154478284",
  },
  {
    name: "超迷你可爱娃衣",
    code: "000154478284",
  },
  {
    name: "自动电饼铛",
    code: "000154478284",
  },
  {
    name: "二次元周边柯南挂牌",
    code: "000154478284",
  },
  {
    name: "朝可爱打字爽键盘",
    code: "000154478284",
  },
];

const DealList: React.FC = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item actions={[<a key="list-loadmore-edit">详情</a>]}>
        <List.Item.Meta
          title={item.name}
          description={`订单编号：${item.code}`}
        />
      </List.Item>
    )}
  />
);

export default DealList;
