import { Table } from "~/library/components";

import { loadColumns } from "~/utils/loadColumns";

import { useTable } from "~/hooks/useTable";

import detailsList from "~/pages/common/menu/detailsList";
/////////////////////////////////////////////////////////////////////////
const name = "usersSecurityRolesEntities";
const dataSource = "usersSecurityRolesEntities";
const keyField = "entityID";
/////////////////////////////////////////////////////////////////////////
const Entities = ({ master }: any) => {
  const columns = loadColumns(dataSource);

  const masterKey = master.getFieldValue("securityRoleID");
  /////////////////////////////////////////////////////////////////////////
  const { table, register } = useTable({
    name,
    dataSource,
    keyField,
    columns,
    master,
    initialValues: {
      userID: master.getFieldValue("userID"),
      securityRoleID: masterKey,
    },
  });
  /////////////////////////////////////////////////////////////////////////
  return <Table {...register({ extra: detailsList(table, masterKey) })} />;
};
/////////////////////////////////////////////////////////////////////////
export default Entities;
