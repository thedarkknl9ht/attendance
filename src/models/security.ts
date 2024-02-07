import i18n from "~/i18n";

import { isEmpty } from "~/utils/helpers";

import { privileges as _privileges } from "~/project/data/privileges";

const getPrivilegeLabel=(text:string)=>{
  const arr = text.split("_");
  let label = "";
  arr.forEach((ele: any) => {
    if (label !== "") label += ",";
    label += i18n.t(ele);
  });
  return label;
}

export const securityRoles = {
  dataSource: "securityRoles",
  valueField: "securityRoleID",
  textField: ["securityRoleID", "securityRoleName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "securityRoleID",
      dropdown: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "securityRoleName",
      dropdown: true,
    },
    { dataIndex: "description" },
  ],
};

export const securityRolesTasks = {
  columns: [
    {
      dataIndex: "securityTaskID",
      inputType: "select",
      inputSource: "securityTasks",
      inputFK: "securityTask",
      required: true,
      readOnly: (row: any) => !isEmpty(row.securityTaskID),
      autoFocus: true,
    },
    {
      dataIndex: ["securityTask", "securityTaskName"],
      readOnly: true,
    },
    {
      dataIndex: "userID",
      inputType: "select",
      inputSource: "users",
      inputFK: "user",
    },
    {
      title: i18n.t("userName"),
      dataIndex: ["user", "userName"],
    },
  ],
};

export const securityRolesPrivileges = {
  columns: [
    {
      dataIndex: "privilegeID",
      readOnly: true,
      render: getPrivilegeLabel
    },
    { dataIndex: "resourceType", readonly: true, render: i18n.t },
    { dataIndex: "read", inputType: "Checkbox", render: i18n.t },
    { dataIndex: "update", inputType: "Checkbox", render: i18n.t },
    { dataIndex: "create", inputType: "Checkbox", render: i18n.t },
    { dataIndex: "delete", inputType: "Checkbox", render: i18n.t },
  ],
};

export const securityTasks = {
  dataSource: "securityTasks",
  valueField: "securityTaskID",
  textField: ["securityTaskID", "securityTaskName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "securityTaskID",
      dropdown: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "securityTaskName",
      dropdown: true,
    },
    { dataIndex: "description" },
  ],
};

export const securityPrivileges = {
  columns: [
    {
      dataIndex: "privilegeID",
      fixed: "left",
      editable: false,
      render: getPrivilegeLabel,
    },
    {
      dataIndex: "resourceType",
      editable: false,
      render: i18n.t,
    },
    {
      dataIndex: "permission",
      inputType: "selectFixed",
      inputSource: "privilegeStatus",
      required: true,
      render: i18n.t,
    },
    {
      dataIndex: "read",
      inputType: "selectFixed",
      inputSource: "privilegeStatus",
      required: true,
      render: i18n.t,
    },
    {
      dataIndex: "update",
      inputType: "selectFixed",
      inputSource: "privilegeStatus",
      required: true,
      render: i18n.t,
    },
    {
      dataIndex: "create",
      inputType: "selectFixed",
      inputSource: "privilegeStatus",
      required: true,
      render: i18n.t,
    },
    {
      dataIndex: "delete",
      inputType: "selectFixed",
      inputSource: "privilegeStatus",
      required: true,
      render: i18n.t,
    },
  ],
};

export const resourceType = [
  { value: "Page", label: i18n.t("Page") },
  { value: "Action Menu", label: i18n.t("Action Menu") },
  { value: "Field", label: i18n.t("Field") },
  { value: "Table", label: i18n.t("Table") },
];

export const privilegeStatus = [
  { value: "Unset", label: i18n.t("Unset") },
  { value: "Granted", label: i18n.t("Granted") },
  { value: "Denied", label: i18n.t("Denied") },
];

export const privileges = {
  columns: [
    { dataIndex: "privilegeID", render: getPrivilegeLabel },
    { dataIndex: "resourceType", render: i18n.t },
  ],
};

export const securityTaskType = [
  { value: "Standard", label: i18n.t("Standard") },
  { value: "User", label: i18n.t("User") },
];

export const permissionPolicy = [
  { value: "Standard", label: i18n.t("Standard") },
  { value: "Flexible", label: i18n.t("Flexible") },
];
