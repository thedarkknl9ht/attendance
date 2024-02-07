/**
 * * Default Table View
 * ? View - Search - Filter - Sort - Actions (Delete, Edit)
 */

import { Table } from "~/components/table";

import { useTable } from "~/library/hooks";

interface queryBuilderProps {
  fields: any[];
}

const name = "queryBuilder";
const keyField = "key";

const QueryBuilder = ({ fields }: queryBuilderProps) => {
  const columns = [
    {
      dataIndex: "dataIndex",
      inputType: "selectFixed",
      inputSource: fields,
      required: true,
    },
    { dataIndex: "operation", inputType: "selectFixed" },
    { dataIndex: "value" },
    { dataIndex: "optional" },
  ];

  const { register } = useTable({
    name,
    dataSource: [],
    keyField,
    autoKey: true,
    columns,
    allowEdit: true,
    allowSort: false,
    allowFilter: false,
    allowSearch: false,
    allowPagination: false,
  });

  return <Table {...register()} />;
};

export default QueryBuilder;
