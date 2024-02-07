import { Toolbar } from "~/library/components";

interface toolbarItem {
  text?: string;
  disabled?: boolean;
  hidden?: boolean;
  separator?: boolean;
  icon?: React.ReactNode;
  onClick: React.MouseEventHandler;
}

export const Extra = ({ items }: { items?: toolbarItem[] }) => (
  <Toolbar items={items} size="small" />
);
