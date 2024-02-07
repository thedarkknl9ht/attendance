/**
 * * Details
 * ? Table With Group By
 */
import { Table, Space } from "antd";

import { Divider, Button } from "~/library/components";

import Item from "../item";

import { useReport, useToggle, useViews } from "~/library/hooks";

import getData from "./utils/getData";

import i18n from "~/i18n";

import Head from "./core/head";
import Cell from "./core/cell";

import ExpandedRowRender from "./core/expandedRow";

import { mergedColumns } from "./utils/merged";

import { array } from "~/library/utils";

import Personalize from "./personalize";
import React from "react";

interface detailsProps {
  name: string;
  dataSource: string | any[];
  columns: any[];
  keyField?: string;
  filter?: Function;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  bordered?: boolean;
  size?: "small" | "middle" | "large" | undefined;
  footer?: any;
  hideIfEmpty?: boolean;
  children?: React.ReactNode;
}

const Details = (props: detailsProps) => {
  const { name, dataSource, keyField, filter, labelStyle, textStyle } = props;

  const toggle = useToggle();

  const labelName = `${name},label`;
  const textName = `${name},text`;

  const { getItemOptions } = useViews();

  const { bordered, size, columns }: any = getItemOptions(props.name);

  const customColumns = array.merge(props.columns, columns, "dataIndex", "key");

  const { style: headStyle }: any = getItemOptions(labelName);

  const { style: cellStyle }: any = getItemOptions(textName);

  const { personalization } = useReport() || {};

  const data = Array.isArray(dataSource)
    ? dataSource
    : useReport().data[dataSource];

  const filteredData = filter ? data?.filter(filter) : data;

  const groupByColumns = customColumns.filter((e) => e.groupBy);

  const isGrouped = groupByColumns.length > 0;

  const allColumns: any[] =
    groupByColumns.length === 0 ? customColumns : groupByColumns;

  const currentSize = size ?? props.size ?? "small";
  const currentBordered = bordered ?? props.bordered ?? false;

  if (props.hideIfEmpty && !filteredData?.length) return null;

  return (
    <div className="report-details">
      <Table
        components={{
          header: {
            cell: (props: any) => (
              <Head
                {...props}
                style={{ ...labelStyle, ...headStyle }}
                name={name}
              />
            ),
          },
          body: {
            cell: (props: any) => (
              <Cell
                {...props}
                style={{ ...textStyle, ...cellStyle }}
                name={name}
              />
            ),
          },
        }}
        columns={mergedColumns(allColumns)}
        dataSource={getData(filteredData, customColumns)}
        bordered={currentBordered}
        expandable={
          isGrouped
            ? {
                expandedRowRender: (record) => (
                  <ExpandedRowRender
                    name={name}
                    record={record}
                    columns={customColumns}
                    data={filteredData}
                    bordered={bordered}
                    keyField={keyField}
                    size={size ?? props.size}
                    labelStyle={{ ...labelStyle, ...headStyle }}
                    textStyle={{ ...textStyle, ...cellStyle }}
                  />
                ),
                defaultExpandAllRows: true,
                showExpandColumn: false,
              }
            : undefined
        }
        pagination={false}
        rowKey={keyField}
        size={currentSize}
        footer={props.footer}
      />
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
          <Personalize
            name={props.name}
            columns={customColumns}
            initialValues={{
              bordered: currentBordered,
              size: currentSize,
              columns: customColumns,
            }}
            toggle={toggle}
          />
        </div>
      )}
      {props.children}
    </div>
  );
};

export default Details;
