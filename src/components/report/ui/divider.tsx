import { Divider as Control, Typography } from "antd";

import Item from "../core/item";

import i18n from "~/i18n";

const { Text } = Typography;

interface dividerProps {
  name?:string,
  title?: string;
  type?: "secondary" | "success" | "warning" | "danger";
  orientation?: "left" | "right";
  orientationMargin?: number | string;
}

const Divider = (props: dividerProps) => (
  <Control
    orientation={props.orientation}
    orientationMargin={props.orientationMargin}
  >
    <Text  type={props.type}>
      <Item name={props.name} type="label">{props.title && i18n.t(props.title)}</Item>
    </Text>
  </Control>
);

export default Divider;
