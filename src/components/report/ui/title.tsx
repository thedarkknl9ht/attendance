import { Typography } from "antd";

import Item from "~/components/report/core/item";

import i18n from "~/i18n";

const { Text } = Typography;

interface headerProps {
  name?: string;
  title: string;
  subTitle?: string;
  allowDivider?: boolean;
  titleStyle?: React.CSSProperties;
  subTitleStyle?: React.CSSProperties;
}

const Title = (props: headerProps) => (
  <div className="report-header" style={{ width: "100%" }}>
    <div className="report-title">
      <Item
        name={[props.name ?? "header", "title"]}
        type="label"
        style={props.titleStyle}
      >
        {i18n.t(props.title)}
      </Item>
    </div>
    {props.subTitle && (
      <Text type="secondary" style={props.subTitleStyle}>
        <Item name={[props.name ?? "header", "subTitle"]} type="label">
          {i18n.t(props.subTitle ?? "")}
        </Item>
      </Text>
    )}
  </div>
);

export default Title;
