import { useTable } from "~/library/hooks";

import { Button, Drawer, Space, Table } from "../../library/components";

import i18n from "~/i18n";

interface selectionProps {
  title?: string;
  toggle: any;
  name?: string;
  dataSource: any;
  keyField: string;
  columns: any[];
  filter?: any[];
  onConfirm: Function;
}

export const Selection = (props: selectionProps) => {
  const {
    title,
    name,
    dataSource,
    keyField,
    columns,
    filter,
    toggle,
    onConfirm,
  } = props;

  const { table, register } = useTable({
    name: name ?? dataSource,
    dataSource,
    keyField,
    columns,
    initialFilter: filter,
  });

  const handleConfirm = () => {
    if (table.selectedRow[keyField]) {
      onConfirm(table.selectedRow);
    }
    toggle.close();
  };

  return (
    table.data?.length > 0 && (
      <Drawer
        title={title}
        toggle={toggle}
        width={1000}
        extra={
          <Space>
            <Button type="text" onClick={toggle.close}>
              {i18n.t("Cancel")}
            </Button>
            <Button onClick={handleConfirm}>{i18n.t("Confirm")}</Button>
          </Space>
        }
      >
        <Table {...register()} />
      </Drawer>
    )
  );
};
