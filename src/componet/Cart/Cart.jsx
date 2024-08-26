import { Card } from "antd";

import React, { useMemo } from "react";
import {
  DiscountPrice,
  OriginPrice,
  StarCard,
  TitleCart,
  WrapperPrice,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import { Renderprice } from "../../utils/RenderPrice";

export default function Cart({ data, onClick }) {
  const discount = useMemo(() => {
    return Math.round(((data.price - data.discountPrice) / data.price) * 100);
  }, [data.discountPrice, data.price]);

  return (
    <Card
      onClick={onClick}
      styles={{
        body: {
          padding: "10px",
        },
      }}
      hoverable
      style={{ width: 210 }}
      cover={
        <img
          style={{
            width: "100%",
            height: "250px",
          }}
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }>
      <TitleCart>{data?.name}</TitleCart>
      <div style={{ display: "flex", alignItems: "center" }}>
        <StarCard>
          <span style={{ marginRight: "5px", color: "#1f1e1e" }}>
            {data?.rating}
          </span>
          <StarFilled />
        </StarCard>
        <div style={{ display: "flex" }}>
          <div
            style={{
              height: "20px",
              width: "1px",
              backgroundColor: "#ccc",
              margin: "0px 20px 0px 5px",
            }}></div>
          <span>{data.selled}</span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "5px",
            }}>
            Đã bán
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "30px",
            }}>
            kho {data.countInStock}
          </span>
        </div>
      </div>

      <WrapperPrice>
        <OriginPrice>
          {Renderprice(data?.discountPrice)}
          <sup>₫</sup>
        </OriginPrice>
        <DiscountPrice>
          <span
            style={{
              padding: " 0px 4px",
              fontSize: "15px",
              fontWeight: "500",
              color: "#27272a",
              backgroundColor: "#f5f5fa",
            }}>
            {discount}%
          </span>
          <div style={{ lineHeight: "1.5px" }}>
            <span
              style={{
                color: "#808089",
                fontSize: "11px",
                marginLeft: "5px",
                textDecorationLine: "line-through",
              }}>
              {Renderprice(data?.price)}
            </span>
            <sup style={{ color: "#808089", fontSize: "11px" }}>₫</sup>
          </div>
        </DiscountPrice>
      </WrapperPrice>
      <></>
    </Card>
  );
}
