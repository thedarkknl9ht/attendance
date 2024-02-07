import { useAccess } from "~/library/hooks";

const Item = ({ children, ...props }: any) => {
  const { hasAccess } = useAccess();

  return hasAccess({ name: props.id, type: "read" }) ? children : null;
};

export default Item;
