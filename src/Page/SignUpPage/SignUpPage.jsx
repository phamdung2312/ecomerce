import React, { useState } from "react";
import {
  WarpperRegistereHeading,
  WarpperRegistereLeft,
  WarpperRegistereRight,
  WarpperRegisterInput,
  WrapperRegisterContent,
  WrapperRegisterDirect,
} from "./style";
import InputRegister from "../../componet/InputRegister/InputRegister";
import ButtonComponent from "../../componet/ButtonComponet/ButtonComponent";
import Register from "../../asset/ImagRegister/Register.png";
import { Image } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { userAPI } from "../../Api/UserAPI";
import LoadingComponent from "../../componet/LoadingComponent/LoadingComponent";
import { toast } from "react-toastify";
export default function SignUpPage() {
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const navigate = useNavigate();
  const handleReceiveStatePassword = (data) => {
    setIsShowPassword(data);
  };
  const handleClickChangeURL = () => {
    navigate("/sign-in");
  };
  const handleValueEmailChange = (data) => {
    setValueEmail(data);
  };
  const handleValuePasswordChange = (data) => {
    setValuePassword(data);
  };
  const registerMutation = useMutation({
    mutationFn: (body) => {
      return userAPI.registerUser(body);
    },
  });
  const { data, isPending } = registerMutation;

  const handleSubmit = () => {
    registerMutation.mutate(
      {
        email: valueEmail,
        password: valuePassword,
      },
      {
        onSuccess: (data) => {
          if (data.data.message === "SUCCESS") {
            toast.success("create user success", {
              position: "top-center",
              style: { fontSize: "16px" },
              autoClose: 2000,
            });
          }
        },
      }
    );
  };
  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.53)",
        position: "fixed",
        inset: "0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div
        style={{
          width: "800px",
          height: "530px",
          backgroundColor: "#fff",
          borderRadius: "15px",
          display: "flex",
        }}>
        <WarpperRegistereLeft>
          <WarpperRegistereHeading>
            <h4 className="headingTitle">Xin Chào,</h4>
            <span className="decription">Đăng nhập hoặc Tạo tài khoản</span>
          </WarpperRegistereHeading>
          <WarpperRegisterInput>
            <InputRegister
              onChange={handleValueEmailChange}
              type="text"
              placeholder={"abc@gmail.com"}></InputRegister>
            <InputRegister
              onChange={handleValuePasswordChange}
              handlesendstatepassword={handleReceiveStatePassword}
              type={isShowPassword ? "password" : "text"}
              placeholder={"password"}></InputRegister>
            {data?.data.status === "ERR" ? (
              <div
                style={{
                  textAlign: "left",
                  width: "100%",
                  fontSize: "12px",
                  color: "red",
                }}>
                <span>{data.data.message}</span>
              </div>
            ) : (
              <></>
            )}
          </WarpperRegisterInput>
          <LoadingComponent spinning={isPending}>
            <ButtonComponent
              onClick={handleSubmit}
              disabled={
                valueEmail.length > 0 && valuePassword.length > 0 ? false : true
              }
              style={{
                width: "100%",
                backgroundColor:
                  valueEmail.length > 0 && valuePassword.length > 0
                    ? "red"
                    : "#d0d5dd",
                color: "white",
                fontWeight: "400",
                fontSize: "16px",
                height: "40px",
                marginRight: "10px",
              }}>
              Đăng nhập
            </ButtonComponent>
          </LoadingComponent>

          <WrapperRegisterDirect>
            <span>
              Bạn có tài khoản?
              <p
                className="directSignUp"
                style={{ cursor: "pointer" }}
                onClick={handleClickChangeURL}>
                Đăng nhập
              </p>
            </span>
          </WrapperRegisterDirect>
        </WarpperRegistereLeft>
        <WarpperRegistereRight>
          <Image
            style={{ width: "203px", height: "203px" }}
            preview={false}
            src={Register}
            alt="Register"></Image>
          <WrapperRegisterContent>
            <h4 className="headingContent">Mua sắm tại TiKi</h4>
            <span>Siểu ưu đãi mỗi ngày</span>
          </WrapperRegisterContent>
        </WarpperRegistereRight>
      </div>
    </div>
  );
}
