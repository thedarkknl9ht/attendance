import { Drawer as Control } from "antd";
import React from "react";

import i18n from "~/i18n";

interface props {
  title?: string;
  placement?: "left" | "right" | "top" | "bottom";
  extra?: React.ReactNode;
  width?: string | number;
  size?: any;
  closable?: boolean;
  maskClosable?: boolean;
  children: React.ReactNode;
  open?: boolean;
  toggle: any;
  afterOpenChange?: (open: boolean) => void;
}

export const Drawer = (props: props) => {
  const { toggle, open, title, placement, extra, width, size, children } =
    props;

  return (
    <Control
      title={i18n.t(title ?? "")}
      placement={placement ?? "left"}
      onClose={toggle.close}
      closable={props.closable}
      width={width}
      open={toggle.open || open}
      maskClosable={props.maskClosable ?? false}
      size={size}
      extra={extra}
      afterOpenChange={props.afterOpenChange}
    >
      {children}
    </Control>
  );
};
