import { Alert as _Alert } from "antd";

import i18n from "~/i18n";

export const Alert = ({ message, type }: any) => (
  <_Alert message={i18n.t(message)} type={type} showIcon />
);
