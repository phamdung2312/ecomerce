import React from "react";
import { Wrapperspiner } from "./style";

export default function LoadingComponent({
  children,
  spinning,
  size = "small",
}) {
  return (
    <Wrapperspiner wrapperClassName="loading" size={size} spinning={spinning}>
      {children}
    </Wrapperspiner>
  );
}
