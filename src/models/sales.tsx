import { Badge } from "~/library/components";

import dayjs from "dayjs";

import i18n from "~/i18n";
import { isEmpty } from "~/library/utils";

const badgeStatus = (text: string) =>
  text === "Under Review" || text === "Confirmed" || text === "Shipped"
    ? "processing"
    : text === "Approved" || text === "Delivered" || text === "Posted"
    ? "success"
    : text === "Rejected"
    ? "error"
    : text === "Canceled"
    ? "warning"
    : "default";

export const dailySales = {
  dataSource: "dailySales",
  valueField: "salesID",
  textField: ["salesID"],
  columns: [
    {
      dataIndex: "salesID",
      fixed: "left",
    },
    {
      dataIndex: "salesDate",
      render: (value: any) => value && dayjs(value).format("YYYY/MM/DD"),
    },
    {
      dataIndex: "entityID",
    },
    {
      title: i18n.t("entityName"),
      dataIndex: ["entity", "entityName"],
    },
    {
      dataIndex: "approvalStatus",
      render: (text: string) => (
        <Badge status={badgeStatus(text)} text={i18n.t(text)} />
      ),
    },
    {
      dataIndex: "posted",
      inputType: "selectFixed",
      inputSource: "bool",
      render: i18n.t,
    },
    {
      dataIndex: "createdBy",
    },
    {
      dataIndex: "createdOn",
      render: (value: any) => value && dayjs(value).format("YYYY/MM/DD"),
    },
  ],
};

export const customers = {
  dataSource: "customers",
  valueField: "customerID",
  textField: ["customerID", "customerName"],
  link: "/sales/customersList",
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "customerID",
      required: true,
      autoFocus: true,
      readOnly: (row: any) => !isEmpty(row.productCategoryID),
      fixed: "left",
      dropdown: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "customerName",
      dropdown: true,
    },
    {
      dataIndex: "hold",
      render: i18n.t,
    },
    {
      dataIndex: "customerGroupID",
    },
    {
      title: i18n.t("customerGroup"),
      dataIndex: ["customerGroup", "customerGroupName"],
    },
    { dataIndex: "address" },
    { dataIndex: "location" },
    { dataIndex: "contact" },
    { dataIndex: "phone" },
    { dataIndex: "email" },
    {
      dataIndex: "description",
    },
  ],
};

export const customersGroups = {
  dataSource: "customersGroups",
  valueField: "customerGroupID",
  textField: ["customerGroupID", "customerGroupName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "customerGroupID",
      required: true,
      autoFocus: true,
      readOnly: (row: any) => !isEmpty(row.customerGroupID),
      fixed: "left",
      dropdown: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "customerGroupName",
      autoFocus: true,
      dropdown: true,
    },
    {
      dataIndex: "description",
    },
  ],
};

export const salesPersons = {
  dataSource: "salesPersons",
  valueField: "salesPersonID",
  textField: ["salesPersonID", "salesPersonName"],
  link: "sales/salesPersonsList",
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "salesPersonID",
      fixed: "left",
      dropdown: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "salesPersonName",
      dropdown: true,
    },
    {
      dataIndex: "userID",
    },
    {
      dataIndex: "description",
    },
  ],
};

export const salesOrder = {
  dataSource: "salesOrder",
  valueField: "orderID",
  columns: [
    {
      dataIndex: "orderID",
    },
    {
      dataIndex: "orderDate",
      inputType: "date",
      render: (value: any) => value && dayjs(value).format("YYYY/MM/DD"),
    },
    { dataIndex: "customerID" },
    { title: i18n.t("customerName"), dataIndex: ["customer", "customerName"] },
    { dataIndex: "project" },
    {
      dataIndex: "orderStatus",
      render: (text: string) => (
        <Badge status={badgeStatus(text)} text={i18n.t(text)} />
      ),
    },
    { dataIndex: "salesPersonID" },
    { dataIndex: "posted", render: i18n.t },
    {
      dataIndex: "postedOn",
      render: (value: any) => value && dayjs(value).format("YYYY/MM/DD"),
    },
    { dataIndex: "description" },
  ],
};

export const salesOrderLines = {
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
    {
      dataIndex: "expireDays",
      inputType: "integer",
      required: (record: any) => record?.productStatus === "DEMO",
      readOnly: (record: any) => record?.productStatus !== "DEMO",
      defaultValue: 14,
    },
    { dataIndex: "notes" },
  ],
};

export const salesDelivery = {
  dataSource: "salesOrder",
  valueField: "deliveryID",
  columns: [
    {
      dataIndex: "deliveryID",
    },
    {
      dataIndex: "deliveryDate",
      render: (value: any) => value && dayjs(value).format("YYYY/MM/DD"),
    },
    { dataIndex: "customerID" },
    { title: i18n.t("customerName"), dataIndex: ["customer", "customerName"] },
    { dataIndex: "project" },
    {
      dataIndex: "deliveryStatus",
      render: (text: string) => (
        <Badge status={badgeStatus(text)} text={i18n.t(text)} />
      ),
    },
    { dataIndex: "posted", render: i18n.t },
    {
      dataIndex: "postedOn",
      render: (value: any) => value && dayjs(value).format("YYYY/MM/DD"),
    },
    { dataIndex: "description" },
  ],
};

export const salesDeliveryLines = {
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
    {
      dataIndex: "expireDays",
      inputType: "integer",
      required: (record: any) => record?.productStatus === "DEMO",
      readOnly: (record: any) => record?.productStatus !== "DEMO",
      defaultValue: 14,
    },
    { dataIndex: "notes" },
  ],
};

export const salesDeliveryReceive = {
  columns: [
    {
      dataIndex: "deliveryID",
    },
    {
      title: i18n.t("deliveryDate"),
      dataIndex: ["delivery", "delivery", "deliveryDate"],
      render: (value: any) => value && dayjs(value).format("YYYY/MM/DD"),
      allowSort: false,
    },
    {
      dataIndex: "productID",
    },
    {
      dataIndex: "productName",
    },
    {
      dataIndex: "model",
    },
    {
      dataIndex: "description",
    },
    {
      title: i18n.t("salesPerson"),
      dataIndex: ["salesPerson", "salesPersonName"],
    },
    {
      dataIndex: "quantity",
    },
    {
      dataIndex: "expireDate",
      render: (value: any) => value && dayjs(value).format("YYYY/MM/DD"),
    },
    {
      dataIndex: "notes",
    },
  ],
};

export const salesTax = {
  dataSource: "salesTax",
  valueField: "salesTaxID",
  textField: ["salesTaxID", "salesTaxName"],
  columns: [
    {
      dataIndex: "salesTaxID",
      dropdown: true,
    },
    {
      dataIndex: "salesTaxName",
      dropdown: true,
    },
    { dataIndex: "basedOn", render: i18n.t },
    { dataIndex: "onSalesTaxID", render: i18n.t },
    { dataIndex: "amount" },
    { dataIndex: "description" },
  ],
};

export const salesTaxBasedOn = [
  { value: "Percent Of Net Amount", label: i18n.t("Percent Of Net Amount") },
  {
    value: "Percent Of Sales Amount",
    label: i18n.t("Percent Of Sales Amount"),
  },
  {
    value: "Amount Per Unit",
    label: i18n.t("Amount Per Unit"),
  },
];

export const salesTaxGroupsDetails = {
  columns: [
    {
      dataIndex: "salesTaxID",
      inputType: "select",
      inputSource: "salesTax",
      inputFK: "salesTax",
      required: true,
      readOnly: (record: any) => record.salesTaxID,
      autoFocus: true,
    },
    {
      title: i18n.t("salesTaxName"),
      dataIndex: ["salesTax", "salesTaxName"],
      readOnly: true,
    },
  ],
};

export const salesTaxGroups = {
  dataSource: "salesTaxGroups",
  valueField: "salesTaxGroupID",
  textField: ["salesTaxGroupID", "salesTaxGroupName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "salesTaxGroupID",
      dropdown: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "salesTaxGroupName",
      dropdown: true,
    },
    { dataIndex: "description" },
  ],
};
