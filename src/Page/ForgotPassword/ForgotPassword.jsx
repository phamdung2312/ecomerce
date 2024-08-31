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
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { userAPI } from "../../Api/UserAPI";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [valueInput, setvalueInput] = useState();
  const forgotPassword = useMutation({
    mutationFn: (data) => userAPI.forgotPassword(data),
  });

  const navigate = useNavigate();

  const handleChangevalue = (e) => {
    setvalueInput(e.target.value);
  };

  const handleChange = () => {
    navigate("/sign-in");
  };

  const handleSubmit = () => {
    forgotPassword.mutate(valueInput, {
      onSuccess: () => {
        toast.success("Email đúng, vui lòng kiểm tra email để tiếp tục!", {
          position: "top-center",
          style: { fontSize: "16px" },
          autoClose: 2000,
        });
        setvalueInput();
      },
      onError: (error) => {
        console.log("error", error);
        toast.error("error", {
          position: "top-center",
          style: { fontSize: "16px" },
          autoClose: 2000,
        });
      },
    });
  };
  console.log("valueInput", valueInput?.length);
  return (
    <WrapperContainer>
      <WrapperBody>
        <WrapperTitile>Forgot Password</WrapperTitile>
        <WrapperInput>
          <WrapperLabeInput htmlFor="username">Email Address</WrapperLabeInput>
          <WrapperTextInput
            value={valueInput}
            onChange={handleChangevalue}
            id="username"></WrapperTextInput>
        </WrapperInput>
        <WrapperButton
          onClick={handleSubmit}
          disabled={valueInput?.length > 0 ? false : true}>
          Submit
        </WrapperButton>
        <WrapperNavigateLogIn onClick={handleChange}>
          SignIn
        </WrapperNavigateLogIn>
      </WrapperBody>
    </WrapperContainer>
  );
}
