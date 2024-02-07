import { Button } from "~/library/components";

import i18n from "~/i18n";

interface props {
  text?: string;
  type?: "text" | "primary";
  icon?: React.ReactNode;
  hidden?: boolean;
  onClick?: Function;
}

const Item = ({ text, type, icon, hidden, onClick }: props) => (
  <Button
    type={type ?? "text"}
    icon={icon}
    size={text ? "large" : "small"}
    style={{ padding: text ? null : "3px 1px" }}
    hidden={hidden}
    onClick={onClick}
  >
    {i18n.t(text ?? "")}
  </Button>
);

export default Item;
