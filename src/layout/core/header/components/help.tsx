import { IHelp } from "~/library/components";

import { useConfig } from "~/hooks/useConfig";

import Item from "../core/item";

import { iconStyle } from "../style/icon";

const Help = () => {
  const { header } = useConfig();

  return header.allowHelp && <Item icon={<IHelp style={iconStyle} />} />;
};

export default Help;
