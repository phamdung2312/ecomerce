import { Image } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  WrapperContainer,
  WrapperContext,
  WrapperContextLeft,
  WrapperContextRight,
  WrapperText,
} from "./style";

export default function HeaderPaymentComponent({ title }) {
  const navigate = useNavigate();
  return (
    <WrapperContainer>
      <WrapperContext>
        <WrapperContextLeft>
          <Image
            onClick={() => navigate("/")}
            style={{
              cursor: "pointer",
              height: "63px",
              width: "74px",
              objectFit: "cover",
            }}
            preview={false}
            src="https://salt.tikicdn.com/ts/upload/c1/64/f7/4e6e925ea554fc698123ea71ed7bda26.png"></Image>
          <div
            style={{
              margin: "0 16px",
              height: "32px",
              width: "1px",
              backgroundColor: "rgb(26, 148, 255)",
            }}></div>
          <WrapperText>{title}</WrapperText>
        </WrapperContextLeft>
        <WrapperContextRight
          href={"https://www.facebook.com/profile.php?id=100022052654122"}>
          <Image
            preview={false}
            style={{
              cursor: "pointer",
              width: "185px",
              height: "56px",
            }}
            src="https://salt.tikicdn.com/ts/upload/ae/b1/ea/65e64a529e4ff888c875129d3b11ff29.png"></Image>
        </WrapperContextRight>
      </WrapperContext>
    </WrapperContainer>
  );
}
