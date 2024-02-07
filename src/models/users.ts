import { isEmpty } from "~/library/utils";

import dayjs from "dayjs";

import i18n from "~/i18n";

export const users = {
  dataSource: "users",
  valueField: "userID",
  textField: ["userID", "userName"],
  columns: [
    {
      dataIndex: "userID",
      dropdown: true,
    },
    {
      dataIndex: "userName",
      dropdown: true,
    },
    {
      dataIndex: "enabled",
      render: i18n.t,
    },
    {
      dataIndex: "admin",
      render: i18n.t,
      hidden: true,
    },
    {
      dataIndex: "email",
      render: i18n.t,
      hidden: true,
    },
    {
      dataIndex: "workflowRoleID",
    },
    {
      title: i18n.t("workflowRoleName"),
      dataIndex: ["workflowRole", "workflowRoleName"],
    },
    {
      dataIndex: "entityID",
      hidden: true,
    },
    {
      tiltle: i18n.t("entityName"),
      dataIndex: ["entity", "entityName"],
      hidden: true,
    },
  ],
};

export const userType = [{ value: "Standard", label: i18n.t("Standard") }];

export const pageLinkType = [
  { value: "Same Tab", label: i18n.t("Same Tab") },
  { value: "New Tab", label: i18n.t("New Tab") },
];

export const usersSecurityRoles = {
  columns: [
    {
      dataIndex: "securityRoleID",
      inputType: "select",
      inputSource: "securityRoles",
      inputFK: "securityRole",
      required: true,
      readOnly: (row: any) => !isEmpty(row.securityRoleID),
      autoFocus: true,
    },
    {
      title: i18n.t("securityRoleName"),
      dataIndex: ["securityRole", "securityRoleName"],
      readOnly: true,
    },
    {
      dataIndex: "startDate",
      inputType: "date",
      render: (value: any) => value && dayjs(value).format("YYYY/MM/DD"),
    },
    {
      dataIndex: "endDate",
      inputType: "date",
      render: (value: any) => value && dayjs(value).format("YYYY/MM/DD"),
    },
    {
      dataIndex: "allEntities",
      inputType: "selectFixed",
      inputSource: "bool",
      defaultValue: true,
      render: i18n.t,
      required: true,
    },
  ],
};

export const usersSecurityRolesEntities = {
  columns: [
    {
      dataIndex: "entityID",
      inputType: "select",
      inputSource: "legalEntities",
      inputFK: "entity",
      required: true,
      readOnly: (row: any) => !isEmpty(row.entityID),
      autoFocus: true,
    },
    {
      dataIndex: ["entity", "entityName"],
      readOnly: true,
    },
    {
      dataIndex: "startDate",
      inputType: "date",
      render: (value: any) => value && dayjs(value).format("YYYY/MM/DD"),
    },
    {
      dataIndex: "endDate",
      inputType: "date",
      render: (value: any) => value && dayjs(value).format("YYYY/MM/DD"),
    },
  ],
};

export const usersGroups = {
  dataSource: "usersGroups",
  valueField: "userGroupID",
  textField: ["userGroupID", "userGroupName"],
  columns: [
    {
      dataIndex: "userGroupID",
      dropdown: true,
    },
    {
      dataIndex: "userGroupName",
      dropdown: true,
    },
    {
      dataIndex: "description",
    },
  ],
};

export const usersGroupsDetails = {
  columns: [
    {
      dataIndex: "userID",
      inputType: "select",
      inputSource: "users",
      inputFK: "user",
      readOnly: (row: any) => !isEmpty(row.userID),
      required: true,
    },
    {
      title: i18n.t("userName"),
      dataIndex: ["user", "userName"],
      readOnly: true,
    },
  ],
};

export const usersLegalEntities = {
  dataSource: "usersLegalEntities",
  valueField: "entityID",
  textField: ["entityID", "entityName"],
  columns: [
    {
      dataIndex: "entityID",
      dropdown: true,
    },
    {
      dataIndex: "entityName",
      dropdown: true,
    },
    {
      dataIndex: "description",
    },
  ],
};
