/**
 * * Table
 * ? Sort - Search - Filter - Pagination - RowSelection - Views - Edit
 */
import styled from "styled-components";

import { Table as Control, Pagination, Form, Typography } from "antd";

import { array } from "~/library/utils";

import { DragProvider } from "~/library/services";

import { useMessage, useToggle, useViews } from "~/library/hooks";

import { EditableCell } from "./editableCell";

import { mergedColumns } from "./utils/merged";

import { Extra } from "./core/extra";

import { Search } from "./core/search";

import { pagination, changeParams, sorter, filter } from "~/library/interfaces";

import {
  Button,  
  Divider,
  ICheck,
  ICustomization,
  IFilter,
  Space,
} from "../../library/components";

import i18n from "~/i18n";

import { QueryBuilder } from "./queryBuilder";

import { ColumnsCustomization } from "./core/columns";

const TableContainer = styled.div({
  paddingBottom: 0,
});

interface props {
  dataSource?: string | any[];
  data: any[];
  columns: any[];
  keyField: string;
  form: any;
  pagination?: pagination;
  sorter: sorter;
  search?: string;
  rowSelection: any;
  loading?: boolean;
  extra?: any[];
  hasChanges?: boolean;
  editingKey?: string | number | null;
  filter?: Function;
  allowEdit?: boolean;
  allowSearch?: boolean;
  allowSort?: boolean;
  allowFilter?: boolean;
  allowCustomization?: boolean;
  filters?: filter[];
  handleChange?: any;
  handleRowClick?: any;
  handleColumnChange?: any;
  handleColumnPosChange?: any;
  handleCellValueChange?: any;
  handleFilter?: any;
}

export const Table = (props: props) => {
  const {
    data,
    columns,
    keyField,
    form,
    pagination,
    sorter,
    search,
    rowSelection,
    loading,
    extra,
    hasChanges,
    editingKey,
    allowEdit,
    allowSearch,
    allowSort,
    filters,
    handleChange,
    handleRowClick,
    handleColumnChange,
    handleColumnPosChange,
    handleCellValueChange,
    handleFilter,
  } = props;

  const toggleFilter = useToggle();

  const toggleCustomization = useToggle();

  const view = useViews();

  const message = useMessage();

  const onChange = (params: changeParams) => {
    let { pagination, sorter, search } = params;
    if (sorter !== undefined)
      sorter = { ...sorter, field: sorter.field?.toString().replace(",", ".") };
    if (handleChange)
      if (hasChanges)
        message.confirm("Unsaved Changes", () =>
          handleChange({ pagination, sorter, search })
        );
      else handleChange({ pagination, sorter, search });
  };

  const columnsProps: any = {
    columns,
    keyField,
    editingKey,
    sorter,
    allowEdit,
    allowSort,
    handleCellValueChange,
    handleColumnChange,
    handleColumnPosChange,
  };
  const viewColumns = mergedColumns(columnsProps);

  const width = array.sum(viewColumns, "width", "100%", (e: any) => !e.hidden);

  return (
    <DragProvider>
      <TableContainer>
        <Extra items={extra} />
        {allowSearch && <Search search={search} onSearch={onChange} />}
        <Form form={form} component={false}>
          <SelectedRows rowSelection={rowSelection} />
          <Control
            components={{ body: { cell: EditableCell } }}
            dataSource={data}
            columns={viewColumns}
            rowKey={keyField}
            rowSelection={rowSelection}
            scroll={{ x: width, y: 300 }}
            style={{ width: width + 100 + "px" }}
            loading={loading}
            pagination={false}
            size="small"
            onChange={(_1: any, _2: any, sorter: any) => onChange({ sorter })}
            showSorterTooltip={false}
            onRow={(record) => {
              return {
                onClick: (e) =>
                  handleRowClick ? handleRowClick(record, e) : undefined,
              };
            }}
          />
          {props.allowFilter && (
            <QueryBuilder
              columns={columns}
              dataSource={filters ?? []}
              toggle={toggleFilter}
              handleFilter={handleFilter}
            />
          )}
          {props.allowCustomization && (
            <ColumnsCustomization
              dataSource={columns}
              toggle={toggleCustomization}
              handleChange={handleColumnChange}
            />
          )}
        </Form>
        <Space size={0} style={{ padding: 10 }} split={<Divider type="vertical" />}>
          {data.length > 0 && !pagination?.hidden && (
            <Pagination
              pageSize={pagination?.pageSize}
              current={pagination?.pageNo}
              total={pagination?.count}
              showTotal={(total) => (
                <span style={{ fontSize: 12 }}>{`Total ${total} items`}</span>
              )}
              onChange={(pageNo, pageSize) =>
                onChange({ pagination: { pageNo, pageSize } })
              }
              showSizeChanger
              size="small"
            />
          )}
          {props.allowFilter && (
            <Button
              icon={<IFilter />}
              type={filters && filters.length > 0 ? "primary" : "dashed"}
              size="small"
              onClick={toggleFilter.show}
            >
              {i18n.t("Filter")}
            </Button>
          )}
          {props.allowCustomization && (
            <Button
              icon={<ICustomization />}
              type="text"
              size="small"
              onClick={toggleCustomization.show}
            >
              {i18n.t("Customization")}
            </Button>
          )}
          {view?.hasChanges && view?.singleView && (
            <Button
              type="primary"
              size="small"
              icon={<ICheck />}
              onClick={view?.handleSubmit}
            >
              {i18n.t("Save Layout")}
            </Button>
          )}
        </Space>
      </TableContainer>
    </DragProvider>
  );
};

const { Text } = Typography;

const SelectedRows = ({ rowSelection }: { rowSelection: any }) =>
  rowSelection?.selectedRowKeys?.length > 1 && (
    <Text>{`${rowSelection?.selectedRowKeys?.length} Rows Selected`}</Text>
  );
