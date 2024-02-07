import { IShared, IPersonal } from "~/components/ui/icons";

import i18n from "~/i18n";

interface iUserView {
  value: string;
  label: string;
  icon: JSX.Element;
}

export const viewStatus: Array<iUserView> = [
  { value: "Shared", label: i18n.t("Shared"), icon: <IShared /> },
  { value: "Personal", label: i18n.t("Personal"), icon: <IPersonal /> },
];

export const usersViews = {
  dataSource: "usersViews",
  columns: [
    { dataIndex: "viewID" },
    { dataIndex: "viewStatus", render: i18n.t },
    { dataIndex: "description" },
    { dataIndex: "isDefault", render: i18n.t },
  ],
};
