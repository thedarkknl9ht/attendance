import { useViews } from "~/library/hooks";

import Item from "~/components/report/core/item";

import i18n from "~/i18n";

const Head = ({ name, dataIndex, title, style, ...restProps }: any) => {
  const headName = [name, dataIndex?.toString(), "label"];

  const { getItemOptions } = useViews() || {};

  const { style: headStyle }: any = getItemOptions(headName);

  return (
    <th {...restProps} style={{ ...style, headStyle }}>
      <Item name={headName} type="label">
        {title ?? i18n.t(i18n.t(dataIndex))}
      </Item>
    </th>
  );
};

export default Head;
