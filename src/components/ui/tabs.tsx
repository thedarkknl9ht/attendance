import { Tabs as _Tabs, Typography } from "antd";
import i18n from "~/i18n";

const { Title } = Typography;

export const Tabs = (props: any) => (
  <_Tabs {...props} style={{ width: "100%" }} />
);

Tabs.Title = ({ text }: any) => (
  <Title level={4} style={{ margin: 0 }}>
    {i18n.t(text)}
  </Title>
);
