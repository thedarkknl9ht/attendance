import { useEffect } from "react";
import { Table, Drawer, Space, Button, ICancel, ISave } from "~/library/components";

import { useTable } from "~/library/hooks";

import i18n from "~/i18n";

interface columnsProps {
  dataSource: any[];
  toggle: any;
  handleChange?: Function;
}

export const ColumnsCustomization = ({
  dataSource,
  toggle,
  handleChange,
}: columnsProps) => {
  const getDataSource = () => {
    let ds: any[] = [];
    dataSource.forEach((item: any) =>
      ds.push({
        dataIndex: item.dataIndex,
        title: item.title ?? i18n.t(item.dataIndex),
        hidden: item.hidden === true,
        status: "edit",
        item,
      })
    );

    return ds;
  };

  const columns = [
    {
      dataIndex: "title",
      required: true,
    },
  ];

  const { table, register } = useTable({
    name: "tableCustomization",
    keyField: "dataIndex",
    dataSource: getDataSource(),
    columns,
    allowEdit: true,
    allowPagination: false,
  });

  const handleConfirm = () => {
    let data: any[] = [...table.data];
    for (var i = 0; i < data.length; i++) {
      let hidden = !table.selectedRowKeys.some(
        (e: any) => e === data[i].dataIndex
      );
      data[i].status = hidden !== data[i].hidden ? "updated" : data[i].status;
      data[i].hidden = hidden;
    }

    if (handleChange) handleChange(data);
    toggle.close();
  };
  //////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (toggle.open) {
      let selectedRowKeys: any[] = [];

      dataSource
        .filter((e: any) => e.hidden !== true)
        .forEach((item: any) => selectedRowKeys.push(item.dataIndex));

      table.setSelctedRowKeys(selectedRowKeys);
    }
  }, [toggle.open]);
  //////////////////////////////////////////////////////////////////
  return (
    <Drawer width="large" toggle={toggle} closable={false}>
      <Table
        {...register({
          allowCustomization: false,
          allowFilter: false,
          allowSort: false,
          allowSearch: false,
        })}
      />
      <Space>
        <Button icon={<ISave />} onClick={handleConfirm}>
          {i18n.t("Confirm")}
        </Button>
        <Button type="text" icon={<ICancel />} onClick={toggle.close}>
          {i18n.t("Close")}
        </Button>
      </Space>
    </Drawer>
  );
};
