import React, { useEffect, useRef, useState } from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
const Echarts: React.FC = () => {
  let myChart = null;

  useEffect(() => {
    myChart = echarts.init(document.getElementById("main"));
    const option = {
      legend: {
        top: "top",
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "销量统计",
          type: "pie",
          radius: [50, 250],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8,
          },
          data: [
            { value: 40, name: "今日订单量" },
            { value: 38, name: "昨日订单量" },
            { value: 32, name: "本周订单量" },
            { value: 30, name: "本月订单量" },
          ],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }, []);
  return <div id="main" style={{ width: 500, height: 400 }}></div>;
};
export default Echarts;
