import { IAdd, IRevert, IDelete, ISave } from "~/library/components";

const masterForm = (form:any) => [
  {
    text: "New Record",
    icon: <IAdd />,
    disabled: !form.allowCreate,
    onClick: form.handleNewRecord,
    access: { name: form.name, type: "create" },
  },
  {
    text: "Save Data",
    icon: <ISave />,
    disabled: !form.allowSave,
    access: form.method === "Update" && {
      name: form.name,
      type: "update",
    },
    onClick: () => form.handleSubmit(),
  },
  { separator: true, hidden: form.method !== "Update" },
  {
    text: "Delete",
    danger: true,
    icon: <IDelete />,
    access: { name: form.name, type: "delete" },
    confirm: "Sure to Delete Current Record",
    onConfirm: form.hanldeDeleteRecord,
    disabled: !form.allowDelete,
    hidden: form.method !== "Update",
  },
  { separator: true, hidden: !form.hasChanges },
  {
    text: "Revert Changes",
    type: "text",
    icon: <IRevert />,
    confirm: "Sure to Revert All Changes Made",
    onConfirm: () => form.revertChanges(),
    hidden: !form.hasChanges,
  },
];

export default masterForm;
