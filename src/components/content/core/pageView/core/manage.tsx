import { Table, Drawer, IPin, IDelete } from "~/library/components";

import { loadColumns } from "~/library/utils";

import {
  useTable,
  useAuth,
  useViews,
  useAxiosPrivate,
  useAccess,
} from "~/library/hooks";

interface props {
  toggle: any;
}

const name = "usersViewsList";
const dataSource = "usersViews";
const keyField = "viewID";

const Manage = ({ toggle }: props) => {
  const { auth } = useAuth();

  const { hasAccess } = useAccess();

  const axios = useAxiosPrivate();

  const { views, refetch, pin } = useViews();

  const columns = loadColumns(dataSource);

  const { table, register } = useTable({
    name,
    dataSource: views?.filter((e: any) => e.userID === auth?.userID),
    keyField,
    columns,
    allowPagination: false,
    allowFilter: false,
    allowSearch: false,
  });

  const items = [
    {
      text: "Set Default",
      icon: <IPin />,
      disabled: !table.hasSelection,
      onClick: () => pin(table.selectedRow),
    },
    { separator: true, hidden: !table.hasSelection },
    {
      text: "Delete",
      danger: true,
      icon: <IDelete />,
      confirm: "Sure to Delete Current Record",
      onConfirm: () =>
        axios
          .post("usersViews/delete", { form: table.selectedRow })
          .then(() => refetch()),
      hidden: !hasAccess({ name: "views", type: "delete" }),
      disabled: !table.hasSelection || table.selectedRow?.standardView,
    },
  ];

  return (
    <Drawer title="Manage Views" toggle={toggle} size="large">
      <Table {...register({ extra: items, allowSort: false })} />
    </Drawer>
  );
};

export default Manage;
