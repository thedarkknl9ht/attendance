import { useState, createContext, ReactNode } from "react";

import styled from "styled-components";

import { Space } from "antd";

import { isEmpty } from "~/library/utils";

import { useQuery } from "@tanstack/react-query";

import { useAccess, useAuth, useAxiosPrivate } from "~/library/hooks";

import { Button, Dropdown, IDots, IPin } from "~/library/components";

import i18n from "~/i18n";
////________________________________________________________________
const dashboardContext = createContext({});
////________________________________________________________________
const Container = styled.div({
  width: "100%",
  padding: "24px",
  "&[data-customization='true'] [data-role='group']": {
    minHeight: "200px",
    backgroundColor: "white",
    border: "1px solid whitesmoke",
  },
  "&[data-customization='true'] [data-role='customization']": {
    padding: "10px 20px 15px",
    paddingInlineEnd: 0,
  },
  "&[data-customization='false'] [data-role='customization']": {
    display: "none",
  },
});
////________________________________________________________________
const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const userID = useAuth()?.auth?.userID;

  const { hasAccess } = useAccess();
  ////________________________________________________________________
  const [customization, setCustomization] = useState(false);

  const [activeDashboard, setActiveDashboard] = useState<any>({});

  const [activeGroups, setActiveGroups] = useState<any>([]);
  ////________________________________________________________________
  const axios = useAxiosPrivate();

  const { data: dashboards, refetch: refresh } = useQuery({
    queryKey: ["Dashboard", userID],
    queryFn: () => fetchData(),
    initialData: [],
    refetchOnWindowFocus: true,
  });

  const fetchData = async () => {
    if (!isEmpty(userID))
      return await axios
        .post("dashboards", {
          form: {
            filter: [{ propertyName: "userID", operation: 0, value: userID }],
          },
        })
        .then((response: any) => {
          const dashboards = response.data.records;
          if (!activeDashboard.dashboardID) {
            const activeDashboard = dashboards.find((e: any) => e.isDefault);
            setActiveDashboard(activeDashboard ?? {});
            setActiveGroups(activeDashboard?.groups);
          } else {
            const dashboard = dashboards.find(
              (e: any) => e.dashboardID === activeDashboard.dashboardID
            );
            setActiveDashboard(dashboard ?? {});
          }

          return dashboards;
        })
        .catch(() => []);

    return [];
  };

  const getItems = () => {
    const items: any[] = [];
    dashboards.forEach((element: any) => {
      const item = {
        value: element.dashboardID,
        label: element.dashboardName,
        icon: element.isDefault && <IPin />,
      };
      items.push(item);
    });
    return items;
  };
  ////________________________________________________________________
  const onSelect = (e: any) => {
    const dashboard = dashboards.find(
      (ele: any) => ele.dashboardID === e.item.props.value
    );
    setActiveDashboard(dashboard);
    setActiveGroups(dashboard.groups);
  };
  ////________________________________________________________________
  const getIcon = activeDashboard?.isDefault ? <IPin /> : <IDots />;

  return (
    <dashboardContext.Provider
      value={{
        activeDashboard,
        activeGroups,
        customization,
        setActiveDashboard,
        setActiveGroups,
        setCustomization,
        refresh,
      }}
    >
      <Container data-customization={customization}>
        {dashboards.length > 0 && (
          <Space>
            <Dropdown
              menu={{
                items: getItems(),
                selectable: true,
                onSelect,
              }}
              trigger={["click"]}
            >
              <Button type="default" icon={getIcon}>
                {activeDashboard.dashboardName ?? i18n.t("Select Dashboard")}
              </Button>
            </Dropdown>
          </Space>
        )}
        {children}
        {hasAccess({ name: "dashboard", type: "update" }) &&
          activeDashboard.dashboardID && (
            <Button
              type={customization ? "primary" : "default"}
              onClick={() => setCustomization(!customization)}
            >
              {i18n.t("Customization")}
            </Button>
          )}
      </Container>
    </dashboardContext.Provider>
  );
};
////________________________________________________________________
export { DashboardProvider, dashboardContext };
