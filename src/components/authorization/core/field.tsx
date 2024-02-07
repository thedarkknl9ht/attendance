import React from "react";

import { Input } from "~/library/components";

import { useAccess } from "~/library/hooks";

const Field = ({ children, ...props }: any) => {
  const { hasAccess } = useAccess();

  const getAccess =
    hasAccess({ name: props.id, type: "read" }) === false
      ? "hidden"
      : hasAccess({ name: props.id, type: "update" }) === false
      ? "readOnly"
      : null;

  return getAccess === "hidden" ? (
    <Input.Password {...props} iconRender={() => null} readOnly />
  ) : getAccess === "readOnly" ? (
    React.cloneElement(children, { ...props, disabled: true })
  ) : (
    React.cloneElement(children, props)
  );
};

export default Field;
