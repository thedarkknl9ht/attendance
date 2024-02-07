import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { Select as Control, Space, theme } from "antd";

import { Button, Divider, IAdd, IEdit } from "../../library/components";

import { inputSources } from "~/library/models";

import { getRowValue } from "~/utils/helpers";

import { useAxiosPrivate } from "~/hooks/useAxiosPrivate";

import i18n from "~/i18n";

const { useToken } = theme;

const Select = (props: any) => {
  const axios = useAxiosPrivate();

  const {
    id,
    onSelect,
    onChange,
    allowTextField,
    allowSearch,
    allowClear,
    dataSource,
    filter,
    value,
    ...restProps
  } = props;
  const inputSource = inputSources[dataSource];
  const columns = inputSource?.columns?.filter((e: any) => e.dropdown);
  const valueField = inputSource?.valueField;
  const textField = inputSource?.textField;

  const [search, setSearch] = useState(value);
  ////______________________________________________________________
  const { data: records, isFetching: loading } = useQuery({
    queryKey: ["SELECT", id, value, filter, search],
    queryFn: (key) => fetchData(key),
    initialData: [],
    refetchOnWindowFocus: false,
  });

  const fetchData = async ({ queryKey }: any) => {
    if (queryKey)
      return axios
        .post(inputSource.dataSource, {
          form: { search, pageSize: 10, filter },
        })
        .then((response) => {
          const options = [];
          if (response.data.records.length > 0) {
            let element = {};
            columns.map(
              (column: any) =>
                (element = {
                  ...element,
                  [column.dataIndex]: column.title ?? i18n.t(column.dataIndex),
                })
            );
            options.push({ value: undefined, disabled: true, element });
          }

          response.data.records.forEach((element: any) => {
            options.push({
              element,
              value: element[valueField],
              label:
                allowTextField !== false ? (
                  <Space split="-">
                    {textField.map((item: string) => (
                      <div key={item}>{element[item]}</div>
                    ))}
                  </Space>
                ) : (
                  element[valueField]
                ),
            });
          });
          return options;
        });

    return [];
  };
  ////______________________________________________________________
  const { token } = useToken();

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: "none",
    maxHeight: "200px",
    overflow: "auto",
  };

  ////______________________________________________________________
  return (
    <Control
      id={id}
      options={records}
      dropdownStyle={{ paddingInlineEnd: 0, width: columns.length * 120 }}
      optionRender={(option) => <DataRow row={option.data} columns={columns} />}
      dropdownRender={(menu: any) => (
        <div style={contentStyle}>
          {React.cloneElement(menu, { style: menuStyle })}
          {inputSource?.link && (
            <React.Fragment>
              <Divider style={{ margin: 0 }} />
              <Space
                style={{ padding: "2px" }}
                size={1}
                split={<Divider type="vertical" style={{ margin: 0 }} />}
              >
                <Button
                  type="text"
                  size="small"
                  icon={<IAdd />}
                  onClick={() => window.open(inputSource?.link + "?k=")}
                >
                  {i18n.t("Add New")}
                </Button>
                {value && (
                  <Button
                    type="text"
                    size="small"
                    icon={<IEdit />}
                    onClick={() =>
                      window.open(inputSource?.link + "?k=" + value)
                    }
                  >
                    {i18n.t("Edit Selected")}
                  </Button>
                )}
              </Space>
            </React.Fragment>
          )}
        </div>
      )}
      popupClassName="dropdown-table"
      value={value}
      virtual={false}
      loading={loading}
      allowClear={allowClear ?? !props["aria-required"]}
      showSearch={allowSearch !== false}
      filterOption={() => true}
      onSelect={onSelect}
      onChange={onChange}
      onSearch={allowSearch !== false && setSearch}
      {...restProps}
    >
      {props.children}
    </Control>
  );
};

const DataRow = ({ row, columns }: { row: any; columns: any[] }) => (
  <React.Fragment>
    {columns.map((column, index) => (
      <div
        key={index}
        className="table-cell"
        data-header={row.value === undefined}
      >
        {getRowValue(row.element, column.dataIndex, column.render)}
      </div>
    ))}
  </React.Fragment>
);

export { Select };
