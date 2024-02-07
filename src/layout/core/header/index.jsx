import React from "react";

import { Layout, Affix, Space, Flex, Divider } from "antd";

import {
  IExclamation,
  IGithub,
  IHelp,
  IManagement,
  INotify,
  IWelcome,
} from "~/library/components";

import { useConfig } from "~/hooks/useConfig";

// Core
import App from "./core/app";
import Item from "./core/item";
import Logo from "./core/logo";
// Components
import Extra from "./components/extra";
import Notifications from "./components/notifications";
import Warnings from "./components/warnings";
import User from "./components/user";
import Search from "./components/search";
import Help from "./components/help";

const { Header: Control } = Layout;

const Header = () => {
  const { header } = useConfig();

  const iconStyle = { color: "#777", fontSize: "18px" };

  return (
    <Affix offsetTop={0}>
      <Control
        className="no-print"
        style={{
          borderBottom: "1px solid rgb(240,240,240)",
          overflow: "hidden",
        }}
      >
        <Flex>
          <App iconStyle={iconStyle} style={{ marginTop: 15 }} />   
          <Divider type="vertical" style={{ marginTop: 25 }} />
          <Search />
          <div style={{ flexGrow: 1 }}>
            <Extra />
          </div>
          <Warnings />
          <Notifications />
          <Help />
          <User />
        </Flex>
      </Control>
    </Affix>
  );
};
export default Header;
