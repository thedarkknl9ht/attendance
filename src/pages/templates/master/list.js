import React from "react";

import { Page } from "components/page";

import { Table, Button } from "components";

import { loadColumns } from "utils/loadColumns";

import { useTable } from "hooks/useTable";

import masterList from "pages/common/menu/masterList";

const List = ({ name, dataSource, keyField, breadcrumb }) => {
  const columns = loadColumns(dataSource, [
    {
      dataIndex: keyField,
      render: (text, record) => (
        <Button.Link onClick={() => table.handleRowEdit(record)}>
          {text}
        </Button.Link>
      ),
    },
  ]);

  const { table, register } = useTable({
    name,
    dataSource,
    keyField,
    columns,
  });

  return (
    !table.isEditing && (
      <Page title={name} breadcrumb={breadcrumb}>
        <Table {...register({ extra: masterList(table) })} />
      </Page>
    )
  );
};
export default List;
