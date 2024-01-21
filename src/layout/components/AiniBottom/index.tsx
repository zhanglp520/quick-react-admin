import { FC } from "react";
import "./index.less";

type PropType = {};

const AiniBottom: FC<PropType> = (props: PropType) => {
  console.log("AiniBottom-props", props);

  return <>Footer</>;
};

export default AiniBottom;
