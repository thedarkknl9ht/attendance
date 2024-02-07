import { Dropdown as Control } from "antd";

import { CSSProperties } from "react";

interface DropdownProps {
  menu?: any;
  trigger?: ("click" | "hover" | "contextMenu")[];
  arrow?: boolean;
  style?: CSSProperties;
  dropdownRender?: (originNode: React.ReactNode) => React.ReactNode;
  children?: React.ReactNode;
}

export const Dropdown = (props: DropdownProps = { trigger: ["click"] }) => (
  <Control
    menu={props.menu}
    trigger={props.trigger}
    arrow={props.arrow}
    dropdownRender={props.dropdownRender}
  >
    <div style={props.style}>{props.children}</div>
  </Control>
);
