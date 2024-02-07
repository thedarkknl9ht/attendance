import dayjs from "dayjs";
import i18n from "~/i18n";

export const financialDimensions = {
  dataSource: "financialDimensions",
  valueField: "financialDimensionID",
  textField: ["financialDimensionID", "financialDimensionName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "financialDimensionID",
      dropdown: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "financialDimensionName",
      dropdown: true,
    },
    { dataIndex: "financialDimensionType", render: i18n.t },
    {
      dataIndex: "financialDimensionGroup",
      hidden: true,
    },
    {
      dataIndex: "activeFrom",
      render: (value: any) => value && dayjs(value).format("YYYY/MM/DD"),
      hidden: true,
    },
    {
      dataIndex: "activeTo",
      render: (value: any) => value && dayjs(value).format("YYYY/MM/DD"),
      hidden: true,
    },
    {
      dataIndex: "allowManualEntry",
      render: i18n.t,
    },
    {
      dataIndex: "suspended",
      render: i18n.t,
    },
    { dataIndex: "description" },
  ],
};

export const financialDimensionType = [
  { value: "Business Unit", label: i18n.t("Business Unit") },
  { value: "Cost Center", label: i18n.t("Cost Center") },
  { value: "Department", label: i18n.t("Department") },
  { value: "Item Group", label: i18n.t("Item Group") },
  { value: "Project", label: i18n.t("Project") },
];