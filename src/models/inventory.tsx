import dayjs from "dayjs";
import i18n from "~/i18n";
import { Checkbox } from "~/library/components";

export const brands = {
  dataSource: "brands",
  valueField: "brandID",
  textField: ["brandID", "brandName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "brandID",
      dropdown: true,
      readOnly: (record: any) => record.brandID,
      autoFocus: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "brandName",
      dropdown: true,
      autoFocus: true,
    },
    { dataIndex: "description" },
  ],
};

export const sites = {
  dataSource: "sites",
  valueField: "siteID",
  textField: ["siteID", "siteName"],
  link: "/inventory/sitesList",
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "siteID",
      dropdown: true,
      readOnly: (record: any) => record.siteID,
      autoFocus: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "siteName",
      dropdown: true,
      autoFocus: true,
    },
    { dataIndex: "description" },
  ],
};

export const products = {
  dataSource: "products",
  valueField: "productID",
  textField: ["productID", "productName"],
  link: "/inventory/productsList",
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "productID",
      dropdown: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "productName",
      dropdown: true,
    },
    { dataIndex: "itemID" },
    { dataIndex: "model" },
    { dataIndex: "description" },
    { dataIndex: "productType", render: i18n.t, hidden: true },
    { dataIndex: "productStatus", render: i18n.t, hidden: true },
    { dataIndex: "tracking", render: i18n.t },
    { dataIndex: "productCategoryID" },
    {
      title: i18n.t("productCategoryName"),
      dataIndex: ["productCategory", "productCategoryName"],
    },
  ],
};

export const tracking = [
  { value: "NONE", label: i18n.t("NONE") },
  { value: "SERIAL", label: i18n.t("SERIAL") },
];

export const productStatus = [
  { value: "NONE", label: i18n.t("NONE") },
  { value: "DEMO", label: i18n.t("DEMO") },
];

export const shippingMethods = {
  dataSource: "shippingMethods",
  valueField: "shippingMethodID",
  textField: ["shippingMethodID", "shippingMethodName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "shippingMethodID",
      dropdown: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "shippingMethodName",
      dropdown: true,
    },
    { dataIndex: "address" },
    { dataIndex: "location" },
    { dataIndex: "phone" },
    { dataIndex: "description" },
  ],
};

export const vendors = {
  dataSource: "vendors",
  valueField: "vendorID",
  textField: ["vendorID", "vendorName"],
  link: "/procurement/vendorsList",
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "vendorID",
      dropdown: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "vendorName",
      dropdown: true,
    },
    { dataIndex: "address" },
    { dataIndex: "location" },
    { dataIndex: "contact" },
    { dataIndex: "phone" },
    { dataIndex: "email" },
    { dataIndex: "description" },
  ],
};

export const vendorsBrands = {
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "brandID",
      inputType: "select",
      inputSource: "brands",
      inputFK: "brand",
      readOnly: (record: any) => record.brandID,
      required: true,
      autoFocus: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: ["brand", "brandName"],
      readOnly: true,
    },
  ],
};

export const inventoryAdjustment = {
  dataSource: "inventoryAdjustments",
  valueField: "adjustmentID",
  columns: [
    {
      dataIndex: "adjustmentID",
    },
    {
      dataIndex: "adjustmentDate",
      render: (value: any) => value && dayjs(value).format("YYYY/MM/DD"),
    },
    { dataIndex: "siteID" },
    { title: i18n.t("siteName"), dataIndex: ["site", "siteName"] },
    { dataIndex: "posted", render: i18n.t },
    {
      dataIndex: "postedOn",
      render: (value: any) => value && dayjs(value).format("YYYY/MM/DD"),
    },
    { dataIndex: "description" },
  ],
};

export const productsBalanceSerials = {
  dataSource: "productsBalance",
  valueField: "serial",
  columns: [{ dataIndex: "serial" }],
};

export const inventoryAdjustmentLines = {
  columns: [
    {
      dataIndex: "productID",
      inputType: "select",
      inputSource: "products",
      inputFK: "product",
      required: true,
      autoFocus: true,
      fixed: "left",
      onChange: ({ record }: any) => ({
        quantity: record?.product?.tracking === "SERIAL" ? 1 : record?.quantity,
      }),
    },
    {
      title: i18n.t("productName"),
      dataIndex: ["product", "productName"],
    },
    {
      dataIndex: "siteID",
      inputType: "select",
      inputSource: "sites",
      required: true,
    },
    {
      dataIndex: "serial",
      inputType: "autoComplete",
      inputSource: "productsBalanceSerials",
      filter: (record: any) => [
        {
          propertyName: "productID",
          operation: 0,
          value: record.productID ?? " ",
        },
      ],
      required: (record: any) => record?.product?.tracking === "SERIAL",
    },
    {
      dataIndex: "quantity",
      inputType: "number",
      required: true,
      defaultValue: 1,
    },
    {
      dataIndex: "productStatus",
      inputType: "selectFixed",
      inputSource: "productStatus",
      defaultValue: "NONE",
      required: true,
      render: i18n.t,
    },
    { dataIndex: "notes" },
  ],
};

export const inventoryStatus = {
  dataSource: "inventoryStatus",
  valueField: "inventoryStatusID",
  textField: ["inventoryStatusID", "inventoryStatusName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "inventoryStatusID",
      dropdown: true,
      required: true,
      readOnly: (record: any) => record.inventoryStatusID,
      autoFocus: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "inventoryStatusName",
      dropdown: true,
      required: true,
      autoFocus: true,
    },
    {
      dataIndex: "blocking",
      inputType: "checkbox",
      render: (value: any) => <Checkbox checked={value} />,
    },
    { dataIndex: "description" },
  ],
};

export const inventoryOwners = {
  dataSource: "inventoryOwners",
  valueField: "inventoryOwnerID",
  textField: ["inventoryOwnerID", "inventoryOwnerName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "inventoryOwnerID",
      required: true,
      readOnly: (record: any) => record.inventoryOwnerID,
      autoFocus: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "inventoryOwnerName",
      required: true,
      autoFocus: true,
    },
    {
      dataIndex: "vendorID",
      inputType: "select",
      inputSource: "vendors",
    },
    {
      title: i18n.t("vendorName"),
      dataIndex: ["vendor", "vendorName"],
      readOnly: true,
    },
    { dataIndex: "description" },
  ],
};
