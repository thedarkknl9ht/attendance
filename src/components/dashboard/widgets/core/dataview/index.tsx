import React from "react";

import { useNavigate } from "react-router-dom";

import { Table, Empty, Button, IAdd } from "~/library/components";

import { useTable } from "~/library/hooks";

import { loadColumns } from "~/library/utils";

import { privileges } from "~/project/data/privileges";

import DataOptions from "./data";

import i18n from "~/i18n";

interface dataViewProps {
  uerID: string;
  dashboardID: string;
  widgetID: string;
  widgetType: string;
  dataOptions?: string;
  toggle: any;
}

const DataView = (props: dataViewProps) => {
  const navigate = useNavigate();

  const options = !props.dataOptions ? {} : JSON.parse(props.dataOptions);

  const item: any = privileges.find(
    (e: any) => e.dataView?.name === options.name
  );

  const { name, dataSource, keyField, filter } = item?.dataView ?? {
    name: "",
    dataSource: "",
    keyField: "",
  };

  const { value: link } = item;

  const mergedolumns = loadColumns(dataSource, [
    {
      dataIndex: keyField,
      render: (text: string) => (
        <Button.Link onClick={() => navigate(link + "?k=" + text)}>
          {text}
        </Button.Link>
      ),
    },
  ]);

  const { table, register } = useTable({
    name,
    dataSource,
    keyField,
    columns: mergedolumns,
    initialFilter: filter,
  });

  if (!dataSource)
    return (
      <Empty>
        {i18n.t("No Data Source Provided")}
        <a onClick={props.toggle.show}> {i18n.t("Provide Now")}</a>
        <DataOptions widget={props} toggle={props.toggle} />
      </Empty>
    );

  const extra = [
    {
      text: "New Record",
      icon: <IAdd />,
      onClick: () => link && navigate(link + "?k="),
    },
  ];

  return (
    <React.Fragment>
      <Table {...register({ extra })} />
      <DataOptions
        widget={props}
        setData={table.setData}
        toggle={props.toggle}
      />
    </React.Fragment>
  );
};

export default DataView;
