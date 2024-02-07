/**
 * * Default Table View
 * ? View - Search - Filter - Sort - Actions (Delete)
 */

import { Content } from "~/components/content";

import { Table, Button } from "~/library/components";

import { loadColumns } from "~/library/utils";

import { useTable } from "~/library/hooks";

import masterList from "~/pages/common/menu/masterList";

const List = (props: any) => {
  const { name, dataSource, keyField, breadcrumb } = props;

  const columns = loadColumns(dataSource, [
    {
      dataIndex: keyField,
      render: (text: any) => (
        <Button.Link onClick={() => table.handleEditRecord(text)}>
          {text}
        </Button.Link>
      ),
    },
    ...(props.columns ?? []),
  ]);

  const { table, register } = useTable({
    name,
    dataSource,
    keyField,
    columns,
    initialFilter: props.filter,
  });

  return (
    !table.isEditing && (
      <Content title={name} breadcrumb={breadcrumb} menu={masterList(table)}>
        <Table {...register()} />
      </Content>
    )
  );
};
export default List;
