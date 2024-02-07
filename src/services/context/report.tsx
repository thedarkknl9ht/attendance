import React, { createContext, useState } from "react";

import {
  Button,
  FloatButton,
  IFilter,
  IPrint,
  IReport,
  Report,
  Segmented,
} from "~/library/components";

import i18n from "~/i18n";
import { Spin } from "antd";
////________________________________________________________________
const reportContext = createContext({});
////________________________________________________________________
interface reportProviderProps {
  data?: any;
  allowFilter?: boolean;
  children?: React.ReactNode;
  loading?: boolean;
  allowPrint?: boolean;
  allowPersonalization?: boolean;
}

const ReportProvider = (props: reportProviderProps) => {
  const [personalization, setPersonalization] = useState(false);

  const [value, setValue] = useState("Report");

  return (
    <reportContext.Provider value={{ data: props.data, personalization }}>
      <Spin spinning={props.loading}>
        {props.allowFilter && (
          <Segmented
            options={[
              { label: i18n.t("Filter"), value: "Filter", icon: <IFilter /> },
              { label: i18n.t("Report"), value: "Report", icon: <IReport /> },
            ]}
            value={value}
            onChange={setValue}
          />
        )}
        {value === "Report" && (
          <React.Fragment>
            <FloatButton
              type="primary"
              icon={<IPrint />}
              onClick={() => window.print()}
            />
            <Report>{props.children}</Report>
          </React.Fragment>
        )}
        <Button
          type={personalization ? "primary" : "default"}
          onClick={() => setPersonalization(!personalization)}
        >
          {i18n.t("Personalization")}
        </Button>
      </Spin>
    </reportContext.Provider>
  );
};
////________________________________________________________________
export { ReportProvider, reportContext };
