import { Layout, Menu } from "antd";

import { useNavigate } from "react-router-dom";

import { useAccess, useAuth, useConfig } from "~/library/hooks";

import { modules, privileges } from "~/project/data/privileges";

import i18n from "~/i18n";

import {
  Button,
  Divider,
  IFavourite,
  IToggle,
  IUnLock,
  Space,
} from "~/library/components";

const { Sider: Control } = Layout;

const Sider = () => {
  const navigate = useNavigate();

  const { auth } = useAuth();

  const { menuStatus, setMenuStatus } = useConfig();

  const { hasAccess } = useAccess();

  const getItems = (data?: any[], itemKey?: string) => {
    let items: any = [];

    if (data !== undefined)
      data.forEach((item: any) =>
        items.push({
          key: item.key.toString(),
          icon: item.icon,
          label: i18n.t(item.label ?? item.key.toString()),
          children: getItems(item.children, item.key.toString()),
          hidden: hasAccess({ name: item.key, type: "read" }) === false,
        })
      );

    if (itemKey !== undefined)
      privileges
        .filter((e: any) => e.path?.toString() === itemKey)
        .map((item: any) =>
          items.push({
            key: item.privilegeID,
            icon: item.icon,
            label: item.label,
            hidden:
              hasAccess({ name: item.privilegeID, type: "read" }) === false,
            onClick: () => navigate(item.value),
          })
        );

    return items;
  };

  const getFavourites = () => {
    let items: any = [];
    if (auth?.favourites?.length > 0)
      auth?.favourites?.map((item: any) =>
        items.push({
          key: "Fav-" + item.pageID,
          label: item.pageTitle,
          hidden: hasAccess({ name: item.pageTitle, type: "read" }) === false,
          onClick: () => {
            if (item.pageLinkType === "New Tab")
              window.open(item.pageLink, "_blank");
            else navigate(item.pageLink);
          },
        })
      );
    else return null;

    return items;
  };

  const getSelectedKey = () => {
    let selectedKey = privileges.find(
      (ele: any) => ele.value === window.location.pathname
    )?.privilegeID;
    if (selectedKey) return [selectedKey, "Fav-" + selectedKey];
  };

  const handleUnlockMenu = (e: any) => {
    e.stopPropagation();
    localStorage.removeItem("appmenu");
    setMenuStatus(null);
  };

  const handleCollapse = (value: boolean) => {
    let status = value ? "collapsed" : "locked";
    localStorage.setItem("appmenu", status);
    setMenuStatus(status);
  };

  return (
    menuStatus !== null && (
      <Control
        breakpoint="md"
        width={250}
        theme="light"
        trigger={
          <Space split={<Divider type="vertical" />}>
            <Button
              type="text"
              icon={<IToggle style={{ color: "rgb(200,200,200)" }} />}
            />
            {menuStatus === "locked" && (
              <Button
                type="text"
                icon={<IUnLock style={{ color: "rgb(200,200,200)" }} />}
                onClick={handleUnlockMenu}
              />
            )}
          </Space>
        }
        style={{ paddingBottom: 80 }}
        defaultCollapsed={menuStatus === "collapsed"}
        collapsedWidth={50}
        onCollapse={handleCollapse}
        collapsible
      >
        <Menu
          mode="inline"
          style={{ height: "100%", borderInlineEnd: 0 }}
          items={[
            {
              key: "Favourites",
              icon: <IFavourite />,
              label: i18n.t("Favourites"),
              children: getFavourites(),
            },
            ...getItems(modules),
          ]}
          selectedKeys={getSelectedKey()}
          defaultOpenKeys={getSelectedKey()}
        />
      </Control>
    )
  );
};
export default Sider;
