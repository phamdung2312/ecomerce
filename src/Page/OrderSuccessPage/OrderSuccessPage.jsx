import React, { useEffect, useState } from "react";
import {
  WrapperContain,
  WrapperContainer,
  WrapperSelect,
  WrapperSelectItem,
} from "./style";
import HeaderPaymentComponent from "../../componet/HeaderPaymentComponent/HeaderPaymentComponent";
import { Col, Form, Image, Row } from "antd";

import { useMutation } from "@tanstack/react-query";

import { useLocation } from "react-router-dom";
import { OrderAPI } from "../../Api/OrderAPI";
import { Renderprice } from "../../utils/RenderPrice";
import { useSelector } from "react-redux";

export default function OrderSuccessPage() {
  const [valueFormUserOrder, setValueFormUserOrder] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [isOpenModalUpdateOrder, setIsOpenModalUpdateOrder] = useState(false);
  const location = useLocation();

  const orderProduct = useSelector((state) => state.orderProduct.orderItems);
  const user = useSelector((state) => state.user);
  const [form] = Form.useForm(); // Khởi tạo form instance\

  // payment Order product
  const PaymentMutation = useMutation({
    mutationFn: (data) => {
      const { token, ...rest } = data;
      return OrderAPI.paymentOrder(rest, token);
    },
  });

  const { isPending: isPendingPayment } = PaymentMutation;

  // update User

  useEffect(() => {
    setValueFormUserOrder({
      name: user.name,
      phone: user.phone,
      address: user.address,
      city: user.city,
    });
  }, [user]);
  useEffect(() => {
    if (isOpenModalUpdateOrder) {
      form.setFieldsValue(valueFormUserOrder);
    }
  }, [isOpenModalUpdateOrder, form, valueFormUserOrder]);

  return (
    <WrapperContainer>
      <HeaderPaymentComponent
        title={"Thông tin đơn hàng"}></HeaderPaymentComponent>
      <WrapperContain>
        <Col span={24}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
              backgroundColor: "#fff",
              borderRadius: "5px",
              padding: "40px 20px",
            }}>
            <h3
              style={{
                fontSize: "18px",
                margin: "-19px 0px 0px 0px",
                paddingBottom: "28px",
              }}>
              Phương thức giao hàng
            </h3>
            <WrapperSelect>
              {location.state.valueDelivery === "giao hàng siêu tốc" ? (
                <div value={"giao hàng siêu tốc"} defaultChecked>
                  <Image
                    preview={false}
                    style={{
                      width: "36px",
                      height: "17px",
                      objectFit: "contain",
                      marginRight: "5px",
                      marginBottom: "3px",
                    }}
                    src={
                      "https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png"
                    }></Image>
                  <span>Giao siêu tốc 2h</span>
                  <WrapperSelectItem>-10k</WrapperSelectItem>
                </div>
              ) : (
                <div value={"giao hàng tiết kiệm"}>
                  <span>Giao tiết kiệm</span>
                  <WrapperSelectItem>-10k</WrapperSelectItem>
                </div>
              )}
            </WrapperSelect>
          </div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
              backgroundColor: "#fff",
              borderRadius: "5px",
              padding: "40px 20px",
            }}>
            <h3
              style={{
                fontSize: "18px",
                margin: "-19px 0px 0px 0px",
                paddingBottom: "28px",
              }}>
              Phương thức thanh toán
            </h3>
            <WrapperSelect>
              {location.state.valuePaymentMethod === "Tiền mặt" ? (
                <span value={"Tiền mặt"}>Thanh toán bằng tiền mặt</span>
              ) : (
                <span value={"Ngân hàng"}>Thanh toán bằng ngân hàng</span>
              )}
            </WrapperSelect>
          </div>
          <Row
            style={{
              padding: "10px 20px",
              backgroundColor: "#fff",
              marginBottom: "10px",
              borderRadius: "5px",
              marginTop: "20px",
            }}>
            <Col span={12} style={{ textAlign: "left" }}>
              Tất cả sản phẩm ({location.state.dataSelect.length})
            </Col>
            <Col span={4}>Đơn giá</Col>
            <Col span={4}>Số lượng</Col>
            <Col span={4}>Thành tiền</Col>
          </Row>
          {location.state.dataSelect.length > 0 &&
            location.state.dataSelect.map((item) => (
              <Row
                key={item.product}
                style={{
                  padding: "10px",
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
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
                  {Renderprice(item.discount)} <sup>₫</sup>
                </Col>
                <Col span={4}>{item.amount}</Col>
                <Col span={4} style={{ color: "red" }}>
                  {Renderprice(item.discount * item.amount)}
                  <sup>₫</sup>
                </Col>
              </Row>
            ))}
          <Row
            style={{
              display: "flex",
              justifyContent: "end",
              marginRight: "50px",
            }}>
            <span style={{ fontSize: "20px", marginRight: "10px" }}>
              Tổng tiền:{" "}
            </span>
            <span style={{ fontSize: "20px", color: "red" }}>
              {Renderprice(location.state.totalPrice)} VND
            </span>
          </Row>
        </Col>
      </WrapperContain>
    </WrapperContainer>
  );
}
