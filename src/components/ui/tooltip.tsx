import { Tooltip as Control } from "antd";

const Tooltip = (props: any) => (
  <Control {...props} mouseEnterDelay={1}>
    <div>{props.children}</div>
  </Control>
);

export { Tooltip };
