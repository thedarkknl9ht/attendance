import { Table, Form } from "~/library/components";

import { loadColumns } from "~/utils/loadColumns";

import { useTable } from "~/hooks/useTable";

import detailsList from "~/pages/common/menu/detailsList";
/////////////////////////////////////////////////////////////////////////
const name = "securityRolesTasks";
const dataSource = "securityRolesTasks";
const keyField = "securityTaskID";
/////////////////////////////////////////////////////////////////////////
const Tasks = () => {
  const master = Form.useFormInstance();

  const columns = loadColumns(dataSource);

  const masterKey = master.getFieldValue("securityRoleID");
  /////////////////////////////////////////////////////////////////////////
  const { table, register } = useTable({
    name,
    dataSource,
    keyField,
    columns,
    master,
    initialValues: { securityRoleID: masterKey },
  });
  /////////////////////////////////////////////////////////////////////////
  return <Table {...register({ extra: detailsList(table, masterKey) })} />;
};
/////////////////////////////////////////////////////////////////////////
export default Tasks;
