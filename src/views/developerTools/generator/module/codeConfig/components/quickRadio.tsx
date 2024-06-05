import React, { useState, useEffect } from "react";
import { Radio, RadioChangeEvent, Space, Tooltip } from "antd";
import "./index.less";

export type QuickProp = {
  data: [];
  value: any;
};
const QuickRadio: React.FC<QuickProp> = (props: QuickProp) => {
  const { data, value } = props;
  const [radioValue, setRadioValue] = useState();
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setRadioValue(e.target.value);
  };
  useEffect(() => {
    console.log("数据库", data);
    setRadioValue(value);
  }, [data, value]);
  return (
    <>
      <div className="radio-wrap">
        <Radio.Group onChange={onChange} value={radioValue}>
          <Space size={[8, 16]} wrap>
            {data &&
              data.map((item, index) => (
                <Tooltip title={item.explain} color="#2db7f5">
                  <Radio key={index} value={item.value}>
                    {item.label}
                  </Radio>
                </Tooltip>
              ))}
          </Space>
        </Radio.Group>
      </div>
    </>
  );
};
export default QuickRadio;
