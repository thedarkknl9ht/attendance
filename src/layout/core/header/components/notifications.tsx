import { INotify, Tooltip } from "~/library/components";

import { useConfig } from "~/hooks/useConfig";

import { iconStyle } from "../style/icon";

import Item from "../core/item";

const Notifications = () => {
  const { header } = useConfig();

  return (
    header.alowNotifications && (
      <Tooltip title="show notifications">
        <Item icon={<INotify style={iconStyle} />} />
      </Tooltip>
    )
  );
};

export default Notifications;
