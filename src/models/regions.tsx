import i18n from "~/i18n";
import { Checkbox } from "~/library/components";

import { isEmpty } from "~/utils/helpers";

export const countries = {
  dataSource: "countries",
  valueField: "countryID",
  textField: ["countryID", "countryName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "countryID",
      required: true,
      autoFocus: true,
      readOnly: (row: any) => !isEmpty(row.countryID),
      fixed: "left",
      dropdown: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "countryName",
      required: true,
      autoFocus: true,
      dropdown: true,
    },
    {
      dataIndex: "timeZone",
      inputType: "selectFixed",
      inputSource: "timeZone",
      required: true,
    },
    { dataIndex: "description" },
  ],
};

export const timeZone = [
  { value: "GMT (UTC+00:00)", label: "GMT (UTC+00:00)", time: 0 },
  { value: "Cairo (UTC+02:00)", label: "Cairo (UTC+02:00)", time: 2 },
  {
    value: "Kuwait, Riyadh (UTC+03:00)",
    label: "Kuwait, Riyadh (UTC+03:00)",
    time: 3,
  },
];

export const states = {
  dataSource: "states",
  valueField: "stateID",
  textField: ["stateID", "stateName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "stateID",
      fixed: "left",
      dropdown: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "stateName",
      dropdown: true,
    },
    {
      dataIndex: "countryID",
      dropdown: true,
    },
    {
      title: i18n.t("countryName"),
      dataIndex: ["country", "countryName"],
      dropdown: true,
    },
    { dataIndex: "description" },
  ],
};

export const cities = {
  dataSource: "cities",
  valueField: "cityID",
  textField: ["cityID", "cityName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "cityID",
      dropdown: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "cityName",
      dropdown: true,
    },
    {
      dataIndex: "stateID",
    },
    {
      title: i18n.t("stateName"),
      dataIndex: ["state", "stateName"],
    },
    { dataIndex: "description" },
  ],
};

export const addressesContactsPurposes = {
  dataSource: "addressesContactsPurposes",
  valueField: "purposeID",
  textField: ["purposeID", "purposeName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "purposeID",
      dropdown: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "purposeName",
      dropdown: true,
    },
    {
      dataIndex: "postalAddress",
    },
    {
      dataIndex: "contactInformation",
    },
    { dataIndex: "description" },
  ],
};

export const addresses = {
  columns: [
    {
      dataIndex: "addressID",
      readOnly: (record: any) => record.addressID,
      required: true,
      autoFocus: true,
    },
    {
      dataIndex: "addressName",
      required: true,
      autoFocus: true,
    },
    {
      dataIndex: "purposeID",
      inputType: "select",
      inputSource: "addressesContactsPurposes",
      inputFK: "purpose",
      required: true,
    },
    {
      title: i18n.t("purposeName"),
      dataIndex: ["purpose", "purposeName"],
      readOnly: true,
    },
    {
      dataIndex: "district",
    },
    {
      dataIndex: "street",
    },
    {
      dataIndex: "building",
      hidden: true,
    },
    {
      dataIndex: "apartment",
      hidden: true,
    },
    {
      dataIndex: "zipCode",
      hidden: true,
    },
    {
      dataIndex: "countryID",
      inputType: "select",
      inputSource: "countries",
      inputFK: "country",
      onChange: () => ({
        stateID: null,
        state: null,
        cityID: null,
        city: null,
      }),
    },
    {
      title: i18n.t("countryName"),
      dataIndex: ["country", "countryName"],
      readOnly: true,
    },
    {
      dataIndex: "stateID",
      inputType: "select",
      inputSource: "states",
      inputFK: "state",
      filter: (record: any) => [
        {
          propertyName: "countryID",
          operation: 0,
          value: record.countryID ?? "",
        },
      ],
      onChange: () => ({ cityID: null, city: null }),
    },
    {
      title: i18n.t("stateName"),
      dataIndex: ["state", "stateName"],
      readOnly: true,
    },
    {
      dataIndex: "cityID",
      inputType: "select",
      inputSource: "cities",
      inputFK: "city",
      filter: (record: any) => [
        { propertyName: "stateID", operation: 0, value: record.stateID ?? "" },
      ],
    },
    {
      title: i18n.t("cityName"),
      dataIndex: ["city", "cityName"],
      readOnly: true,
    },
    { dataIndex: "location", hidden: true },
    {
      dataIndex: "primary",
      inputType: "checkbox",
      render: (value: any) => <Checkbox checked={value} />,
    },
  ],
};

export const contacts = {
  columns: [
    {
      dataIndex: "contactID",
      readOnly: (record: any) => record.contactID,
      autoFocus: true,
      required: true,
    },
    {
      dataIndex: "contactName",
      autoFocus: true,
      required: true,
    },
    {
      dataIndex: "contactType",
      inputType: "selectFixed",
      inputSource: "contactType",
      defaultValue: "Phone",
      required: true,
    },
    {
      dataIndex: "contactNumberAddress",
    },
    {
      dataIndex: "extension",
    },
    {
      dataIndex: "primary",
      inputType: "checkbox",
      render: (value: any) => <Checkbox checked={value} />,
    },
  ],
};

export const contactType = [
  { value: "Email", label: i18n.t("Email") },
  { value: "Phone", label: i18n.t("Phone") },
  { value: "Url", label: i18n.t("Url") },
  { value: "Telex", label: i18n.t("Telex") },
  { value: "Fax", label: i18n.t("Fax") },
  { value: "Facebook", label: i18n.t("Facebook") },
  { value: "Twitter", label: i18n.t("Twitter") },
  { value: "LinkedKIn", label: i18n.t("LinkedKIn") },
];
