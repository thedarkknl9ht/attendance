import { createContext, ReactNode, useEffect, useState } from "react";

import { ConfigProvider as _ConfigProvider, App } from "antd";
////________________________________________________________________
import config from "~/project/config/config.json";

import header from "~/project/config/header.json";

import report from "~/project/config/report.json";
import { useAuth } from "~/hooks/useAuth";
////________________________________________________________________
const configContext = createContext({});
////________________________________________________________________
const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const { auth } = useAuth() || {};

  const [menuStatus, setMenuStatus] = useState<string | null>(
    localStorage.getItem("appmenu")
  );
  ////________________________________________________________________
  useEffect(() => {
    document.title = config.title;
  }, []);
  ////________________________________________________________________
  return (
    <_ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: "white",
            headerPadding: "0 10px",
          },
        },
        token: { fontFamily: "Samim" },
      }}
      direction={auth?.language === "AR" ? "rtl" : "ltr"}
    >
      <App>
        <configContext.Provider
          value={{ config, header, report, menuStatus, setMenuStatus }}
        >
          {children}
        </configContext.Provider>
      </App>
    </_ConfigProvider>
  );
};
////________________________________________________________________
export { ConfigProvider, configContext };
