import React, { useEffect, useMemo, useState } from "react";
import HeaderPaymentComponent from "../../componet/HeaderPaymentComponent/HeaderPaymentComponent";
import {
  WrapperButton,
  WrapperContain,
  WrapperContainer,
  WrapperSelect,
  WrapperSelectItem,
} from "./styyle";
import { Col, Divider, Form, Image, Radio, Space } from "antd";

import { Renderprice } from "../../utils/RenderPrice";
import ModalComponent from "../../componet/ModalComponent/ModalComponent";
import LoadingComponent from "../../componet/LoadingComponent/LoadingComponent";
import InputComponent from "../../componet/InputComponet/InputComponent";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { userAPI } from "../../Api/UserAPI";
import { updateUser } from "../../Redux/counter/UserSlide";
import { useLocation, useNavigate } from "react-router-dom";
import { OrderAPI } from "../../Api/OrderAPI";
import { removeManyOrder, removeOrder } from "../../Redux/counter/OrderSlide";
import { PayPalButton } from "react-paypal-button-v2";
import { PaymentAPI } from "../../Api/PaymentAPI";

export default function PaymentPage() {
  const dispatch = useDispatch();
  const [skdReady, setSkdReady] = useState(false);
  const [valueDelivery, setValueDelivery] = useState("Tiền mặt");
  const [valuePaymentMethod, setValuePaymentMethod] = useState("");
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
  const navigate = useNavigate();
  // payment Order product
  const PaymentMutation = useMutation({
    mutationFn: (data) => {
      const { access_token, ...rest } = data;
      return OrderAPI.paymentOrder(rest, access_token);
    },
  });

  const { isPending: isPendingPayment } = PaymentMutation;

  //filter select Order Product
  const dataSelect = useMemo(() => {
    return orderProduct.filter((item) =>
      location?.state?.includes(item.product)
    );
  }, [orderProduct, location]);

  const totalPriceTemp = useMemo(() => {
    return dataSelect.reduce(
      (sum, item) => sum + item.discount * item.amount,
      0
    );
  }, [dataSelect]);

  const priceDelivery = useMemo(() => {
    if (totalPriceTemp < 200000) {
      return 30000;
    } else if (totalPriceTemp <= 500000 && totalPriceTemp >= 200000) {
      return 10000;
    } else {
      return 0;
    }
  }, [totalPriceTemp]);
  const totalPrice = useMemo(() => {
    return totalPriceTemp - priceDelivery;
  }, [totalPriceTemp, priceDelivery]);

  const handlePayment = () => {
    if (
      valueDelivery.length > 0 &&
      valuePaymentMethod.length > 0 &&
      totalPriceTemp !== 0
    ) {
      PaymentMutation.mutate(
        {
          orderItems: dataSelect,
          fullName: user.name,
          address: user.address,
          phone: user.phone,
          city: user.city,
          paymentMethod: valuePaymentMethod,
          shippingPrice: priceDelivery,
          totalPrice: totalPrice,
          user: user.id,
          email: user.email,
          status: "đang xử lý",
          access_token: user.access_token,
        },
        {
          onSuccess: () => {
            toast.success("Thanh toán thành công", {
              position: "top-center",
              style: { fontSize: "16px" },
              autoClose: 1000,
            });
            dispatch(removeManyOrder(location?.state));
            navigate("/order-success", {
              state: {
                valueDelivery,
                valuePaymentMethod,
                dataSelect,
                totalPrice,
              },
            });
          },

          onError: () => {},
        }
      );
    } else {
      toast.error("Chưa chọn hình thức giao hàng hoặc thanh toán", {
        position: "top-center",
        style: { fontSize: "16px" },
        autoClose: 1000,
      });
    }
  };

  // update User
  const updateUserMutation = useMutation({
    mutationFn: (data) => {
      const { id, access_token, ...rest } = data;
      return userAPI.updateUser(id, rest, access_token);
    },
  });

  const { isPending: isPendingUpdateUserOder } = updateUserMutation;

  const handleOnChange = (e) => {
    setValueFormUserOrder({
      ...valueFormUserOrder,
      [e.target.name]: e.target.value,
    });
  };
  const handleOkeUserOrder = () => {
    updateUserMutation.mutate(
      {
        id: user.id,
        ...valueFormUserOrder,
        access_token: user.access_token,
      },
      {
        onSuccess: (data) => {
          toast.success("Update User Order Success", {
            position: "top-center",
            style: { fontSize: "16px" },
            autoClose: 2000,
          });
          dispatch(updateUser(data));
          setIsOpenModalUpdateOrder(false);
        },
      }
    );
  };
  const handleCancelUserOrder = () => {
    setIsOpenModalUpdateOrder(false);
  };
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

  const onFinishProductUpdate = () => {};

  const handleChangeAddress = () => {
    setIsOpenModalUpdateOrder(true);
  };
  const onChangeCheckRadioDelivery = (e) => {
    setValueDelivery(e.target.value);
  };
  const onChangeCheckRadioPayment = (e) => {
    setValuePaymentMethod(e.target.value);
  };
  const addPaypalScript = async () => {
    const { data } = await PaymentAPI.getConfig();
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://sandbox.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSkdReady(true);
    };
    document.body.appendChild(script);
  };
  useEffect(() => {
    if (window.paypal) {
      addPaypalScript();
    }
  }, []);

  const handlePaymentSuccess = (details, data) => {
    PaymentMutation.mutate(
      {
        orderItems: dataSelect,
        fullName: user.name,
        address: user.address,
        phone: user.phone,
        city: user.city,
        paymentMethod: valuePaymentMethod,
        shippingPrice: priceDelivery,
        totalPrice: totalPrice,
        user: user.id,
        isPaid: true,
        paidAt: details.update_time,
        status: "đang xử lý",
        access_token: user.access_token,
      },
      {
        onSuccess: () => {
          toast.success("Thanh toán thành công", {
            position: "top-center",
            style: { fontSize: "16px" },
            autoClose: 1000,
          });
          dispatch(removeManyOrder(location?.state));
          navigate("/order-success", {
            state: {
              valueDelivery,
              valuePaymentMethod,
              dataSelect,
              totalPrice,
            },
          });
        },

        onError: () => {},
      }
    );
  };
  return (
    <WrapperContainer>
      <HeaderPaymentComponent title={"Thanh toán"}></HeaderPaymentComponent>
      <LoadingComponent spinning={isPendingPayment} size="large">
        <WrapperContain>
          <Col span={18}>
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
                Chọn hình thức giao hàng
              </h3>
              <WrapperSelect>
                <Radio.Group
                  onChange={onChangeCheckRadioDelivery}
                  value={valueDelivery}>
                  <Space direction="vertical" style={{ textAlign: "left" }}>
                    <Radio value={"giao hàng siêu tốc"}>
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
                    </Radio>
                    <Radio value={"giao hàng tiết kiệm"}>
                      <span>Giao tiết kiệm</span>
                      <WrapperSelectItem>-10k</WrapperSelectItem>
                    </Radio>
                  </Space>
                </Radio.Group>
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
                Chọn hình thức thanh toán
              </h3>
              <WrapperSelect>
                <Radio.Group
                  onChange={onChangeCheckRadioPayment}
                  value={valuePaymentMethod}>
                  <Space direction="vertical" style={{ textAlign: "left" }}>
                    <Radio value={"Tiền mặt"}>Thanh toán bằng tiền mặt</Radio>
                    <Radio value={"Paypal"}>Thanh toán bằng paypal</Radio>
                  </Space>
                </Radio.Group>
              </WrapperSelect>
            </div>
          </Col>
          <Col span={6}>
            <div
              style={{
                marginBottom: "10px",
                padding: "15px 15px",
                borderRadius: "5px",
                marginLeft: "10px",
                justifyContent: "center",
                flexDirection: "column",
                display: "flex",
                backgroundColor: "#fff",
              }}>
              <div style={{ textAlign: "left", fontSize: "15px" }}>
                <span>Địa chỉ: </span>
                <span style={{ fontWeight: "700" }}>
                  {user.address} {user.city}
                </span>
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={handleChangeAddress}>
                  {" "}
                  Thay đổi
                </span>
              </div>
              <Divider style={{ marginBottom: "0px" }} />
              <div
                style={{
                  width: "100%",
                }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "17px",
                  }}>
                  <span>Tạm tính</span>
                  <p style={{ margin: "0px", fontWeight: "500" }}>
                    {Renderprice(totalPriceTemp)} <sup>₫</sup>
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "17px",
                  }}>
                  <span>Giảm giá</span>
                  <p style={{ margin: "0px", fontWeight: "500" }}>0%</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "17px",
                  }}>
                  <span>Thuế</span>
                  <p style={{ margin: "0px", fontWeight: "500" }}>
                    0 <sup>₫</sup>
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "17px",
                  }}>
                  <span>Phí giao hàng</span>

                  <p style={{ margin: "0px", fontWeight: "500" }}>
                    {Renderprice(priceDelivery)} <sup>₫</sup>
                  </p>
                </div>
              </div>
              <Divider style={{ marginBottom: "0px" }} />
              <div
                style={{
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                <div>Tổng tiền: </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      color: "red",
                      fontSize: "20px",
                      textAlign: "end",
                    }}>
                    {totalPriceTemp ? Renderprice(totalPrice) : "0"}
                    <sup>₫</sup>
                  </span>
                  <span style={{ fontSize: "13px" }}>
                    (Đã bao gồm VAT nếu có)
                  </span>
                </div>
              </div>
            </div>
            {valuePaymentMethod === "Tiền mặt" && !skdReady ? (
              <WrapperButton onClick={handlePayment}>Đặt hàng</WrapperButton>
            ) : (
              <LoadingComponent spinning={skdReady}>
                <PayPalButton
                  amount={totalPrice / 25000}
                  // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                  onSuccess={(details, data) =>
                    handlePaymentSuccess(details, data)
                  }
                  onError={() => alert("Error")}
                />
              </LoadingComponent>
            )}
          </Col>
        </WrapperContain>

        <ModalComponent
          title="Cập nhật thông tin giao hàng"
          onOk={handleOkeUserOrder}
          onCancel={handleCancelUserOrder}
          open={isOpenModalUpdateOrder}>
          <LoadingComponent spinning={isPendingUpdateUserOder}>
            <Form
              form={form}
              name="basic"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinishProductUpdate}
              //   onFinishFailed={onFinishFailed}
              autoComplete="off">
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}>
                <InputComponent
                  value={valueFormUserOrder.name}
                  onChange={handleOnChange}
                  name="name"
                />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone!",
                  },
                ]}>
                <InputComponent
                  value={valueFormUserOrder.phone}
                  onChange={handleOnChange}
                  name="phone"
                />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your Address!",
                  },
                ]}>
                <InputComponent
                  value={valueFormUserOrder.address}
                  onChange={handleOnChange}
                  name="address"
                />
              </Form.Item>
              <Form.Item
                label="City"
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Please input your City!",
                  },
                ]}>
                <InputComponent
                  value={valueFormUserOrder.city}
                  onChange={handleOnChange}
                  name="city"
                />
              </Form.Item>
            </Form>
          </LoadingComponent>
        </ModalComponent>
      </LoadingComponent>
    </WrapperContainer>
  );
}
