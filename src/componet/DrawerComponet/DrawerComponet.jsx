import { Drawer } from "antd";
import React, { useState } from "react";

export default function DrawerComponet({ children, title, open, ...rest }) {
  return (
    <>
      <Drawer title={title} open={open} {...rest}>
        {children}
      </Drawer>
    </>
  );
}
