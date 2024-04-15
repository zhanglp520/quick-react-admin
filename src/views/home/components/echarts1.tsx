import React, { useEffect, useRef, useState } from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

const Echarts: React.FC = () => {
  let myChart = null;

  useEffect(() => {
    myChart = echarts.init(document.getElementById("main"));
    const option = {
      color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
      title: {
        text: "本周订单量量",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["线上订单量", "线下订单量", "线上预售量", "线下预售量"],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "线上订单量",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(0, 221, 255)",
              },
              {
                offset: 1,
                color: "rgb(77, 119, 255)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [120, 282, 111, 234, 220, 340, 310],
        },
        {
          name: "线下订单量",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(55, 162, 255)",
              },
              {
                offset: 1,
                color: "rgb(116, 21, 219)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [320, 132, 201, 334, 190, 130, 220],
        },

        {
          name: "线上预售量",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          label: {
            show: true,
            position: "top",
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(255, 0, 135)",
              },
              {
                offset: 1,
                color: "rgb(135, 0, 157)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [220, 302, 181, 234, 210, 290, 150],
        },
        {
          name: "线下预售量",
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          label: {
            show: true,
            position: "top",
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(255, 191, 0)",
              },
              {
                offset: 1,
                color: "rgb(224, 62, 76)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [220, 302, 181, 234, 210, 290, 150],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }, []);
  return (
    <>
      <div id="main" style={{ width: 760, height: 475 }}></div>
    </>
  );
};

export default Echarts;
