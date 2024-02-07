import i18n from "~/i18n";

export const units = {
  dataSource: "units",
  valueField: "unitID",
  textField: ["unitID", "unitName"],
  columns: [
    {
      dataIndex: "unitID",
      dropdown: true,
    },
    {
      dataIndex: "unitName",
      dropdown: true,
    },
    {
      dataIndex: "unitClass",
      render: i18n.t,
    },
    {
      dataIndex: "baseUnit",
      render: i18n.t,
    },
  ],
};

export const unitClass = [
  { value: "Quantity", label: i18n.t("Quantity") },
  { value: "Length", label: i18n.t("Length") },
  { value: "Liquid Volume", label: i18n.t("Liquid Volume") },
  { value: "Area", label: i18n.t("Area") },
  { value: "Mass", label: i18n.t("Mass") },
  { value: "Time", label: i18n.t("Time") },
  { value: "Temperature", label: i18n.t("Temperature") },
  { value: "Speed", label: i18n.t("Speed") },
  { value: "Energy", label: i18n.t("Energy") },
  { value: "Power", label: i18n.t("Power") },
  { value: "Undefined", label: i18n.t("Undefined") },
];

export const unitsConversions = {
  dataSource: "unitsConversions",
  columns: [
    {
      dataIndex: "definition",
      width: 250,
    },
    {
      dataIndex: "fromUnitID",
    },
    {
      dataIndex: "fromUnitQuantity",
    },
    {
      dataIndex: "toUnitID",
    },
    {
      dataIndex: "toUnitQuantity",
    },
    {
      dataIndex: "locked",
      render: i18n.t,
    },
  ],
};
