import dayjs from "dayjs";
import i18n from "~/i18n";
////________________________________________________________________
const attachments = {
  dataSource: "attachments",
  valueField: "attachmentID",
  columns: [
    {
      dataIndex: "attachmentName",
    },
    {
      dataIndex: "attachmentType",
      render: i18n.t,
    },
    {
      dataIndex: "attached",
      render: i18n.t,
    },
    {
      dataIndex: "description",
    },
    {
      dataIndex: "notes",
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
////________________________________________________________________
const attachmentType = [
  { value: "File", label: i18n.t("File") },
  { value: "Url", label: i18n.t("Url") },
  { value: "Note", label: i18n.t("Note") },
];
////________________________________________________________________
export { attachments, attachmentType };
