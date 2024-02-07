import React from "react";

import { Page } from "components/page";

import { Table } from "components/table";

import { loadColumns } from "utils/loadColumns";

import { useTable } from "hooks/useTable";

import masterListEdit from "pages/common/menu/masterListEdit";

const List = ({ name, dataSource, keyField, breadcrumb }) => {
  const columns = loadColumns(dataSource);

  const { table, register } = useTable({
    name,
    dataSource,
    keyField,
    columns,
    allowEdit: true,
  });

  return (
    <Page title={name} breadcrumb={breadcrumb} allowCustomViews={true}>
      <Table {...register({ extra: masterListEdit(table) })} />
    </Page>
  );
};
export default List;
