import React from "react";
import {
  WrapperCheck,
  WrapperPrice,
  WrapperStar,
  WrapperTextLabel,
} from "./style";
import { Checkbox, Rate } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useState } from "react";

export default function NavBarComponnet() {
  const [valuePrice, setValuePrice] = useState();
  const handlePrice = (e) => {
    if (e.target.innerText === "trên 50.000") {
      return setValuePrice(50000);
    } else {
      return setValuePrice(1000000);
    }
  };
  const render = (type, option) => {
    switch (type) {
      case "text":
        return option.map((item, index) => <div key={index}>{item}</div>);
      case "checkbox":
        return option.map((item, index) => (
          <Checkbox.Group key={index}>
            <Checkbox>{item.vlaue}</Checkbox>
          </Checkbox.Group>
        ));
      case "star":
        return option.map((item, index) => (
          <div key={index} style={{}}>
            <Rate defaultValue={item} style={{ fontSize: "16px" }} />
            <span style={{ fontSize: "16px", marginLeft: "14px" }}>
              từ {item} sao
            </span>
          </div>
        ));
      case "price":
        return option.map((item, index) => (
          <span
            onClick={handlePrice}
            key={index}
            style={{
              fontSize: "16px",
              backgroundColor: "#ccc",
              padding: "0 5px",
              borderRadius: "5px",
              cursor: "pointer",
            }}>
            {item}
          </span>
        ));
      default:
        return;
    }
  };
  console.log("valuePrice", valuePrice);
  return (
    <div>
      <h2 style={{ display: "flex", justifyContent: "flex-start", margin: 0 }}>
        Danh mục sản phẩm
      </h2>
      <WrapperTextLabel>
        {render("text", ["TV", "Máy Lạnh", "Máy Giặc", "Máy Hút Bụi"])}
      </WrapperTextLabel>
      <WrapperCheck>
        {render("checkbox", [
          { lable: "A", vlaue: "A" },
          { lable: "B", vlaue: "B" },
        ])}
      </WrapperCheck>
      <WrapperStar>{render("star", [3, 4, 5])}</WrapperStar>
      <WrapperPrice>{render("price", ["dưới 40", "trên 50.000"])}</WrapperPrice>
    </div>
  );
}
