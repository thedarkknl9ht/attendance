import { IExclamation } from "~/library/components";

import { useConfig } from "~/hooks/useConfig";

import Item from "../core/item";

import { iconStyle } from "../style/icon";

const Warnings = () => {
  const { header } = useConfig();

  return header.allowWarnings && <Item icon={<IExclamation style={iconStyle} />} />;
};

export default Warnings;
