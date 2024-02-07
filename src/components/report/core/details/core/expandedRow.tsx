import React from "react";

import { Table, Space } from "antd";

import { Divider } from "~/library/components";

import { useReport, useViews } from "~/library/hooks";

import Item from "~/components/report/core/item";

import i18n from "~/i18n";

import Head from "./head";
import Cell from "./cell";

import { mergedColumns } from "../utils/merged";

interface expandedRowRenderProps {
  name: string;
  data: any[];
  keyField?: string;
  columns: any[];
  record: any;
  bordered?: boolean;
  labelStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  size?: "small" | "middle" | "large" | undefined;
}

const ExpandedRowRender = (props: expandedRowRenderProps) => {
  const { personalization } = useReport() || {};
  const { name, data, size, keyField, columns, record, labelStyle, textStyle } =
    props;

  const groupByColumns = columns.filter((e: any) => e.groupBy);

  const newColumns = columns.filter((e: any) => !e.groupBy);
  const newData = data.filter((item: any) => {
    for (let j = 0; j < groupByColumns.length; j++) {
      const dataIndex = groupByColumns[j].dataIndex;
      if (record[dataIndex] !== item[dataIndex]) return false;
    }
    return true;
  });

  const labelName = `${name},details,label`;
  const textName = `${name},details,text`;

  const { getItemOptions } = useViews() || {};

  const { style: headStyle }: any = getItemOptions(labelName);

  const { style: cellStyle }: any = getItemOptions(textName);

  return (
    <Table
      components={{
        header: {
          cell: (props: any) => (
            <Head
              {...props}
              style={{ ...labelStyle, ...headStyle }}
              name={`${name},details`}
            />
          ),
        },
        body: {
          cell: (props: any) => (
            <Cell
              {...props}
              style={{ ...textStyle, ...cellStyle }}
              name={`${name},details`}
            />
          ),
        },
      }}
      columns={mergedColumns(newColumns)}
      dataSource={newData}
      rowKey={keyField}
      pagination={false}
      size={size}
      bordered={props.bordered}
      footer={() =>
        personalization && (
          <div className="no-print">
            <Space split={<Divider type="vertical" />}>
              <Item name={labelName} type="label">
                {i18n.t("Label")}
              </Item>
              <Item name={textName} type="text">
                {i18n.t("Text")}
              </Item>
            </Space>
          </div>
        )
      }
    />
  );
};

export default ExpandedRowRender;
