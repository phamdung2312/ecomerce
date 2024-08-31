import React, { useState } from "react";
import {
  WrapperBody,
  WrapperButton,
  WrapperContainer,
  WrapperInput,
  WrapperLabeInput,
  WrapperNavigateLogIn,
  WrapperTextInput,
  WrapperTitile,
} from "./style";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userAPI } from "../../Api/UserAPI";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Image } from "antd";
import InputRegister from "../../componet/InputRegister/InputRegister";

export default function ResetPassword() {
  const [valueInputPassword, setvalueInputPassword] = useState();
  const [valueInputConfirmPassword, setvalueConfirmPassword] = useState();
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);

  const { id, token } = useParams();
  console.log("id", id);
  console.log("token", token);

  const { isError } = useQuery({
    queryKey: ["resetPassword"],
    queryFn: () => userAPI.resetPassword(id, token),
  });
  const resetPassword = useMutation({
    mutationFn: (data) => userAPI.updateOrder(id, data),
  });

  const navigate = useNavigate();

  const handleChange = () => {
    navigate("/sign-in");
  };

  const handleSubmit = () => {
    resetPassword.mutate(
      { valueInputPassword, valueInputConfirmPassword },
      {
        onSuccess: () => {
          toast.success("Cập nhật mật khẩu thành công", {
            position: "top-center",
            style: { fontSize: "16px" },
            autoClose: 2000,
          });
          setvalueInputPassword("");
          setvalueConfirmPassword("");
        },
        onError: (error) => {
          console.log("error", error);
          toast.error("error", {
            position: "top-center",
            style: { fontSize: "16px" },
            autoClose: 2000,
          });
        },
      }
    );
  };

  const handleReceiveStatePassword = (data, placeholder) => {
    if (placeholder === "confirm password") {
      setIsShowConfirmPassword(data);
    } else {
      setIsShowPassword(data);
    }
  };

  const handleValuePasswordChange = (data) => {
    setvalueInputPassword(data);
  };
  const handleValueConfirmPasswordChange = (data) => {
    setvalueConfirmPassword(data);
  };
  return (
    <WrapperContainer>
      {isError ? (
        <div>
          <Image src="https://img.freepik.com/premium-vector/window-operating-system-error-warning-dialog-window-popup-message-with-system-failure-flat-design_812892-54.jpg" />
          <h2 style={{ color: "red", fontSize: "25px" }}>
            Sory time is expired
          </h2>
        </div>
      ) : (
        <WrapperBody>
          <WrapperTitile>Change Password</WrapperTitile>
          <WrapperInput>
            <InputRegister
              value={valueInputPassword}
              onChange={handleValuePasswordChange}
              handlesendstatepassword={handleReceiveStatePassword}
              type={isShowPassword ? "password" : "text"}
              placeholder={"password"}></InputRegister>
          </WrapperInput>
          <WrapperInput>
            <InputRegister
              value={valueInputConfirmPassword}
              onChange={handleValueConfirmPasswordChange}
              handlesendstatepassword={handleReceiveStatePassword}
              type={isShowConfirmPassword ? "password" : "text"}
              placeholder={"confirm password"}></InputRegister>
          </WrapperInput>
          <WrapperButton
            onClick={handleSubmit}
            disabled={
              valueInputPassword?.length > 0 &&
              valueInputConfirmPassword?.length > 0
                ? false
                : true
            }>
            Submit
          </WrapperButton>
          <WrapperNavigateLogIn onClick={handleChange}>
            SignIn
          </WrapperNavigateLogIn>
        </WrapperBody>
      )}
    </WrapperContainer>
  );
}
