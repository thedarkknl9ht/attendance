import React from "react";

import { Outlet } from "react-router-dom";

import { Layout, theme } from "antd";

import Sider from "./core/sider";

import Header from "./core/header";

const MainLayout = () => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Layout>
          <Sider />
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
