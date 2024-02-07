import { useQuery } from "@tanstack/react-query";

import {
  Button,
  Drawer,
  IAdd,
  ICancel,
  IDelete,
  ISave,
  Space,
  Table,
} from "~/library/components";

import { inputSources } from "~/library/models";

import { useTable } from "~/library/hooks";

import i18n from "~/i18n";
import dayjs from "dayjs";
//////////////////////////////////////////////////////////////////
interface queryBuilderProps {
  columns: any[];
  dataSource: any[];
  toggle?: any;
  handleFilter?: Function;
}
//////////////////////////////////////////////////////////////////
export const QueryBuilder = (props: queryBuilderProps) => {
  const { dataSource, toggle, handleFilter } = props;
  //////////////////////////////////////////////////////////////////
  const { data: properties } = useQuery({
    queryKey: ["queryBuilder"],
    queryFn: () => getProperties(),
    initialData: [],
    refetchOnWindowFocus: false,
  });

  const getProperties = async () => {
    let columns: any[] = [];
    props.columns.forEach((ele: any) =>
      columns.push({
        value: ele.dataIndex.toString(),
        label: ele.title ?? i18n.t(ele.dataIndex),
      })
    );
    return columns;
  };
  //////////////////////////////////////////////////////////////////
  const { operation } = inputSources;
  //////////////////////////////////////////////////////////////////
  const columns = [
    {
      dataIndex: "propertyName",
      inputType: "selectFixed",
      inputSource: properties,
      required: true,
      onChange: ({ value }: any) => {
        let column = props.columns.find((e: any) => e.dataIndex === value);

        return {
          inputType: column?.inputType,
          inputSource: column?.inputSource,
        };
      },
      render: (text: any) =>
        i18n.t(text?.includes(",") ? text.split(",")[0] : text),
    },
    {
      dataIndex: "operation",
      inputType: "selectFixed",
      inputSource: (record: any) => operation[record.inputType ?? "string"],
      defaultValue: 0,
      required: true,
      render: (value: any) =>
        value === 0 ? i18n.t("Equal") : value === 1 ? i18n.t("Not Equal") : "",
    },
    {
      dataIndex: "value",
      inputType: (record: any) => record.inputType,
      inputSource: (record: any) => record.inputSource,
      render: (text: any, record: any) =>
        record.inputType === "date"
          ? text && dayjs(text).format("YYYY/MM/DD")
          : record.inputType === "selectFixed"
          ? i18n.t(text)
          : text,
      defaultValue: "",
    },
    {
      dataIndex: "optional",
      inputType: "selectFixed",
      inputSource: "bool",
      defaultValue: false,
      required: true,
      render: i18n.t,
    },
  ];

  const { table, register } = useTable({
    name: "queryBuilder",
    dataSource,
    keyField: "key",
    columns,
    autoKey: true,
    allowEdit: true,
    allowSearch: false,
    allowSort: false,
    allowFilter: false,
    allowPagination: false,
  });
  //////////////////////////////////////////////////////////////////
  const extra = [
    {
      text: "New Line",
      icon: <IAdd />,
      onClick: () => table.handleRowAdd({}),
    },
    { separator: true, hidden: !table.hasSelection },
    {
      text: "Delete",
      danger: true,
      icon: <IDelete />,
      onClick: table.handleRowsDelete,
      hidden: !table.hasSelection,
    },
  ];
  //////////////////////////////////////////////////////////////////
  const handleConfirm = async () => {
    if (handleFilter) handleFilter(table.data);
    toggle.close();
  };
  //////////////////////////////////////////////////////////////////
  return (
    <Drawer
      title="Query Builder"
      width={900}
      toggle={toggle}
      extra={
        <Space>
          <Button type="text" icon={<ICancel />} onClick={props.toggle.close}>
            {i18n.t("Cancel")}
          </Button>
          <Button icon={<ISave />} onClick={handleConfirm}>
            {i18n.t("Confirm")}
          </Button>
        </Space>
      }
    >
      <Table
        {...register({ allowFilter: false, allowCustomization: false, extra })}
      />
    </Drawer>
  );
};
