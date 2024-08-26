import React from "react";
import { Steps } from "antd";

export default function Step({ dataArray, dataStepPriceDelivery }) {
  return (
    <Steps
      style={{ padding: "10px 0px 30px 0px" }}
      current={dataStepPriceDelivery}
      items={dataArray}
    />
  );
}
