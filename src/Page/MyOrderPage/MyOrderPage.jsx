import React, { Fragment, useEffect, useState } from "react";
import { WrapperContain, WrapperContainer } from "./style";
import { Col, Divider, Image, Row } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { OrderAPI } from "../../Api/OrderAPI";
import { Renderprice } from "../../utils/RenderPrice";
import LoadingComponent from "../../componet/LoadingComponent/LoadingComponent";
import ButtonComponent from "../../componet/ButtonComponet/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MyOrderPage() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  // get order detail
  const { data, isPending, refetch } = useQuery({
    queryKey: ["getOrder"],
    queryFn: () => OrderAPI.getAllOrder(user?.id, user?.access_token),
  });
  // delete order product
  const cancelProductMutation = useMutation({
    mutationFn: async (data) => {
      const { id, orderItems, access_token } = data;
      return await OrderAPI.cancelOrder(id, orderItems, access_token);
    },
  });
  const handleOrderPageDetail = (id, totalPrice, shippingPrice) => {
    navigate(`/order-detail/${id}`, {
      state: { token: user.access_token, totalPrice, shippingPrice },
    });
  };
  const handleCancleOrderProduct = async (isDelivered, id, orderItems) => {
    if (!isDelivered) {
      await cancelProductMutation.mutate(
        {
          id: id,
          orderItems: orderItems,
          access_token: user?.access_token,
        },
        {
          onSuccess: () => {
            toast.success("delete Order product success", {
              position: "top-center",
              style: { fontSize: "16px" },
              autoClose: 2000,
            });
            refetch();
          },
          onError: (err) => {
            toast.success(err, {
              position: "top-center",
              style: { fontSize: "16px" },
              autoClose: 2000,
            });
          },
        }
      );
    }
  };

  return (
    <WrapperContainer>
      <h2 style={{ textAlign: "left" }}>Đơn mua</h2>
      <WrapperContain>
        <Row
          style={{
            padding: "10px",
            backgroundColor: "#fff",
            marginBottom: "10px",
            borderRadius: "5px",
            width: "100%",
          }}>
          <Col span={12} style={{ textAlign: "left" }}>
            Tất cả
          </Col>
          <Col span={4}>Đơn giá</Col>
          <Col span={4}>Số lượng</Col>
          <Col span={4}>Thành tiền</Col>
        </Row>
        <LoadingComponent size="large" spinning={isPending}>
          <Row style={{ width: "100%" }}>
            {data?.data?.data?.length > 0 &&
              data?.data?.data?.map((item, index) => (
                <Row
                  key={index}
                  style={{
                    boxShadow: "0 5px 10px 3px #cccc",
                    padding: "10px",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    width: "100%",
                  }}>
                  {item.orderItems.map((order) => {
                    return (
                      <Fragment key={order.product}>
                        <Row style={{ width: "100%", marginTop: "10px" }}>
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
                              src={order?.image}
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
                              {order?.name}
                            </div>
                          </Col>
                          <Col
                            span={4}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}>
                            {Renderprice(order?.discount)} <sup>₫</sup>
                          </Col>
                          <Col
                            span={4}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}>
                            {order.amount}
                          </Col>
                          <Col
                            span={4}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "black",
                              fontWeight: "700",
                            }}>
                            {Renderprice(order.discount * order.amount)}
                            <sup>₫</sup>
                          </Col>
                        </Row>
                        <Divider
                          style={{ margin: "20px 0px 10px 0px" }}></Divider>
                      </Fragment>
                    );
                  })}
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginRight: "50px",
                      width: "100%",
                      alignItems: "center",
                    }}>
                    <div>
                      <span style={{ fontSize: "18px", fontWeight: "600" }}>
                        Trạng thái đơn hàng:{" "}
                      </span>
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          color:
                            item.status === "đã giao hàng" ? "green" : "red",
                        }}>
                        {item.status}
                      </span>
                    </div>
                    <div>
                      <ButtonComponent
                        onClick={() =>
                          handleCancleOrderProduct(
                            item.isDelivered,
                            item._id,
                            item.orderItems
                          )
                        }
                        style={{
                          fontSize: "16px",
                          margin: "0 5px",
                          border: "1px solid blue",
                          color: "blue",
                        }}>
                        Hủy đơn hàng
                      </ButtonComponent>
                      <ButtonComponent
                        onClick={() =>
                          handleOrderPageDetail(
                            item?._id,
                            item?.totalPrice,
                            item?.shippingPrice
                          )
                        }
                        style={{
                          fontSize: "16px",
                          margin: "0 30px 0 5px",
                          border: "1px solid blue",
                          color: "blue",
                        }}>
                        Xem chi tiết
                      </ButtonComponent>
                    </div>
                    <div style={{ width: "300px", textAlign: "right" }}>
                      <span
                        style={{
                          fontSize: "20px",
                          marginRight: "10px",
                        }}>
                        Tổng tiền:{" "}
                      </span>
                      <span
                        style={{
                          fontSize: "20px",
                          color:
                            item.status === "đã giao hoàn thành"
                              ? "blue"
                              : "red",
                        }}>
                        {Renderprice(item?.totalPrice)} VND
                      </span>
                    </div>
                  </Row>
                </Row>
              ))}
          </Row>
        </LoadingComponent>
      </WrapperContain>
    </WrapperContainer>
  );
}
