import { Badge, Col, Popover } from "antd";
import React, { useEffect, useState } from "react";
import Logo from "../../asset/Image/Logo_Tiki_2023.png";
import {
  AccountHeadersWrapper,
  CartHeadersWrapper,
  ImageHeaders,
  TextHeaders,
  WrapperHeaders,
  WrapperOptionPopover,
} from "./style";

import {
  UserOutlined,
  ArrowDownOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import InputSearchComponet from "../InputSearchComponent/InputSearchComponet";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAPI } from "../../Api/UserAPI";
import { resetUser } from "../../Redux/counter/UserSlide";

export default function HeaderComponent({ isHiddenSearch, isHiddenCart }) {
  const inforUser = useSelector((state) => state.user);
  const orderProduct = useSelector((state) => state.orderProduct.orderItems);

  const [name, setName] = useState();
  const [avatar, setAvatar] = useState();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    setName(inforUser?.name);
    setAvatar(inforUser?.avatar);
  }, [inforUser?.name, inforUser?.avatar]);

  const handleChangeSignUp = () => {
    navigate("/sign-up");
  };
  const handleChangeSignIn = () => {
    navigate("/sign-in");
  };
  const HandleLogout = async () => {
    userAPI.logoutUser();
    dispatch(resetUser());
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/sign-up");
  };

  const handleProfile = () => {
    navigate("/update");
  };
  const handlePageAdmin = () => {
    navigate("/system/admin");
  };
  const handleMyOrder = () => {
    navigate("/my-order");
  };

  console.log("inforUser", inforUser);

  const content = (
    <div style={{ padding: "0px" }}>
      <WrapperOptionPopover onClick={HandleLogout}>
        Đăng xuất
      </WrapperOptionPopover>
      <WrapperOptionPopover onClick={handleProfile}>
        Thông tin cá nhân
      </WrapperOptionPopover>
      <WrapperOptionPopover onClick={handleMyOrder}>
        Đơn hàng của tôi
      </WrapperOptionPopover>
      {inforUser.isAdmin && (
        <WrapperOptionPopover onClick={handlePageAdmin}>
          Quản trị hệ thống
        </WrapperOptionPopover>
      )}
    </div>
  );
  const handleSearch = () => {};
  return (
    <WrapperHeaders>
      <Col span={5} style={{ display: "flex", flex: "start" }}>
        <TextHeaders>
          <ImageHeaders
            onClick={() => navigate("/")}
            src={Logo}
            alt="logo"></ImageHeaders>
        </TextHeaders>
        <MenuOutlined />
      </Col>
      <Col span={12}>
        {isHiddenSearch ? (
          <h2 style={{ color: "#fff", fontSize: "31px", margin: "0px" }}>
            Quản Trị Hệ Thống
          </h2>
        ) : (
          <InputSearchComponet onClick={handleSearch}></InputSearchComponet>
        )}
      </Col>
      <Col
        span={6}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: isHiddenSearch ? "flex-end" : "space-around",
        }}>
        <AccountHeadersWrapper>
          <Popover content={content} trigger="click">
            <div style={{ display: "flex", alignItems: "center" }}>
              {avatar?.length ? (
                <img
                  src={avatar}
                  alt={"avatar"}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}></img>
              ) : (
                <></>
              )}
              {name?.length > 0 && (
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "5px",
                  }}>
                  <span>{name}</span>
                </div>
              )}
            </div>
          </Popover>
          {!name && (
            <div style={{ marginRight: "48px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span
                  onClick={handleChangeSignIn}
                  style={{ cursor: "pointer" }}>
                  Đăng nhập
                </span>
                <div
                  style={{
                    margin: "0px 5px",
                    width: "1px",
                    height: "15px",
                    background: "#ccc",
                  }}></div>
                <span
                  onClick={handleChangeSignUp}
                  style={{ cursor: "pointer" }}>
                  Đăng ký
                </span>
              </div>
              <div>
                <span>Tài khoản</span>
                <ArrowDownOutlined />
              </div>
            </div>
          )}
        </AccountHeadersWrapper>
        {isHiddenCart ? (
          <></>
        ) : (
          <CartHeadersWrapper onClick={() => navigate("/order")}>
            <Badge count={orderProduct.length} size="small">
              <ShoppingCartOutlined
                style={{ fontSize: "25px", color: "white", marginRight: "5px" }}
              />
            </Badge>
            <span>Giỏ hàng</span>
          </CartHeadersWrapper>
        )}
      </Col>
    </WrapperHeaders>
  );
}
