import React, { useEffect, useMemo, useState } from "react";
import {
  CountProduct,
  WrapperButton,
  WrapperContain,
  WrapperContainer,
  WrapperInputNumber,
} from "./style";
import { Button, Checkbox, Col, Divider, Form, Image, Row } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import productAPI from "../../Api/ProductAPI";
import {
  DecreaseAmountOrder,
  IncreaseAmountOrder,
  removeManyOrder,
  removeOrder,
} from "../../Redux/counter/OrderSlide";
import { Renderprice } from "../../utils/RenderPrice";
import ModalComponent from "../../componet/ModalComponent/ModalComponent";
import InputComponent from "../../componet/InputComponet/InputComponent";
import { userAPI } from "../../Api/UserAPI";
import { toast } from "react-toastify";
import { updateUser } from "../../Redux/counter/UserSlide";
import LoadingComponent from "../../componet/LoadingComponent/LoadingComponent";
import { useNavigate } from "react-router-dom";
import Step from "../../componet/Steps/Step";

const arrayPriceDelivery = [
  {
    title: "30.000 VND",
    description: "Dưới 200.000 VND",
  },
  {
    title: "10.000 VND",
    description: "Từ 200.000 VND đến 500.000VND",
  },
  {
    title: "0 VND",
    description: "Trên 500.000 VND",
  },
];

export default function OrderPage() {
  const dispatch = useDispatch();
  const [listItemCheck, setListItemCheck] = useState([]);
  const [dataStepPriceDelivery, setDataStepPriceDelivery] = useState();
  const [valueFormUserOrder, setValueFormUserOrder] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [isOpenModalUpdateOrder, setIsOpenModalUpdateOrder] = useState(false);
  const orderProduct = useSelector((state) => state.orderProduct.orderItems);
  const [countNumberInstock, setCountNumberInstock] = useState();
  const user = useSelector((state) => state.user);
  const [form] = Form.useForm(); // Khởi tạo form instance

  const navigate = useNavigate();
  // get Product detail
  const handleDecrease = (ProductId, amount) => {
    dispatch(DecreaseAmountOrder(ProductId));

    setCountNumberInstock(amount - 1);
  };
  const handleIncrease = (ProductId, amount) => {
    dispatch(IncreaseAmountOrder(ProductId));
    setCountNumberInstock(amount + 1);
  };
  const handeleDeleteProductOrder = (ProductId) => {
    dispatch(removeOrder(ProductId));
  };
  const onChangeCheckAll = (e) => {
    if (e.target.checked) {
      const listCheck = [];
      orderProduct.map((item) => listCheck.push(item?.product));
      setListItemCheck(listCheck);
    } else {
      setListItemCheck([]);
    }
  };
  const onChangeCheckItem = (productId) => {
    const check = listItemCheck.includes(productId);
    if (check) {
      const listItemTemp = listItemCheck.filter((item) => item !== productId);
      setListItemCheck(listItemTemp);
    } else {
      setListItemCheck([...listItemCheck, productId]);
    }
  };
  const handleDeleteManyOrder = () => {
    dispatch(removeManyOrder(listItemCheck));
  };
  //filter select Order Product
  const dataSelect = useMemo(() => {
    return orderProduct.filter((item) => listItemCheck.includes(item.product));
  }, [orderProduct, listItemCheck]);

  const totalPriceTemp = useMemo(() => {
    return dataSelect.reduce(
      (sum, item) => sum + item.discount * item.amount,
      0
    );
  }, [dataSelect]);

  const priceDelivery = useMemo(() => {
    if (totalPriceTemp < 200000) {
      setDataStepPriceDelivery(0);
      return 30000;
    } else if (totalPriceTemp <= 500000 && totalPriceTemp >= 200000) {
      setDataStepPriceDelivery(1);
      return 10000;
    } else {
      setDataStepPriceDelivery(2);
      return 0;
    }
  }, [totalPriceTemp]);
  const totalPrice = useMemo(() => {
    return totalPriceTemp - priceDelivery;
  }, [totalPriceTemp, priceDelivery]);

  const handleAddCart = () => {
    if (listItemCheck.length <= 0) {
      toast.error("Chưa có sản phẩm nào được thêm vào giỏ hàng");
    } else if (!user.name || !user.phone || !user.address || !user.city) {
      setIsOpenModalUpdateOrder(true);
    } else {
      navigate("/payment", { state: listItemCheck });
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

  return (
    <WrapperContainer>
      <h2 style={{ textAlign: "left" }}>Giỏ hàng</h2>
      <Step
        dataArray={arrayPriceDelivery}
        dataStepPriceDelivery={dataStepPriceDelivery}></Step>
      <WrapperContain>
        <Col span={18}>
          <Row
            style={{
              padding: "10px",
              backgroundColor: "#fff",
              marginBottom: "10px",
              borderRadius: "5px",
            }}>
            <Col span={12} style={{ textAlign: "left" }}>
              <Checkbox
                onChange={(e) => onChangeCheckAll(e)}
                checked={orderProduct.length === listItemCheck.length}>
                Tất cả <span>({orderProduct.length} sản phẩm)</span>
              </Checkbox>
            </Col>
            <Col span={3}>Đơn giá</Col>
            <Col span={3}>Số lượng</Col>
            <Col span={3}>Thành tiền</Col>
            <Col span={3}>
              <DeleteOutlined onClick={handleDeleteManyOrder} />
            </Col>
          </Row>
          {orderProduct.length > 0 &&
            orderProduct.map((item) => (
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
                  <Checkbox
                    onChange={() => onChangeCheckItem(item.product)}
                    checked={listItemCheck.includes(item.product)}></Checkbox>
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
                <Col span={3}>
                  {Renderprice(item.discount)} <sup>₫</sup>
                </Col>
                <Col span={3}>
                  <CountProduct>
                    <button
                      style={{
                        cursor: item.amount === 1 ? "no-drop" : "pointer",
                      }}
                      disabled={item.amount === 1 ? true : false}
                      className="btn-count"
                      onClick={() =>
                        handleDecrease(item?.product, item?.amount)
                      }>
                      <MinusOutlined />
                    </button>
                    <WrapperInputNumber
                      min={1}
                      max={item.amount}
                      defaultValue={item.amount}
                      value={item.amount}
                      // onChange={onChange}
                    />
                    <button
                      onClick={() =>
                        handleIncrease(item?.product, item?.amount)
                      }
                      className="btn-count"
                      style={{
                        cursor:
                          countNumberInstock >= item?.inStock
                            ? "no-drop"
                            : "pointer",
                      }}
                      disabled={
                        countNumberInstock >= item?.inStock ? true : false
                      }>
                      <PlusOutlined />
                    </button>
                  </CountProduct>
                </Col>
                <Col span={3} style={{ color: "red" }}>
                  {Renderprice(item.discount * item.amount)}
                  <sup>₫</sup>
                </Col>
                <Col span={3}>
                  <DeleteOutlined
                    style={{ cursor: "pointer" }}
                    onClick={() => handeleDeleteProductOrder(item.product)}
                  />
                </Col>
              </Row>
            ))}
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
                <span>Phí giao hàng</span>

                <p style={{ margin: "0px", fontWeight: "500" }}>
                  {totalPriceTemp === 0 ? 0 : Renderprice(priceDelivery)}{" "}
                  <sup>₫</sup>
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
                  style={{ color: "red", fontSize: "20px", textAlign: "end" }}>
                  {totalPriceTemp ? Renderprice(totalPrice) : "0"}
                  <sup>₫</sup>
                </span>
                <span style={{ fontSize: "13px" }}>
                  (Đã bao gồm VAT nếu có)
                </span>
              </div>
            </div>
          </div>
          <WrapperButton onClick={handleAddCart}>Mua hàng</WrapperButton>
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
    </WrapperContainer>
  );
}
