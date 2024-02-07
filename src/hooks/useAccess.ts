import { useContext } from "react";
////________________________________________________________________
import { accessContext } from "~/services/context/access";
////________________________________________________________________
interface accessProps {
  name: string;
  type: "read" | "update" | "create" | "delete";
}

export const useAccess = () => {
  const context: any = useContext(accessContext) || {};

  const privileges: any[] = context.privileges;
  ////________________________________________________________________
  const hasAccess = (props: accessProps) => {
    if (context?.admin || !context || !privileges) return true;

    const name = props.name?.toString();
    const data = privileges.filter((e: any) => e.privilegeID === name);

    const isDenied = data.find((e: any) => e[props.type] === "Denied");
    if (isDenied) return false;

    const granted = data.find((e: any) => e[props.type] === "Granted");
    return granted ? granted[props.type] : undefined;
  };
  ////________________________________________________________________
  return { hasAccess };
};
