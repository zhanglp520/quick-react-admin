import React, { useState, useEffect } from "react";
import { Avatar, Card, Flex } from "antd";
import "./index.less";

// import Echarts1 from "./components/echarts1";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
type SizeType = ConfigProviderProps["componentSize"];
const { Meta } = Card;
const baseStyle: React.CSSProperties = {
  width: "25%",
  height: 154,
};
const Home: React.FC = () => {
  let myChart = null;

  useEffect(() => {
    myChart = echarts.init(document.getElementById("main"));
    const option = {
      // ECharts 配置项
      title: {
        text: "ECharts 示例",
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }, []);
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
              description="当日订单数量"
            />
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
              description="昨日订单量"
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
              description="本周订单量"
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
              description="本月订单数量"
            />
          </Card>
        </Flex>
      </div>
      <div id="main" style={{ width: 500, height: 400 }}></div>
      {/* <Echarts1></Echarts1> */}
    </div>
  );
};

export default Home;
