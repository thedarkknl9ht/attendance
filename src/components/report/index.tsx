import React, { useEffect, useRef } from "react";

import Title from "./ui/title";
import Divider from "./ui/divider";
import Section from "./ui/section";
import Space from "./ui/space";
import Text from "./ui/text";
import Flex from "./ui/flex";

import Group from "./core/group";
import Item from "./core/item";
import Details from "./core/details";
import Descriptions from "./core/descriptions";
import PageFooter from "./core/footer";

import { useReport } from "~/library/hooks";

interface reportProps {
  allowFilter?: boolean;
  children: React.ReactNode;
}

import "./assets/report.css";

export const Report = ({ children }: reportProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const { personalization } = useReport();

  useEffect(() => {
    const element: any = document.getElementById("printable-area");

    if (element !== null)
      element.innerHTML = ref?.current && ref.current?.innerHTML;
  }, [children]);

  return (
    <div className="report-wrapper" data-personalization={personalization}>
      <div ref={ref} className="report-content">
        {children}
      </div>
    </div>
  );
};

Report.Title = Title;
Report.Item = Item;
Report.Group = Group;
Report.Divider = Divider;
Report.Section = Section;
Report.Details = Details;
Report.Space = Space;
Report.Flex = Flex;
Report.Text = Text;
Report.Descriptions = Descriptions;
Report.PageFooter = PageFooter;

export { Item };
