import i18n from "~/i18n";

import { Checkbox } from "~/library/components";

export const productsCategories = {
  dataSource: "productsCategories",
  valueField: "productCategoryID",
  textField: ["productCategoryID", "productCategoryName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "productCategoryID",
      dropdown: true,
      required: true,
      readOnly: (record: any) => record.productCategoryID,
      autoFocus: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "productCategoryName",
      dropdown: true,
      required: true,
      autoFocus: true,
    },
    { dataIndex: "description" },
  ],
};

export const colors = {
  dataSource: "colors",
  valueField: "colorID",
  textField: ["colorID", "colorName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "colorID",
      dropdown: true,
      required: true,
      readOnly: (record: any) => record.colorID,
      autoFocus: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "colorName",
      dropdown: true,
      required: true,
      autoFocus: true,
    },
    {
      dataIndex: "hexCode",
    },
    { dataIndex: "description" },
  ],
};

export const colorsGroups = {
  dataSource: "colorsGroups",
  valueField: "colorGroupID",
  textField: ["colorGroupID", "colorGroupName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "colorGroupID",
    },
    {
      title: i18n.t("Name"),
      dataIndex: "colorName",
    },
    { dataIndex: "description" },
  ],
};

export const colorsGroupsDetails = {
  columns: [
    {
      dataIndex: "colorID",
      inputType: "select",
      inputSource: "colors",
      inputFK: "color",
      required: true,
      readOnly: (record: any) => record.colorID,
      autoFocus: true,
    },
    {
      title: i18n.t("colorName"),
      dataIndex: ["color", "colorName"],
    },
  ],
};

export const sizes = {
  dataSource: "sizes",
  valueField: "sizeID",
  textField: ["sizeID", "sizeName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "sizeID",
      dropdown: true,
      required: true,
      readOnly: (record: any) => record.sizeID,
      autoFocus: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "sizeName",
      dropdown: true,
      required: true,
      autoFocus: true,
    },
    {
      dataIndex: "hexCode",
    },
    { dataIndex: "description" },
  ],
};

export const sizesGroups = {
  dataSource: "sizesGroups",
  valueField: "sizeGroupID",
  textField: ["sizeGroupID", "sizeGroupName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "sizeGroupID",
    },
    {
      title: i18n.t("Name"),
      dataIndex: "sizeGroupName",
    },
    { dataIndex: "description" },
  ],
};

export const sizesGroupsDetails = {
  columns: [
    {
      dataIndex: "sizeID",
      inputType: "select",
      inputSource: "sizes",
      inputFK: "size",
      required: true,
      readOnly: (record: any) => record.colorID,
      autoFocus: true,
    },
    {
      title: i18n.t("sizeName"),
      dataIndex: ["size", "sizeName"],
    },
  ],
};

export const styles = {
  dataSource: "styles",
  valueField: "styleID",
  textField: ["styleID", "styleName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "styleID",
      dropdown: true,
      required: true,
      readOnly: (record: any) => record.styleID,
      autoFocus: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "styleName",
      dropdown: true,
      required: true,
      autoFocus: true,
    },
    {
      dataIndex: "hexCode",
    },
    { dataIndex: "description" },
  ],
};

export const stylesGroupsDetails = {
  columns: [
    {
      dataIndex: "styleID",
      inputType: "select",
      inputSource: "styles",
      inputFK: "style",
      required: true,
      readOnly: (record: any) => record.colorID,
      autoFocus: true,
    },
    {
      title: i18n.t("styleName"),
      dataIndex: ["style", "styleName"],
    },
  ],
};

export const stylesGroups = {
  dataSource: "stylesGroups",
  valueField: "styleGroupID",
  textField: ["styleGroupID", "styleGroupName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "styleGroupID",
    },
    {
      title: i18n.t("Name"),
      dataIndex: "styleGroupName",
    },
    { dataIndex: "description" },
  ],
};

export const versions = {
  dataSource: "versions",
  valueField: "versionID",
  textField: ["versionID", "versionName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "versionID",
      dropdown: true,
      required: true,
      readOnly: (record: any) => record.versionID,
      autoFocus: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "versionName",
      dropdown: true,
      required: true,
      autoFocus: true,
    },
  ],
};

export const configurations = {
  dataSource: "configurations",
  valueField: "configurationID",
  textField: ["configurationID", "configurationName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "configurationID",
      dropdown: true,
      required: true,
      readOnly: (record: any) => record.configurationID,
      autoFocus: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "configurationName",
      dropdown: true,
      required: true,
      autoFocus: true,
    },
    { dataIndex: "description" },
  ],
};

export const productsDimensions = {
  dataSource: "productsDimensions",
  valueField: "productDimensionID",
  textField: ["productDimensionID", "productDimensionName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "productDimensionID",
    },
    {
      title: i18n.t("Name"),
      dataIndex: "productDimensionName",
    },
    { dataIndex: "description" },
  ],
};

export const productsDimensionsDetails = {
  columns: [
    {
      dataIndex: "productDimensionType",
      render: i18n.t,
      editable: false,
    },
    {
      dataIndex: "active",
      inputType: "checkbox",
      render: (value: any) => <Checkbox checked={value} />,
    },
    {
      dataIndex: "forPurchasePrices",
      inputType: "checkbox",
      render: (value: any) => <Checkbox checked={value} />,
    },
    {
      dataIndex: "forSalesPrices",
      inputType: "checkbox",
      render: (value: any) => <Checkbox checked={value} />,
    },
  ],
};

export const productsLifeCycles = {
  dataSource: "productsLifeCycles",
  valueField: "productLifeCycleID",
  textField: ["productLifeCycleID", "productLifeCycleName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "productLifeCycleID",
    },
    {
      title: i18n.t("Name"),
      dataIndex: "productLifeCycleName",
    },
    { dataIndex: "description" },
  ],
};

export const productsLifeCyclesDetails = {
  columns: [
    {
      dataIndex: "pageID",
      render: i18n.t,
      editable: false,
    },
    {
      dataIndex: "policy",
      inputType: "selectFixed",
      inputSource: "productLifeCyclePolicy",
      required: true,
      width: 200,
      render: i18n.t,
    },
  ],
};

export const productLifeCyclePolicy = [
  { value: "Enabled", label: i18n.t("Enabled") },
  { value: "Disabled", label: i18n.t("Disabled") },
  {
    value: "Enabled (With Warnings)",
    label: i18n.t("Enabled (With Warnings)"),
  },
];

export const storageDimensions = {
  dataSource: "storageDimensions",
  valueField: "storageDimensionID",
  textField: ["storageDimensionID", "storageDimensionName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "storageDimensionID",
    },
    {
      title: i18n.t("Name"),
      dataIndex: "storageDimensionName",
    },
    { dataIndex: "description" },
  ],
};

export const storageDimensionsDetails = {
  columns: [
    {
      dataIndex: "storageDimensionType",
      render: i18n.t,
      editable: false,
    },
    {
      dataIndex: "active",
      inputType: "checkbox",
      readOnly: (record: any) =>
        record.storageDimensionType === "Site" ||
        record.storageDimensionType === "Warehouse",
      render: (value: any, record: any) => (
        <Checkbox
          checked={value}
          disabled={
            record.storageDimensionType === "Site" ||
            record.storageDimensionType === "Warehouse"
          }
        />
      ),
    },
    {
      dataIndex: "forPurchasePrices",
      inputType: "checkbox",
      render: (value: any) => <Checkbox checked={value} />,
    },
    {
      dataIndex: "forSalesPrices",
      inputType: "checkbox",
      render: (value: any) => <Checkbox checked={value} />,
    },
  ],
};

export const trackingDimensions = {
  dataSource: "trackingDimensions",
  valueField: "trackingDimensionID",
  textField: ["trackingDimensionID", "trackingDimensionName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "trackingDimensionID",
    },
    {
      title: i18n.t("Name"),
      dataIndex: "trackingDimensionName",
    },
    { dataIndex: "description" },
  ],
};

export const trackingDimensionsDetails = {
  columns: [
    {
      dataIndex: "trackingDimensionType",
      render: i18n.t,
      editable: false,
    },
    {
      dataIndex: "active",
      inputType: "checkbox",
      render: (value: any) => <Checkbox checked={value} />,
    },
    {
      dataIndex: "forPurchasePrices",
      inputType: "checkbox",
      render: (value: any) => <Checkbox checked={value} />,
    },
    {
      dataIndex: "forSalesPrices",
      inputType: "checkbox",
      render: (value: any) => <Checkbox checked={value} />,
    },
  ],
};
