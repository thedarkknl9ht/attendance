import { Button } from "~/library/components";

import i18n from "~/i18n";

export const dataViewSource = [
  {
    value: "salesOrderWidget",
    label: i18n.t("salesOrderList"),
    name: "salesOrderWidget",
    dataSource: "salesOrder",
    keyField: "orderID",
    filter: [{ propertyName: "orderType", operation: 0, value: "Order" }],
    link: "/sales/salesOrderList",
    columns: [
      {
        dataIndex: "orderID",
        render: (text: string) => (
          <Button.Link
            onClick={() =>
              window.open("/sales/salesOrderList?k=" + text, "_blank")
            }
          >
            {text}
          </Button.Link>
        ),
      },
    ],
  },
  {
    value: "salesRequestWidget",
    label: i18n.t("salesRequestList"),
    name: "salesOrderWidget",
    dataSource: "salesOrder",
    keyField: "orderID",
    filter: [{ propertyName: "orderType", operation: 0, value: "request" }],
    link: "/sales/salesRequestList",
    columns: [
      {
        dataIndex: "orderID",
        render: (text: string) => (
          <Button.Link
            onClick={() =>
              window.open("/sales/salesRequestList?k=" + text, "_blank")
            }
          >
            {text}
          </Button.Link>
        ),
      },
    ],
  },
  {
    value: "salesDeliveryWidget",
    label: i18n.t("salesDeliveryList"),
    name: "salesDeliveryWidget",
    dataSource: "salesDelivery",
    keyField: "deliveryID",
    link: "/sales/salesDeliveryList",
    columns: [
      {
        dataIndex: "deliveryID",
        render: (text: string) => (
          <Button.Link
            onClick={() =>
              window.open("/sales/salesDeliveryList?k=" + text, "_blank")
            }
          >
            {text}
          </Button.Link>
        ),
      },
    ],
  },
  {
    value: "salesDeliveryReceiveWidget",
    label: i18n.t("salesDeliveryReceiveList"),
    name: "salesDeliveryReceiveWidget",
    dataSource: "salesDeliveryReceive",
    keyField: "recordID",
    link: "/sales/salesDeliveryReceiveList",
  },
];
