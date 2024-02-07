import { Col } from "antd";

import { useConfig } from "~/library/hooks";

export const Group = ({ children, ...restProps }: any) => {
  const { config } = useConfig();

  return (
    <Col
      {...config.colLayout}
      style={{ maxWidth: 600, marginBottom: 10 }}
      {...restProps}
    >
      {children}
    </Col>
  );
};
