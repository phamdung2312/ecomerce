import { Button } from "antd";
import React from "react";

export default function ButtonComponent({
  type,
  icon,
  style,
  children,
  disabled,
  onClick,
  ...rest
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      type={type}
      icon={icon}
      style={style}
      rest={rest}>
      {children}
    </Button>
  );
}
