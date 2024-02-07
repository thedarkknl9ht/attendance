import React from "react";

import { theme, Divider } from "antd";

const { useToken } = theme;

export const DropdownRender = ({ menu, children }) => {
  const { token } = useToken();

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: "none",
    maxHeight: "200px",
    overflow: "auto",
  };
  return (
    <div style={contentStyle}>
      {React.cloneElement(menu, {
        style: menuStyle,
      })}
      <Divider
        style={{
          margin: 0,
        }}
      />
      {children}
    </div>
  );
};
