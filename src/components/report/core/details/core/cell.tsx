import { useViews } from "~/library/hooks";

import Item from "~/components/report/core/item";

const Cell = ({ name, dataIndex, style, ...restProps }: any) => {
  const cellName = [name, dataIndex?.toString(), "text"];

  const { getItemOptions } = useViews() || {};

  const { style: cellStyle }: any = getItemOptions(cellName);

  return (
    <td {...restProps} style={{ ...style, ...cellStyle }}>
      {typeof restProps.children[1] === "string" ? (
        <Item name={cellName} type="text">
          {restProps.children[1]}
        </Item>
      ) : (
        restProps.children[1]
      )}
    </td>
  );
};

export default Cell;
