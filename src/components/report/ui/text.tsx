import { Typography } from "antd";

import { useReport } from "~/library/hooks";

import Item from "~/components/report/core/item";
import { getRowValue } from "~/library/utils";

const { Text: _Text } = Typography;

interface textProps {
  name: string | string[];
  label?: string;
  render?: Function;
  strong?: boolean;
  style?: React.CSSProperties;
}

const Text = (props: textProps) => {
  const { data } = useReport();

  return (
    <_Text strong={props.strong}>
      <Item name={props.name} type="text" style={props.style}>
        {getRowValue(data, props.name, props.render)}
      </Item>
    </_Text>
  );
};

export default Text;
