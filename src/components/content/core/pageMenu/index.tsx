import { Affix } from "antd";
import { useState } from "react";

import { Toolbar } from "~/library/components";

const PageMenu = ({ items }: any) => {
  const [status, setStatus] = useState<boolean | undefined>(false);

  const activeStyle: any = status
    ? {
        backgroundColor: "rgb(251, 251, 251)",
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        paddingInlineStart: "20px ",
        padding: "10px",
        borderTop: "1px solid rgb(220, 220, 220)",
      }
    : {};

  return (
    <Affix
      onChange={(affixed) => setStatus(affixed)}
      style={{ visibility: "hidden" }}
    >
      <div style={{ visibility: "visible", ...activeStyle }}>
        <Toolbar items={items} />
      </div>
    </Affix>
  );
};

export default PageMenu;
