import { IAdd, IDelete } from "~/library/components";

const detailsList = (table: any, allowNew: any) => [
  {
    text: "New Line",
    icon: <IAdd />,
    disabled: !allowNew,
    onClick: () => table.handleRowAdd(),
  },
  { separator: true, hidden: !table.hasSelection },
  {
    text: "Delete",
    danger: true,
    icon: <IDelete />,
    onClick: table.handleRowsDelete,
    hidden: !table.hasSelection,
  },
];

export default detailsList;
