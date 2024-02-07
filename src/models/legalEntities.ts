import i18n from "~/i18n";

export const legalEntities = {
  dataSource: "legalEntities",
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
      dataIndex: "entityType",
      render: i18n.t,
    },
    {
      dataIndex: "companyID",
    },
    {
      dataIndex: "commercialRegisteration",
    },
    {
      dataIndex: "taxRegisteration",
    },
    {
      dataIndex: "currencyID",hidden:true
    },
    {
      title: i18n.t("currencyName"),
      dataIndex: ["currency", "currencyName"],hidden:true
    },
    {
      dataIndex: "salesTaxGroupID",hidden:true
    },
    {
      title: i18n.t("salesTaxGroupName"),
      dataIndex: ["salesTaxGroup", "salesTaxGroupName"],hidden:true
    },
    {
      dataIndex: "description",
    },
  ],
};

export const entityType = [
  { value: "Company", label: i18n.t("Company") },
];
