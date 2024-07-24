import React from "react";
import { Avatar, Card, Flex } from "antd";
import "./index.less";

import Echarts1 from "./components/echarts1";
import DealList from "./components/dealList";
import LosssList from "./components/lossList";

const { Meta } = Card;
const baseStyle: React.CSSProperties = {
  width: "25%",
  height: 154,
};
const Home: React.FC = () => {
  return (
    <div className="box">
      <div className="item-top">
        <Flex gap="small">
          <Card
            style={{
              ...baseStyle,
              marginTop: 16,
              backgroundColor: "rgb(152 231 191)",
            }}
            hoverable
          >
            <Meta
              avatar={<Avatar src="@/assets/images/login-bg.jpeg" />}
              title="4242"
              description="当日订单总量"
            />
            <div>111</div>
          </Card>
          <Card
            style={{
              ...baseStyle,
              marginTop: 16,
              backgroundColor: "rgb(231 209 152)",
            }}
            hoverable
          >
            <Meta
              avatar={<Avatar src="@/assets/images/login-bg.jpeg" />}
              title="9814"
              description="昨日订单总量"
            />
          </Card>
          <Card
            style={{
              ...baseStyle,
              marginTop: 16,
              backgroundColor: "rgb(152 169 231)",
            }}
            hoverable
          >
            <Meta
              avatar={<Avatar src="@/assets/images/login-bg.jpeg" />}
              title="18522"
              description="本周订单总量"
            />
          </Card>
          <Card
            style={{
              ...baseStyle,
              marginTop: 16,
              backgroundColor: "rgb(231 152 231)",
            }}
            hoverable
          >
            <Meta
              avatar={<Avatar src="@/assets/images/login-bg.jpeg" />}
              title="99999"
              description="本月订单数总量"
            />
          </Card>
        </Flex>
      </div>
      <div className="content-wrap">
        <div className="content-echart">
          <Echarts1></Echarts1>
        </div>
        <div className="content-deal">
          <h3>成交订单详情</h3>
          <DealList></DealList>
        </div>
        <div className="content-loss">
          <h3>流失订单详情</h3>
          <LosssList></LosssList>
        </div>
      </div>
    </div>
  );
};

export default Home;
