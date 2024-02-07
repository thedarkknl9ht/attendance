import React from "react";

import { Space, Popconfirm } from "antd";

import i18n from "~/i18n";

import { Button, Dropdown } from "~/library/components";

import { useAccess } from "~/library/hooks";

interface props {
  items?: any[] | false;
  size?: "large" | "small";
}

export const Toolbar = ({ items, size }: props) => {
  const { hasAccess } = useAccess() || {};

  const isDisabled = (item: any) => {
    if (item.disabled) return true;

    if (!item.access) return false;
    
    return hasAccess && !hasAccess(item.access);
  };

  return (
    <Space
      style={{
        padding: "10px 0",
        width: "100%",
      }}
      wrap
    >
      {items &&
        items
          ?.filter((e) => !e.hidden)
          .map((item, index) => (
            <React.Fragment key={index}>
              {item.confirm ? (
                <Popconfirm
                  title={i18n.t(item.confirm)}
                  onConfirm={item.onConfirm}
                  okText="Yes"
                >
                  <div>
                    <Button
                      type={item.type}
                      danger={item.danger}
                      icon={item.icon}
                      size={size}
                      disabled={isDisabled(item)}
                    >
                      {i18n.t(item.text)}
                    </Button>
                  </div>
                </Popconfirm>
              ) : item.separator ? (
                <span hidden={item.hidden}>-</span>
              ) : item.children ? (
                <Dropdown menu={{ items: item.children }} trigger={["click"]}>
                  <Button
                    type={item.type}
                    danger={item.danger}
                    icon={item.icon}
                    size={size}
                    disabled={isDisabled(item)}
                    onClick={item.onClick}
                  >
                    {i18n.t(item.text)}
                  </Button>
                </Dropdown>
              ) : (
                <Button
                  type={item.type}
                  danger={item.danger}
                  icon={item.icon}
                  size={size}
                  disabled={isDisabled(item)}
                  onClick={item.onClick}
                >
                  {i18n.t(item.text)}
                </Button>
              )}
            </React.Fragment>
          ))}
    </Space>
  );
};
