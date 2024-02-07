import { useNavigate } from "react-router-dom";

import { IUser, ILogOut, ISettings, Dropdown } from "~/library/components";

import { useMessage } from "~/hooks/useMessage";

import { useAuth } from "~/hooks/useAuth";

import { useConfig } from "~/hooks/useConfig";

import Item from "../core/item";

const User = () => {
  const navigate = useNavigate();

  const { header } = useConfig();

  const { auth, logout } = useAuth() || {};

  const message = useMessage();

  const handleLogout = () =>
    message.confirm("Sure You Want To Logout", () => logout());

  const items = [
    {
      label: "Settings",
      key: 1,
      icon: <ISettings />,
      onClick: () => navigate("/Settings"),
    },
    { label: "Logout", key: 2, icon: <ILogOut />, onClick: handleLogout },
  ];

  return (
    header.allowUser && (
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        arrow={true}
        style={{
          marginInlineStart: "10px",
          height: 50,
        }}
      >
        <Item text={auth?.userName} icon={<IUser />} />
      </Dropdown>
    )
  );
};

export default User;
