import i18n from "~/i18n";

export const workflow = {
  dataSource: "workflow",
  valueField: "workflowID",
  textField: ["workflowID", "workflowName"],
  columns: [
    {
      dataIndex: "workflowID",
      dropdown: true,
    },
    {
      dataIndex: "workflowName",
      dropdown: true,
    },
    {
      dataIndex: "description",
    },
    {
      dataIndex: "workflowCategory",
      render: i18n.t,
    },
    {
      dataIndex: "workflowType",
      render: i18n.t,
    },
    {
      dataIndex: "entityID",
    },
    {
      dataIndex: ["entity", "entityID"],
    },
    {
      dataIndex: "useFinalApprover",
      render: i18n.t,
    },
    {
      dataIndex: "userID",
    },
    {
      dataIndex: "isDefault",
      render: i18n.t,
    },
  ],
};

export const workflowSelection = {
  dataSource: "workflow",
  valueField: "workflowID",
  textField: ["workflowID", "workflowName"],
  columns: [
    {
      dataIndex: "workflowID",
      dropdown: true,
    },
    {
      dataIndex: "workflowName",
      dropdown: true,
    },
    {
      dataIndex: "description",
    },
    {
      dataIndex: "useFinalApprover",
      render: i18n.t,
    },
    {
      dataIndex: "userID",
    },
  ],
}

export const workflowRoles = {
  dataSource: "workflowRoles",
  valueField: "workflowRoleID",
  textField: ["workflowRoleID", "workflowRoleName"],
  columns: [
    {
      dataIndex: "workflowRoleID",
      dropdown: true,
    },
    {
      dataIndex: "workflowRoleName",
      dropdown: true,
    },
    {
      dataIndex: "description",
    },
  ],
};
