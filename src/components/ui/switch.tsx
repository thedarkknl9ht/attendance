import { Switch as Control } from "antd";

import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const Switch = (props: any) => (
  <Control
    {...props}
    style={{ opacity: props.readOnly ? ".7" : null }}
    checkedChildren={<CheckOutlined />}
    unCheckedChildren={<CloseOutlined />}
    defaultChecked
  />
);

export { Switch };
