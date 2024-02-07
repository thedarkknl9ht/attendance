/**
 * * Default Table View
 * ? View - Search - Filter - Sort - Actions (Delete, Edit)
 */

import { Content } from "~/components/content";

import { Table } from "~/components/table";

import { loadColumns } from "~/library/utils";

import { useTable } from "~/library/hooks";

import masterListEdit from "~/pages/common/menu/masterListEdit";

interface listProps {
  name: string;
  dataSource: string;
  keyField: string;
  breadcrumb?: any[];
}

const List = ({ name, dataSource, keyField, breadcrumb }: listProps) => {
  const columns = loadColumns(dataSource);

  const { table, register } = useTable({
    name,
    dataSource,
    keyField,
    columns,
    allowEdit: true,
  });

  return (
    <Content title={name} breadcrumb={breadcrumb} menu={masterListEdit(table)}>
      <Table {...register()} />
    </Content>
  );
};
export default List;
