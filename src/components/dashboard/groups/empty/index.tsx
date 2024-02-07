import { Empty as _Empty } from "~/library/components";

import i18n from "~/i18n";

const Empty = ({ onLinkClick }: any) => (
  <_Empty>
    {i18n.t("This group is empty - ")}
    <a onClick={onLinkClick}>{i18n.t("Add New Widget")}</a>
  </_Empty>
);

export default Empty;
