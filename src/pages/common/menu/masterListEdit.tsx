import { IAdd, IDelete, IRevert, ISave } from "~/library/components";

const masterListEdit = (table: any) => [
  {
    text: "New Record",
    icon: <IAdd />,
    access: { name: table.accessName, type: "create" },
    accessType: "create",
    onClick: () => table.handleRowAdd(),
  },
  {
    text: "Save Data",
    icon: <ISave />,
    access: { name: table.accessName, type: "update" },
    onClick: () => table.handleSubmit(),
    hidden: !table.hasChanges,
  },
  { separator: true, hidden: !table.hasSelection },
  {
    text: "Delete",
    danger: true,
    icon: <IDelete />,
    access: { name: table.accessName, type: "delete" },
    confirm: "Sure to Delete Selected Records",
    onConfirm: table.handleRowsDelete,
    hidden: !table.hasSelection,
  },
  { separator: true, hidden: !table.hasChanges },
  {
    text: "Reset",
    type: "text",
    icon: <IRevert />,
    confirm: "Sure to Revert Changes",
    onConfirm: () => table.resetData(),
    hidden: !table.hasChanges,
  },
];

export default masterListEdit;
