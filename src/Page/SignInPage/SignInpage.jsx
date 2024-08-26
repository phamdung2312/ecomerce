import React, { useState } from "react";
import { toast } from "react-toastify";
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
import { Image } from "antd";
import Register from "../../asset/ImagRegister/Register.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { userAPI } from "../../Api/UserAPI";
import LoadingComponent from "../../componet/LoadingComponent/LoadingComponent";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../Redux/counter/UserSlide";

export default function SignInpage() {
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [valueConformPassword, setValueConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const handleReceiveStatePassword = (data, placeholder) => {
    if (placeholder === "confirm password") {
      setIsShowConfirmPassword(data);
    } else {
      setIsShowPassword(data);
    }
  };

  // redux
  const dispatch = useDispatch();
  // register
  const loginMutation = useMutation({
    mutationFn: (body) => userAPI.loginUser(body),
  });
  const { data: dataUser, isPending } = loginMutation;
  const handleClickChangeURL = () => {
    navigate("/sign-up");
  };

  const handleValueEmailChange = (data) => {
    setValueEmail(data);
  };
  const handleValuePasswordChange = (data) => {
    setValuePassword(data);
  };
  const handleValueConfirmPasswordChange = (data) => {
    setValueConfirmPassword(data);
  };
  const handleSubmit = () => {
    loginMutation.mutate(
      {
        email: valueEmail,
        password: valuePassword,
        confirmPassword: valueConformPassword,
      },
      {
        onSuccess: async (data) => {
          console.log("data", data);
          if (data.data.message === "SUCCESS") {
            localStorage.setItem(
              "access_token",
              JSON.stringify(data.data.access_token)
            );
            localStorage.setItem(
              "refresh_token",
              JSON.stringify(data.data.refresh_token)
            );
            const decoded = jwtDecode(data.data.access_token);
            if (decoded.id) {
              await handleGetUserDetail(
                decoded.id,
                data.data.access_token,
                data.data.refresh_token
              );
            }
            toast.success("login user success", {
              position: "top-center",
              style: { fontSize: "16px" },
              autoClose: 2000,
            });
            if (location.state) {
              navigate(location.state.pathname);
            } else {
              navigate("/");
            }
          }
        },
      }
    );
  };
  const handleGetUserDetail = async (id, access_token) => {
    const res = await userAPI.getUserDetail(id, access_token);
    dispatch(updateUser({ ...res?.data }));
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
            <InputRegister
              onChange={handleValueConfirmPasswordChange}
              handlesendstatepassword={handleReceiveStatePassword}
              type={isShowConfirmPassword ? "password" : "text"}
              placeholder={"confirm password"}></InputRegister>
            {dataUser?.data.status === "ERR" ? (
              <div
                style={{
                  textAlign: "left",
                  width: "100%",
                  fontSize: "12px",
                  color: "red",
                }}>
                <span>{dataUser.data.message}</span>
              </div>
            ) : (
              <></>
            )}
          </WarpperRegisterInput>
          <LoadingComponent spinning={isPending}>
            <ButtonComponent
              onClick={handleSubmit}
              disabled={
                valueEmail.length > 0 &&
                valuePassword.length > 0 &&
                valueConformPassword.length > 0
                  ? false
                  : true
              }
              style={{
                width: "100%",
                backgroundColor:
                  valueEmail.length > 0 &&
                  valuePassword.length > 0 &&
                  valueConformPassword.length > 0
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
            <p className="Passwod" style={{ cursor: "pointer" }}>
              Quên mật khẩu?
            </p>
            <span>
              Bạn có tài khoản?
              <p
                className="directSignUp"
                style={{ cursor: "pointer" }}
                onClick={handleClickChangeURL}>
                Tạo tài khoản
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
            <h4 className="headingContent" style={{ color: "red" }}>
              Mua sắm tại TiKi
            </h4>
            <span>Siểu ưu đãi mỗi ngày</span>
          </WrapperRegisterContent>
        </WarpperRegistereRight>
      </div>
    </div>
  );
}
