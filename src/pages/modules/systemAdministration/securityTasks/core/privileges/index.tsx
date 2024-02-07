import React, { useState } from "react";
/////////////////////////////////////////////////////////////////////////
import { Table, Form, IAdd, IDelete, Segmented } from "~/library/components";

import { loadColumns } from "~/library/utils";

import { useTable, useToggle } from "~/library/hooks";
/////////////////////////////////////////////////////////////////////////
import AddPrivilege from "./add";
import i18n from "~/i18n";
/////////////////////////////////////////////////////////////////////////
const name = "securityPrivileges";
const dataSource = "securityTasksPrivileges";
const keyField = "privilegeID";
/////////////////////////////////////////////////////////////////////////
const Privileges = () => {
  const [resourceType, setResourceType] = useState("Page");

  const master = Form.useFormInstance();

  const columns = loadColumns(name, [
    {
      dataIndex: "permission",
      onChange: ({ value }: any) => ({
        read: value,
        update: value,
        create: value,
        delete: value,
      }),
    },
    {
      dataIndex: "read",
      onChange: () => ({ permission: "Unset" }),
      hidden: resourceType === "Report" || resourceType === "Action Menu",
    },
    {
      dataIndex: "update",
      onChange: () => ({ permission: "Unset" }),
      hidden: resourceType === "Report" || resourceType === "Action Menu",
    },
    {
      dataIndex: "create",
      onChange: () => ({ permission: "Unset" }),
      hidden: resourceType !== "Page" && resourceType !== "Table",
    },
    {
      dataIndex: "delete",
      onChange: () => ({ permission: "Unset" }),
      hidden: resourceType !== "Page" && resourceType !== "Table",
    },
  ]);

  const masterKey = master.getFieldValue("securityTaskID");

  const toggle = useToggle();
  /////////////////////////////////////////////////////////////////////////
  const { table, register } = useTable({
    name,
    dataSource,
    keyField,
    columns,
    master,
    customFilter: (ele: any) => ele.resourceType === resourceType,
    initialValues: { securityTaskID: masterKey },
  });
  /////////////////////////////////////////////////////////////////////////
  const extra = [
    {
      text: "Add Privileges",
      icon: <IAdd />,
      disabled: !masterKey,
      onClick: () => toggle.show(),
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
  /////////////////////////////////////////////////////////////////////////
  const options = [
    {
      value: "Page",
      label: i18n.t("Page"),
    },
    {
      value: "Action Menu",
      label: i18n.t("Action Menu"),
    },
    {
      value: "Field",
      label: i18n.t("Field"),
    },
    {
      value: "Table",
      label: i18n.t("Table"),
    },
    {
      value: "Report",
      label: i18n.t("Report"),
    },
  ];

  const onTabChange = (value: string) => {
    setResourceType(value);
    table.setSelctedRowKeys([]);
  };
  /////////////////////////////////////////////////////////////////////////
  return (
    <React.Fragment>
      <Segmented
        value={resourceType}
        onChange={onTabChange}
        options={options}
      />
      <Table {...register({ extra })} />
      <AddPrivilege
        master={table}
        resourceType={resourceType}
        toggle={toggle}
      />
    </React.Fragment>
  );
};
/////////////////////////////////////////////////////////////////////////
export default Privileges;
