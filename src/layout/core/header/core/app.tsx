import React, { useState } from "react";

import {
  Button,
  Drawer,
  IApp,
  IFavourite,
  ILock,
  Menu,
  Space,
} from "~/library/components";

import { iconStyle } from "../style/icon";

import { modules, privileges } from "~/project/data/privileges";

import { useAccess, useAuth, useConfig, useToggle } from "~/library/hooks";

import i18n from "~/i18n";
import { useNavigate } from "react-router-dom";
import { Flex } from "antd";

const App = ({ style }: any) => {
  const toggle = useToggle();

  const { menuStatus } = useConfig();

  return (
    menuStatus === null && (
      <React.Fragment>
        <Button
          type="text"
          icon={<IApp style={iconStyle} />}
          onClick={toggle.show}
          style={style}
        />
        <AppMenu toggle={toggle} />
      </React.Fragment>
    )
  );
};

const AppMenu = ({ toggle }: any) => {
  const { hasAccess } = useAccess();

  const { setMenuStatus } = useConfig();

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const getItems = (data: any[]) => {
    let items: any[] = [];

    data.forEach((item: any) =>
      items.push({
        key: item.key.toString(),
        icon: item.icon,
        label: i18n.t(item.label ?? item.key.toString()),
        children: item.children && getItems(item.children),
        hidden: hasAccess({ name: item.key, type: "read" }) === false,
      })
    );

    return items;
  };

  const handleLockMenu = () => {
    localStorage.setItem("appmenu", "locked");
    setMenuStatus("locked");
    toggle.close();
  };

  return (
    <Drawer
      toggle={toggle}
      maskClosable={true}
      extra={
        <Button type="text" icon={<ILock />} onClick={handleLockMenu}></Button>
      }
      width={500}
      placement="right"
    >
      <Flex style={{ height: "100%", width: "100%" }}>
        <div style={{ width: 200 }}>
          <Menu
            items={[
              {
                key: "Favourites",
                icon: <IFavourite />,
                label: i18n.t("Favourites"),
              },
              ...getItems(modules),
            ]}
            selectedKeys={selectedKeys}
            mode="inline"
            style={{ height: "100%" }}
            onSelect={(ele: any) => setSelectedKeys([ele.key])}
          />
        </div>
        <div style={{ padding: 10, flexGrow: 1 }}>
          {selectedKeys[0] && (
            <AvailableLinks selectedKey={selectedKeys[0]} toggle={toggle} />
          )}
        </div>
      </Flex>
    </Drawer>
  );
};

const AvailableLinks = ({ selectedKey, toggle }: any) => {
  const { auth } = useAuth();

  const navigate = useNavigate();

  const { config } = useConfig();

  const { hasAccess } = useAccess();

  const isSelected = (item: any) => window.location.pathname === item.value;

  const handleLinkClick = (item: any) => {
    if (item.pageLinkType === "New Tab") window.open(item.value, "_blank");
    else navigate(item.value);
    toggle.close();
  };

  const getAccess = (item: any) => {
    let access = hasAccess({ name: item.privilegeID, type: "read" });
    if (access) return {};
    else return { [config.accessMethod]: true };
  };

  if (selectedKey === "Favourites")
    return (
      <Space direction="vertical" style={{ width: "100%" }}>
        {auth?.favourites?.map((ele: any) => (
          <Button
            key={ele.pageID}
            type={isSelected({ value: ele.pageLink }) ? "link" : "text"}
            onClick={() => handleLinkClick({ ...ele, value: ele.pageLink })}
            style={{ textAlign: "start" }}
            {...getAccess({ privilegeID: ele.pageID })}
            block
          >
            {ele.pageTitle}
          </Button>
        ))}
      </Space>
    );

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {privileges
        .filter((e: any) => e.path?.toString() === selectedKey)
        .map((ele: any) => (
          <Button
            key={ele.privilegeID}
            type={isSelected(ele) ? "link" : "text"}
            onClick={() => handleLinkClick(ele)}
            style={{ textAlign: "start" }}
            {...getAccess(ele)}
            block
          >
            {ele.label}
          </Button>
        ))}
    </Space>
  );
};

export default App;
