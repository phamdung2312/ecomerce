import React, { useEffect, useMemo, PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
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
import { Renderprice } from "../../../utils/RenderPrice";
import { Col, Image, Row, Select } from "antd";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { OrderAPI } from "../../../Api/OrderAPI";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingComponent from "../../../componet/LoadingComponent/LoadingComponent";
import Step from "../../../componet/Steps/Step";

export default function OrderDetailAdmin() {
  const [valueStatusSteps, setValueStatusSteps] = useState();
  const [statusOrder, setStatusOrder] = useState();
  const location = useLocation();

  const {
    isSuccess,
    data: dataGetOrderDetail,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["getOrder"],
    queryFn: () => OrderAPI.getOrderDetail(params?.id, user.access_token),
  });

  const dataStatus = useMemo(
    async () => await dataGetOrderDetail,
    [dataGetOrderDetail]
  );

  useEffect(() => {
    if (isSuccess) {
      setStatusOrder(dataGetOrderDetail?.data?.data?.status);
      if (dataGetOrderDetail?.data?.data?.status === "đang xử lý") {
        return setValueStatusSteps(0);
      } else if (
        dataGetOrderDetail?.data?.data?.status === "chuyển đến shipper"
      ) {
        return setValueStatusSteps(1);
      } else {
        return setValueStatusSteps(2);
      }
    }
  }, [isSuccess, dataGetOrderDetail]);
  const user = useSelector((state) => state.user);
  const params = useParams();

  const optionsOrder = [
    { value: "đang xử lý", label: "đang xử lý" },
    {
      value: "chuyển đến shipper",
      label: "chuyển đến shipper",
    },
    { value: "đã giao hàng", label: "đã giao hàng" },
  ];
  const updateOrderMutation = useMutation({
    mutationFn: (data) => {
      const { id, access_token, ...rest } = data;
      return OrderAPI.updateOrder(id, rest, access_token);
    },
  });

  const { data } = updateOrderMutation;

  const handleChange = (value) => {
    setStatusOrder(value);
    updateOrderMutation.mutate(
      {
        id: params.id,
        value,
        access_token: user.access_token,
      },
      {
        onSuccess: () => {
          toast.success("delete many product success", {
            position: "top-center",
            style: { fontSize: "16px" },
            autoClose: 2000,
          });

          refetch();
        },
      }
    );
  };
  const arrayPriceDelivery = [
    {
      title: "Đang xử lý",
    },
    {
      title: "Chuyển đến shipper",
    },
    {
      title: "Đã giao hàng",
    },
  ];
  return (
    <LoadingComponent size="large" spinning={isPending}>
      <WrapperContainer>
        <Step
          dataArray={arrayPriceDelivery}
          dataStepPriceDelivery={valueStatusSteps}></Step>

        <WrapperHeader>Chi tiết đơn hàng</WrapperHeader>

        <WrapperContent>
          <WrapperContentContainer>
            <WrapperContentbody>
              <WrapperContentHeader>ĐỊA CHỈ NGƯỜI NHẬN</WrapperContentHeader>
              <WrapperContentItemContainer>
                <WrapperContentItem>
                  {location.state.shippingAddress?.fullName}
                </WrapperContentItem>
                <WrapperContentItem>
                  Địa chỉ: {location.state.shippingAddress?.address}
                </WrapperContentItem>
                <WrapperContentItem>
                  SĐT: {location.state.shippingAddress?.phone}
                </WrapperContentItem>
              </WrapperContentItemContainer>
            </WrapperContentbody>
            <WrapperContentbody>
              <WrapperContentHeader>HÌNH THỨC GIAO HÀNG</WrapperContentHeader>
              <WrapperContentItemContainer>
                <WrapperContentItem>Giao hàng {}</WrapperContentItem>
                <WrapperContentItem>
                  Phí giao hàng: {Renderprice(location.state?.shippingPrice)}{" "}
                  VND
                </WrapperContentItem>
              </WrapperContentItemContainer>
            </WrapperContentbody>
            <WrapperContentbody>
              <WrapperContentHeader>HÌNH THỨC THANH TOÁN</WrapperContentHeader>
              <WrapperContentItemContainer>
                <WrapperContentItem>
                  {location.state?.paymentMethod}
                </WrapperContentItem>
                {location.state?.isPaid ? "Đã thanh toán " : "Chưa thanh toán"}
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
          <Col span={4}>Giá khuyến mãi</Col>
        </Row>
        {location.state.orderItems?.length > 0 &&
          location.state.orderItems.map((item) => (
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
                {Renderprice(item?.discount)} <sup>₫</sup>
              </Col>
            </Row>
          ))}
        <Row>
          <Col
            span={8}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <span
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginRight: "10px",
              }}>
              Cập nhật trạng thái:{" "}
            </span>
            <Select
              defaultValue={statusOrder && statusOrder}
              style={{ width: 250 }}
              options={optionsOrder}
              onChange={handleChange}
            />
          </Col>
          <Col
            span={8}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <div>
              <span style={{ fontSize: "18px", fontWeight: "600" }}>
                Tình trạng đơn hàng:{" "}
              </span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color:
                    dataGetOrderDetail?.data?.data?.status === "đã giao hàng"
                      ? "green"
                      : "red",
                }}>
                {dataGetOrderDetail?.data?.data?.status ||
                  location.state.status}
              </span>
            </div>
          </Col>
          <Col span={8}>
            <WrapperBodypriceTotal>
              <WrapperBodypriceBody>
                <WrapperBodypriceBodyTitle>
                  Tạm tính:{" "}
                </WrapperBodypriceBodyTitle>{" "}
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
                <WrapperBodypriceBodyTitle>
                  Tổng tiền:{" "}
                </WrapperBodypriceBodyTitle>{" "}
                <span style={{ fontSize: "20px", color: "red" }}>
                  {Renderprice(location.state.totalPrice)} VND
                </span>
              </WrapperBodypriceBody>
            </WrapperBodypriceTotal>
          </Col>
        </Row>
      </WrapperContainer>
    </LoadingComponent>
  );
}
