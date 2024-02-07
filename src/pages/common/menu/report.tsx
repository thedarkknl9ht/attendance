import { IExport, IPrint } from "~/library/components";

const reportMenu = (report: any) => [
  {
    text: "Print",
    type: "default",
    icon: <IPrint />,
    onClick: () => report.print,
  },
  {
    text: "Export",
    type: "default",
    icon: <IExport />,
    hidden: true,
    children: [{ label: "PDF" }, { label: "EXCEL" }, { label: "WORD" }],
  },
  { separator: true, hidden: true },
  {
    text: "Prev",
    hidden: true,
    type: "default",
  },
  {
    text: "Next",
    hidden: true,
    type: "default",
  },
];

export default reportMenu;
