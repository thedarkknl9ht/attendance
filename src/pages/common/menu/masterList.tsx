import { IAdd, IDelete, IEdit } from "~/library/components";

const masterListEdit = (table: any) => [
  {
    text: "New Record",
    icon: <IAdd />,
    access: { name: table.accessName, type: "create" },
    onClick: table.handleNewRecord,
  },
  {
    text: "Edit Record",
    icon: <IEdit />,
    onClick: () => table.handleEditRecord(),
    access: { name: table.accessName, type: "read" },
    hidden: !table.hasSelection,
  },
  { separator: true, hidden: !table.hasSelection },
  {
    text: "Delete",
    danger: true,
    icon: <IDelete />,
    access: { name: table.accessName, type: "delete" },
    confirm: "Sure to Delete Selected Records",
    onConfirm: table.handleDeleteRecord,
    hidden: !table.hasSelection,
  },
];

export default masterListEdit;
