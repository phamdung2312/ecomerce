import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import HeaderComponent from "../../../componet/HeaderComponent/HeaderComponent";
import UserAdmin from "../UserAdmin/UserAdmin";
import ProductAdmin from "../ProductAdmin/ProductAdmin";
import { WrapperContainer } from "./style";
import OrderAdmin from "../OrderAdmin/OrderAdmin";

export default function AdminPage() {
  const [selectKey, setSlectKey] = useState("");

  const navigateRoute = (type) => {
    switch (type) {
      case "user":
        return <UserAdmin></UserAdmin>;
      case "product":
        return <ProductAdmin></ProductAdmin>;
      case "order":
        return <OrderAdmin></OrderAdmin>;
      default:
        return <></>;
    }
  };
  const items = [
    {
      key: "user",
      label: "User",
      icon: <UserOutlined />,
    },
    {
      key: "product",
      label: "Product",
      icon: <AppstoreOutlined />,
    },
    {
      key: "order",
      label: "Order",
      icon: <ShoppingCartOutlined />,
    },
  ];

  const onClick = (e) => {
    setSlectKey(e.key);
  };
  return (
    <>
      <HeaderComponent
        isHiddenSearch={true}
        isHiddenCart={true}></HeaderComponent>
      <div style={{ display: "flex" }}>
        <Menu
          onClick={onClick}
          style={{
            width: 256,
            height: "100vh",
            boxShadow: "5px 0px 5px #ccc",
            marginRight: "10px",
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
        <WrapperContainer>{navigateRoute(selectKey)}</WrapperContainer>
      </div>
    </>
  );
}
