import { Table, Form, Divider } from "~/library/components";

import { loadColumns } from "~/utils/loadColumns";

import { useTable } from "~/hooks/useTable";

import detailsList from "~/pages/common/menu/detailsList";
import React from "react";
import Entities from "./entities";
import i18n from "~/i18n";
/////////////////////////////////////////////////////////////////////////
const name = "usersSecurityRoles";
const dataSource = "usersSecurityRoles";
const keyField = "securityRoleID";
/////////////////////////////////////////////////////////////////////////
const Roles = () => {
  const master = Form.useFormInstance();

  const columns = loadColumns(dataSource);

  const masterKey = master.getFieldValue("userID");
  /////////////////////////////////////////////////////////////////////////
  const { table, register } = useTable({
    name,
    dataSource,
    keyField,
    columns,
    master,
    initialValues: { userID: masterKey },
  });
  /////////////////////////////////////////////////////////////////////////
  return (
    <React.Fragment>
      <Table {...register({ extra: detailsList(table, masterKey) })} />

      {table.editingRow.allEntities === false && (
        <React.Fragment>
          <Divider orientation="left">{i18n.t("Legal Entities")}</Divider>
          <Entities master={table.master} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
/////////////////////////////////////////////////////////////////////////
export default Roles;
