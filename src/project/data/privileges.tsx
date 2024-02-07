import i18n from "~/i18n";

export const modules = [
 
];

export const generalPrivileges = [
  {
    privilegeID: "dashboard",
    label: i18n.t("dashboard"),
    resourceType: "Page",
  },
  {
    privilegeID: "views",
    label: i18n.t("views"),
    resourceType: "Page",
  },
  {
    privilegeID: "table,Filter",
    label: i18n.t("filter"),
    resourceType: "Table",
  },
  {
    privilegeID: "table,Customization",
    label: i18n.t("customization"),
    resourceType: "Table",
  },
];

export const privileges = [
  ...generalPrivileges,
  {
    privilegeID: "salesOrderList",
    label: i18n.t("salesOrderList"),
    value: "/sales/salesOrderList",
    dataView: {
      name: "salesOrderWidget",
      dataSource: "salesOrder",
      keyField: "orderID",
      filter: [{ propertyName: "orderType", operation: 0, value: "Order" }],
    },
    path: ["sales", "transactions"],
    resourceType: "Page",
  },
  {
    privilegeID: "salesOrderReadyList",
    label: i18n.t("salesOrderReadyList"),
    value: "/sales/salesOrderList?c=true",
    path: ["sales", "transactions"],
    resourceType: "Page",
  },
  {
    privilegeID: "salesOrderList,Confirm",
    label: i18n.t("salesOrderList") + "," + i18n.t("Confirm"),
    resourceType: "Action Menu",
  },
  {
    privilegeID: "salesOrderList,Post",
    label: i18n.t("salesOrderList") + "," + i18n.t("Post"),
    resourceType: "Action Menu",
  },
  {
    privilegeID: "salesRequestList",
    label: i18n.t("salesRequestList"),
    value: "/sales/salesRequestList",
    dataView: {
      name: "salesRequestWidget",
      dataSource: "salesOrder",
      keyField: "orderID",
      filter: [{ propertyName: "orderType", operation: 0, value: "Request" }],
    },
    path: ["sales", "transactions"],
    resourceType: "Page",
  },
  {
    privilegeID: "salesRequestList,Approve",
    label: i18n.t("salesRequestList") + "," + i18n.t("Confirm"),
    resourceType: "Action Menu",
  },
  {
    privilegeID: "salesRequestList,Confirm",
    label: i18n.t("salesRequestList") + "," + i18n.t("Approve"),
    resourceType: "Action Menu",
  },
  {
    privilegeID: "salesDeliveryList",
    label: i18n.t("salesDeliveryList"),
    value: "/sales/salesDeliveryList",
    dataView: {
      name: "salesDeliveryWidget",
      dataSource: "salesDelivery",
      keyField: "salesDeliveryID",
    },
    path: ["sales", "transactions"],
    resourceType: "Page",
  },
  {
    privilegeID: "salesDeliveryList,Post",
    label: i18n.t("salesDeliveryList") + "," + i18n.t("Post"),
    resourceType: "Action Menu",
  },
  {
    privilegeID: "salesDeliveryReceiveList",
    label: i18n.t("salesDeliveryReceiveList"),
    value: "/sales/salesDeliveryReceiveList",
    path: ["sales", "transactions"],
    resourceType: "Page",
  },
  {
    privilegeID: "inventoryAdjustmentList",
    label: i18n.t("inventoryAdjustmentList"),
    value: "/inventory/inventoryAdjustmentList",
    path: ["inventory", "transactions"],
    resourceType: "Page",
  },
  {
    privilegeID: "inventoryAdjustmentList,Post",
    label: i18n.t("inventoryAdjustmentList") + "," + i18n.t("Post"),
    resourceType: "Action Menu",
  },
  {
    privilegeID: "productsCategoriesList",
    label: i18n.t("productsCategoriesList"),
    value: "/inventory/productsCategoriesList",
    path: ["inventory", "cards"],
    resourceType: "Page",
  },
  {
    privilegeID: "productsList",
    label: i18n.t("productsList"),
    value: "/inventory/productsList",
    dataView: {
      name: "productsWidget",
      dataSource: "products",
      keyField: "productID",
    },
    path: ["inventory", "cards"],
    resourceType: "Page",
  },
  {
    privilegeID: "brandsList",
    label: i18n.t("brandsList"),
    value: "/inventory/brandsList",
    dataView: {
      name: "brandsWidget",
      dataSource: "brands",
      keyField: "brandID",
    },
    path: ["inventory", "cards"],
    resourceType: "Page",
  },
  {
    privilegeID: "vendorsList",
    label: i18n.t("vendorsList"),
    value: "/procurement/vendorsList",
    dataView: {
      name: "vendorsWidget",
      dataSource: "vendors",
      keyField: "vendorID",
    },
    path: ["procurement", "cards"],
    resourceType: "Page",
  },
  {
    privilegeID: "customersList",
    label: i18n.t("customersList"),
    value: "/sales/customersList",
    dataView: {
      name: "customersWidget",
      dataSource: "customers",
      keyField: "customerID",
    },
    path: ["sales", "cards"],
    resourceType: "Page",
  },
  {
    privilegeID: "customersGroupsList",
    label: i18n.t("customersGroupsList"),
    value: "/sales/customersGroupsList",
    dataView: {
      name: "customersGroupsWidget",
      dataSource: "customersGroups",
      keyField: "customerGroupID",
    },
    path: ["sales", "cards"],
    resourceType: "Page",
  },
  {
    privilegeID: "salesPersonsList",
    label: i18n.t("salesPersonsList"),
    value: "/sales/salesPersonsList",
    dataView: {
      name: "salesPersonsWidget",
      dataSource: "salesPersons",
      keyField: "salesPersonID",
    },
    path: ["sales", "cards"],
    resourceType: "Page",
  },
  {
    privilegeID: "shippingMethodsList",
    label: i18n.t("shippingMethodsList"),
    value: "/inventory/shippingMethodsList",
    path: ["inventory", "cards"],
    resourceType: "Page",
  },
  {
    privilegeID: "productsBalanceReport",
    label: i18n.t("productsBalance"),
    value: "/inventory/productsBalance",
    path: ["inventory", "reports"],
    resourceType: "Report",
  },
  {
    privilegeID: "sitesList",
    label: i18n.t("sitesList"),
    value: "/inventory/sitesList",
    path: ["inventory", "cards"],
    dataSource: "sites",
    tags: ["dataView"],
    resourceType: "Page",
  },
  {
    privilegeID: "attachmentsList",
    label: i18n.t("attachmentsList"),
    value: "/system/attachmentsList",
    path: ["system", "attachments"],
    resourceType: "Page",
  },
  {
    privilegeID: "inventory",
    label: i18n.t("inventory"),
    resourceType: "Module",
  },
  {
    privilegeID: "procurement",
    label: i18n.t("procurement"),
    resourceType: "Module",
  },
  {
    privilegeID: "sales",
    label: i18n.t("sales"),
    resourceType: "Module",
  },
];
