import React from "react";

import { isEmpty } from "~/utils/helpers";

import { useReport, useToggle, useViews } from "~/library/hooks";

import Personalize from "./personalize";

interface itemProps {
  name?: string | string[];
  type?: "text" | "label";
  dataType?: "string" | "boolean" | "number" | "date";
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Item = (props: itemProps) => {
  const toggle = useToggle();

  const { personalization } = useReport();

  const { getItemOptions } = useViews() || {};

  const options: any = getItemOptions(props.name);

  return (
    <React.Fragment>
      <div
        className="report-item"
        style={{ ...options?.style, ...props.style }}
        onClick={personalization ? toggle.show:undefined}
      >
        <span>{options.prefix}</span>
        {isEmpty(options.label) ? props.children : options.label}
        <span>{options.suffix}</span>
      </div>
      {props.name && props.type && personalization && (
        <Personalize
          name={props.name?.toString()}
          type={props.type}
          dataType={props.dataType}
          toggle={toggle}
        />
      )}
    </React.Fragment>
  );
};

export default Item;
