export const currency = {
  dataSource: "currency",
  valueField: "currencyID",
  textField: ["currencyID", "currencyName"],
  columns: [
    {
      dataIndex: "currencyID",
      dropdown: true,
    },
    {
      dataIndex: "currencyName",
      dropdown: true,
    },
    {
      dataIndex: "conversionFactor",
    },
    {
      dataIndex: "description",
    },
  ],
};
