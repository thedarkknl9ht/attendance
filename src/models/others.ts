import i18n from "~/i18n";

export const bool = [
  { value: true, label: i18n.t("Yes") },
  { value: false, label: i18n.t("No") },
];

export const yesno = [
  { value: "Yes", label: i18n.t("Yes") },
  { value: "No", label: i18n.t("No") },
];

export const numberSequences = {
  dataSource: "numberSequences",
  valueField: "numberSequenceID",
  textField: ["numberSequenceID", "numberSequenceName"],
  columns: [
    {
      title: i18n.t("Code"),
      dataIndex: "numberSequenceID",
      dropdown: true,
    },
    {
      title: i18n.t("Name"),
      dataIndex: "numberSequenceName",
      dropdown: true,
    },
    {
      dataIndex: "next",
    },
    {
      dataIndex: "format",
    },
    { dataIndex: "description" },
  ],
};

export const numberSequencesDetails = {
  columns: [
    {
      dataIndex: "segment",
      inputType: "selectFixed",
      inputSource: "segment",
      required: true,
      autoFocus: true,
      defaultValue: "Company",
      onChange: (value: any) => value && { value: null, length: 0 },
      render: i18n.t,
    },
    {
      dataIndex: "value",
      readOnly: (record: any) => record.segment === "Company",
      required: (record: any) => record.segment !== "Company",
      onChange: ({ value, record }: any) => {
        if (record.segment === "Alphanumeric")
          if (value.replaceAll("#", "").length > 0)
            return { value: null, length: 0 };
        return { length: value.length };
      },
    },
    {
      dataIndex: "length",
      readOnly: true,
      defaultValue: 0,
    },
  ],
};

export const segment = [
  { value: "Company", label: i18n.t("Company") },
  { value: "Constant", label: i18n.t("Constant") },
  { value: "Alphanumeric", label: i18n.t("Alphanumeric") },
];
