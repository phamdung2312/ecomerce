import React from "react";
import HeaderPaymentComponent from "../HeaderPaymentComponent/HeaderPaymentComponent";

export default function LayoutPayment({ children }) {
  return (
    <div>
      <HeaderPaymentComponent></HeaderPaymentComponent>
      {children}
    </div>
  );
}
