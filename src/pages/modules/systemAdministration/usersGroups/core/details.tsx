import { Table, Form } from "~/library/components";

import { loadColumns } from "~/utils/loadColumns";

import { useTable } from "~/hooks/useTable";

import detailsList from "~/pages/common/menu/detailsList";
/////////////////////////////////////////////////////////////////////////
const name = "usersGroupsDetails";
const dataSource = "usersGroupsDetails";
const keyField = "userID";
/////////////////////////////////////////////////////////////////////////
const Details = () => {
  const master = Form.useFormInstance();

  const columns = loadColumns(dataSource);

  const masterKey = master.getFieldValue("userGroupID");
  /////////////////////////////////////////////////////////////////////////
  const { table, register } = useTable({
    name,
    dataSource,
    keyField,
    columns,
    master,
    initialValues: { userGroupID: masterKey },
  });
  /////////////////////////////////////////////////////////////////////////
  return <Table {...register({ extra: detailsList(table, masterKey) })} />;
};
/////////////////////////////////////////////////////////////////////////
export default Details;
