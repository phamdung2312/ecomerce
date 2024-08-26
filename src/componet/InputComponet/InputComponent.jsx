import { Input } from "antd";
import React from "react";

export default function InputComponent({ style, placeholder, ...rest }) {
  return <Input placeholder={placeholder} style={style} {...rest}></Input>;
}
