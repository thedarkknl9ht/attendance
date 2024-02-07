/**
 * * Buttons
 * ? Colors => primary - success - info - warning - danger
 * ? Types => border-o - border - border-rev-o -  border-rev - fill-vert-o - fill-vert - fill-horz-o - fill-horz
 */

import { Button as Control } from "antd";

interface props {
  type?: "default" | "primary" | "text" | "dashed" | "link";
  danger?: boolean;
  size?: "large" | "small";
  icon?: React.ReactNode;
  disabled?: boolean;
  block?: boolean;
  ghost?: boolean;
  onClick?: any;
  children?: React.ReactNode;
  style?: any;
  hidden?: boolean;
}

export const Link = (props: props) => (
  <Control
    type="link"
    onClick={props.onClick}
    icon={props.icon}
    hidden={props.hidden}
  >
    {props.children}
  </Control>
);

const Button = (props: props = { type: "primary", style: {} }) => (
  <Control
    type={props.type ?? "primary"}
    danger={props.danger}
    size={props.size}
    disabled={props.disabled}
    onClick={props.onClick}
    icon={props.icon}
    style={{ outline: "none", ...props.style }}
    hidden={props.hidden}
    ghost={props.ghost}
    block={props.block}
  >
    {props.children}
  </Control>
);

Button.Link = Link;

export { Button };
