import React from "react";

import { Space, Descriptions as _Descriptions } from "antd";

import { Button, Divider } from "~/library/components";

import { useReport, useToggle, useViews } from "~/library/hooks";

import { array, getRowValue } from "~/library/utils";

import i18n from "~/i18n";

import Item from "~/components/report/core/item";

import DescriptionCustomization from "./custom";

interface descriptionsProps {
  name: string;
  title?: string | React.ReactNode;
  items: any[];
  bordered?: boolean;
  columns?: number;
  layout?: "vertical" | "horizontal";
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  size?: "default" | "middle" | "small";
}

const Descriptions = (props: descriptionsProps) => {
  const { data, personalization } = useReport();

  const { getItemOptions } = useViews() || {};

  const toggle = useToggle();

  const labelName = `${props.name},label`;
  const textName = `${props.name},text`;

  const { bordered, layout, colon, columns, style, items }: any =
    getItemOptions(props.name);

  const mergedItems = array.merge(props.items, items, "dataIndex", "key");

  const { style: labelSyle }: any = getItemOptions(labelName);

  const { style: textStyle }: any = getItemOptions(textName);

  const buildItems = () => {
    const newItems: any[] = [];
    mergedItems
      .filter((e) => e.visible !== false)
      .forEach((item, index) =>
        newItems.push({
          key: index,
          label: (
            <Item name={[item.dataIndex, "label"]} type="label">
              {item.label ?? i18n.t(item.dataIndex)}
            </Item>
          ),
          children: (
            <Item name={[item.dataIndex, "text"]} type="text">
              {getRowValue(data, item.dataIndex, item.render)}
            </Item>
          ),
        })
      );
    return newItems;
  };

  return (
    <React.Fragment>
      <div style={{ width: "100%" }}>
        <_Descriptions
          title={props.title}
          items={buildItems()}
          column={columns ?? props.columns}
          size={props.size}
          bordered={bordered ?? props.bordered}
          layout={layout ?? props.layout}
          colon={colon}
          style={{ ...props.style, ...style }}
          labelStyle={{ ...props.labelStyle, ...labelSyle }}
          contentStyle={{ ...props.textStyle, ...textStyle }}
        />
      </div>
      {personalization && (
        <div className="no-print">
          <Space split={<Divider type="vertical" />}>
            <Button.Link onClick={toggle.show}>
              {i18n.t("Customization")}
            </Button.Link>
            <Item name={labelName} type="label">
              {i18n.t("Label")}
            </Item>
            <Item name={textName} type="text">
              {i18n.t("Text")}
            </Item>
          </Space>
          <DescriptionCustomization
            name={props.name}
            items={mergedItems}
            initialValues={{
              bordered,
              layout,
              colon,
              columns,
            }}
            toggle={toggle}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default Descriptions;
