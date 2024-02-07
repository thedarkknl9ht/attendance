import { Popconfirm as _Popconfirm } from "antd";

const Popconfirm = ({ children, ...restProps }: any) => (
  <_Popconfirm {...restProps}>
    <div>{children}</div>
  </_Popconfirm>
);

export { Popconfirm };
