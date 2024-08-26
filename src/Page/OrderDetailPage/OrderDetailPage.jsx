import React from "react";
import {
  WrapperBodypriceBody,
  WrapperBodypriceBodyTitle,
  WrapperBodypriceTotal,
  WrapperContainer,
  WrapperContent,
  WrapperContentbody,
  WrapperContentContainer,
  WrapperContentHeader,
  WrapperContentItem,
  WrapperContentItemContainer,
  WrapperHeader,
} from "./style";
import { Col, Image, Row } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { OrderAPI } from "../../Api/OrderAPI";
import { Renderprice } from "../../utils/RenderPrice";

export default function OrderDetailPage() {
  const paramId = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isPending } = useQuery({
    queryKey: ["getOrder"],
    queryFn: () => OrderAPI.getOrderDetail(paramId?.id, location?.state?.token),
  });

  return (
    <WrapperContainer>
      <WrapperHeader>Chi tiết đơn hàng</WrapperHeader>
      <WrapperContent>
        <WrapperContentContainer>
          <WrapperContentbody>
            <WrapperContentHeader>ĐỊA CHỈ NGƯỜI NHẬN</WrapperContentHeader>
            <WrapperContentItemContainer>
              <WrapperContentItem>
                {data?.data?.data.shippingAddress?.fullName}
              </WrapperContentItem>
              <WrapperContentItem>
                Địa chỉ: {data?.data.data.shippingAddress?.address}
              </WrapperContentItem>
              <WrapperContentItem>
                SĐT: {data?.data.data.shippingAddress?.phone}
              </WrapperContentItem>
            </WrapperContentItemContainer>
          </WrapperContentbody>
          <WrapperContentbody>
            <WrapperContentHeader>HÌNH THỨC GIAO HÀNG</WrapperContentHeader>
            <WrapperContentItemContainer>
              <WrapperContentItem>Giao hàng {}</WrapperContentItem>
              <WrapperContentItem>
                Phí giao hàng: {Renderprice(data?.data.data?.shippingPrice)} VND
              </WrapperContentItem>
            </WrapperContentItemContainer>
          </WrapperContentbody>
          <WrapperContentbody>
            <WrapperContentHeader>HÌNH THỨC THANH TOÁN</WrapperContentHeader>
            <WrapperContentItemContainer>
              <WrapperContentItem>
                {data?.data.data.paymentMethod}
              </WrapperContentItem>
              {data?.data.data.isPaid ? "Đã thanh toán " : "Chưa thanh toán"}
              <WrapperContentItem>{}</WrapperContentItem>
            </WrapperContentItemContainer>
          </WrapperContentbody>
        </WrapperContentContainer>
      </WrapperContent>
      <Row style={{ marginTop: "50px" }}>
        <Col
          span={12}
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "flex-start",
          }}>
          Sản phẩm
        </Col>
        <Col span={4}>Giá</Col>
        <Col span={4}>Số lượng</Col>
        <Col span={4}>Giảm giá</Col>
      </Row>
      {data?.data.data.orderItems?.length > 0 &&
        data?.data.data.orderItems.map((item) => (
          <Row
            key={item.product}
            style={{
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              marginTop: "15px",
            }}>
            <Col
              span={12}
              style={{
                textAlign: "left",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Image
                preview={false}
                style={{ marginLeft: "5px" }}
                width={72}
                src={item?.image}
              />
              <div
                style={{
                  width: "100%",
                  marginLeft: "15px",
                  fontSize: "16px",
                  whiteSpace: "nowrap", // Không cho phép xuống dòng
                  overflow: "hidden", // Ẩn phần văn bản tràn ra ngoài
                  textOverflow: "ellipsis",
                }}>
                {item.name}
              </div>
            </Col>
            <Col span={4}>
              {Renderprice(item?.price)} <sup>₫</sup>
            </Col>
            <Col span={4}>{item?.amount}</Col>
            <Col span={4}>
              {Math.round(((item?.price - item?.discount) / item?.price) * 100)}{" "}
              %
            </Col>
          </Row>
        ))}
      <WrapperBodypriceTotal>
        <WrapperBodypriceBody>
          <WrapperBodypriceBodyTitle>Tạm tính: </WrapperBodypriceBodyTitle>{" "}
          <span style={{ fontSize: "20px", color: "red" }}>
            {Renderprice(
              location.state.totalPrice + location.state.shippingPrice
            )}{" "}
            VND
          </span>
        </WrapperBodypriceBody>
        <WrapperBodypriceBody>
          <WrapperBodypriceBodyTitle>
            Phí vận chuyển:{" "}
          </WrapperBodypriceBodyTitle>{" "}
          <span style={{ fontSize: "20px", color: "red" }}>
            {Renderprice(location.state.shippingPrice)} VND
          </span>
        </WrapperBodypriceBody>
        <WrapperBodypriceBody>
          <WrapperBodypriceBodyTitle>Tổng tiền: </WrapperBodypriceBodyTitle>{" "}
          <span style={{ fontSize: "20px", color: "red" }}>
            {Renderprice(location.state.totalPrice)} VND
          </span>
        </WrapperBodypriceBody>
      </WrapperBodypriceTotal>
    </WrapperContainer>
  );
}
