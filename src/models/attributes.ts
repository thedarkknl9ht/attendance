import dayjs from "dayjs";
import i18n from "~/i18n";

import { isEmpty } from "~/utils/helpers";

export const attributes = {
  dataSource: "attributes",
  valueField: "attributeID",
  textField: ["attributeID", "attributeName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "attributeID",
      dropdown: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "attributeName",
      dropdown: true,
    },
    { dataIndex: "attributeTypeID" },
    {
      title: i18n.t("attributeTypeName"),
      dataIndex: ["attributeType", "attributeTypeName"],
    },
    { dataIndex: "description" },
  ],
};

export const attributesTypes = {
  dataSource: "attributesTypes",
  valueField: "attributeTypeID",
  textField: ["attributeTypeID", "attributeTypeName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "attributeTypeID",
      dropdown: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "attributeTypeName",
      dropdown: true,
    },
    { dataIndex: "dataType" },
    { dataIndex: "fixedList", inputType: "bool", render: i18n.t },
    { dataIndex: "description" },
  ],
};

export const dataType = [
  { value: "String", label: i18n.t("String") },
  { value: "Decimal", label: i18n.t("Decimal") },
  { value: "Integer", label: i18n.t("Integer") },
  { value: "Date", label: i18n.t("Date") },
  { value: "Bool", label: i18n.t("Bool") },
];

export const attributesTypesValues = {
  columns: [
    {
      dataIndex: "attributeValue",
      autoFocus: true,
    },
  ],
};

export const attributesGroups = {
  dataSource: "attributesGroups",
  valueField: "attributeGroupID",
  textField: ["attributeGroupID", "attributeGroupName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "attributeGroupID",
      dropdown: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "attributeGroupName",
      dropdown: true,
    },
    { dataIndex: "description" },
  ],
};

export const attributesGroupsDetails = {
  columns: [
    {
      dataIndex: "attributeID",
      inputType: "select",
      inputSource: "attributes",
      inputFK: "attribute",
      required: true,
      readOnly: (row: any) => !isEmpty(row.attributeID),
      autoFocus: true,
    },
    {
      dataIndex: ["attribute", "attributeName"],
      readOnly: true,
    },
    {
      dataIndex: "displayOrder",
      inputType: "integer",
      defaultValue: 0,
      required: true,
    },
    {
      dataIndex: "defaultValue",
      render: (value: any, record: any) =>
        record?.attribute?.attributeType?.dataType === "Date"
          ? value && dayjs(value).format("YYYY/MM/DD")
          : record?.attribute?.attributeType?.dataType === "Bool"
          ? i18n.t(value)
          : value,
    },
  ],
};
