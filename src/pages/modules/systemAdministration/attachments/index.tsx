import { useSearchParams } from "react-router-dom";

import { ViewsProvider } from "~/services/context/views";

import { EditingKeyProvider } from "~/services/context/editingKey";

import List from "~/pages/common/components/list";
import Entry from "./entry";
import NoMatch from "~/pages/errors/noMatch";

const name = "attachmentsList";
const dataSource = "attachments";
const keyField = "attachmentID";

const Attachments = ({ breadcrumb }: { breadcrumb?: any[] }) => {
  const [searchParams] = useSearchParams();

  if (!searchParams.get("p") || !searchParams.get("r"))
    return <NoMatch />;

  return (
    <EditingKeyProvider>
      <ViewsProvider name={name} type="table">
        <List
          name={name}
          dataSource={dataSource}
          keyField={keyField}
          breadcrumb={breadcrumb}
          filter={[
            {
              propertyName: "pageID",
              operation: 0,
              value: searchParams.get("p"),
            },
            {
              propertyName: "recordID",
              operation: 0,
              value: searchParams.get("r"),
            },
          ]}
        />
      </ViewsProvider>
      <ViewsProvider name={name} type="form">
        <Entry
          name={name}
          dataSource={dataSource}
          keyField={keyField}
          breadcrumb={breadcrumb}
        />
      </ViewsProvider>
    </EditingKeyProvider>
  );
};

export default Attachments;
