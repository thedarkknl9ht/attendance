import { useAccess } from "~/library/hooks";

import NotAuthorized from "~/pages/errors/notAuthorized";

import Field from "./core/field";
import Item from "./core/item";

interface authoirzationProps {
  name: string;
  type?: "read" | "update" | "create" | "delete" | undefined;
  children: React.ReactNode;
}

export const Authorization = ({ name, type, children }: authoirzationProps) => {
  const { hasAccess } = useAccess() || {};

  if (name === undefined) return children;

  if (hasAccess && hasAccess({ name, type: type ?? "read" })) return children;

  return <NotAuthorized />;
};

Authorization.Field = Field;
Authorization.Item = Item;