import { Modal } from "antd";
import React from "react";

export default function ModalComponent({ title = "Modal", children, ...rest }) {
  return (
    <div>
      <Modal title={title} {...rest}>
        {children}
      </Modal>
    </div>
  );
}
