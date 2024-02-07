import React from "react";

import { Button, Divider, Space, theme, Tooltip } from "antd";

import { Dropdown } from "~/library/components";

import { IDots, IPin, IManage } from "~/components/ui/icons";

import { useViews, useAuth, useToggle, useAccess } from "~/library/hooks";

import i18n from "~/i18n";

import Create from "./core/create";
import Manage from "./core/manage";

const { useToken } = theme;

const PageViews = () => {
  const { token } = useToken();

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    minWidth: 150,
  };
  const menuStyle = {
    boxShadow: "none",
    maxHeight: "200px",
    overflow: "auto",
  };

  const userID = useAuth()?.auth?.userID;

  const { hasAccess } = useAccess();

  const createToggle = useToggle();
  const manageToggle = useToggle();

  const { views, activeView, activateView, update, pin, hasChanges } =
    useViews() || {};

  const handleItemClick = (view: any) => {
    activateView(view);
  };

  const getMenu = () => {
    const items = [
      {
        key: "1",
        type: "group",
        label: i18n.t("Global"),
        children: views
          ?.filter((e) => e.viewStatus === "Shared")
          .map((element) => ({
            key: element.viewID + element.userID,
            label: element.viewID,
            icon: element.isDefault ? <IPin /> : null,
            onClick: () => handleItemClick(element),
          })),
      },
    ];

    const personalViews = views?.filter((e) => e.viewStatus === "Personal");
    if (personalViews?.length > 0)
      items.push({
        key: "2",
        type: "group",
        label: i18n.t("Personal"),
        children: personalViews.map((element) => ({
          key: element.viewID + element.userID,
          label: element.viewID,
          icon: element.isDefault ? <IPin /> : null,
          onClick: () => handleItemClick(element),
        })),
      });

    return {
      items,
      selectable: true,
      selectedKeys: [activeView?.viewID + activeView?.userID],
    };
  };

  const getIcon = activeView?.isDefault ? <IPin /> : <IDots />;

  return (
    <React.Fragment>
      <Dropdown
        menu={getMenu()}
        trigger={["click"]}
        arrow={true}
        dropdownRender={(menu: any) => (
          <div style={contentStyle}>
            {React.cloneElement(menu, { style: menuStyle })}
            <Divider style={{ margin: 0 }} />
            <Space
              style={{ padding: "2px" }}
              size={1}
              split={<Divider type="vertical" style={{ margin: 0 }} />}
            >
              {hasAccess({ name: "views", type: "update" }) && (
                <Button
                  type="text"
                  size="small"
                  disabled={
                    !hasChanges ||
                    activeView?.userID !== userID ||
                    activeView?.standardView
                  }
                  onClick={() => update()}
                >
                  {i18n.t("Save")}
                </Button>
              )}
              {hasAccess({ name: "views", type: "create" }) && (
                <Button type="text" size="small" onClick={createToggle.show}>
                  {i18n.t("Save As")}
                </Button>
              )}
              <Tooltip title={i18n.t("set view as default view")}>
                <Button
                  type="text"
                  size="small"
                  icon={<IPin />}
                  disabled={activeView?.isDefault}
                  onClick={() => pin()}
                />
              </Tooltip>
              <Tooltip title={i18n.t("manage all views")}>
                <Button
                  type="text"
                  size="small"
                  icon={<IManage />}
                  disabled={views?.length < 2}
                  onClick={manageToggle.show}
                />
              </Tooltip>
            </Space>
          </div>
        )}
      >
        <Button icon={getIcon} type="default">
          {activeView?.viewID}
        </Button>
      </Dropdown>
      <Create toggle={createToggle} />
      <Manage toggle={manageToggle} />
    </React.Fragment>
  );
};
export default PageViews;
