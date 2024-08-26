import React, { useState } from "react";
import { WarpperRegisterInput } from "./style";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

export default function InputRegister({
  placeholder,
  children,
  style,
  icon,
  width,
  type,
  handlesendstatepassword,
  onChange,
  ...rest
}) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isConfirmShowPassword, setIsConfirmShowPassword] = useState(false);
  const togglePassword = () => {
    if (placeholder === "confirm password") {
      setIsConfirmShowPassword(!isConfirmShowPassword);
      handlesendstatepassword(isConfirmShowPassword, placeholder);
    } else {
      handlesendstatepassword(isShowPassword, placeholder);
      setIsShowPassword(!isShowPassword);
    }
  };
  const handleChangeValue = (e) => {
    onChange(e.target.value);
  };
  return (
    <div style={{ position: "relative", width: width }}>
      <WarpperRegisterInput
        onChange={handleChangeValue}
        style={style}
        placeholder={placeholder}
        {...rest}
        type={type}
      />
      {type !== "text" ||
      placeholder === "password" ||
      placeholder === "confirm password" ? (
        isShowPassword || isConfirmShowPassword ? (
          <EyeOutlined
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "11px",
              right: "13px",
              fontSize: "14px",
              color: "#999696",
            }}
            onClick={togglePassword}
          />
        ) : (
          <EyeInvisibleOutlined
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "11px",
              right: "13px",
              fontSize: "14px",
              color: "#999696",
            }}
            onClick={togglePassword}
          />
        )
      ) : (
        <></>
      )}
    </div>
  );
}
