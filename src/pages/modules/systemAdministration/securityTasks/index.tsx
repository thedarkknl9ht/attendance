import { ViewsProvider } from "~/services/context/views";

import { EditingKeyProvider } from "~/services/context/editingKey";

import List from "~/pages/common/components/list";
import Entry from "./entry";

const name = "securityTasksList";
const dataSource = "securityTasks";
const keyField = "securityTaskID";

const SecurityTasks = ({ breadcrumb }: { breadcrumb?: any[] }) => {
  return (
    <EditingKeyProvider>
      <ViewsProvider name={name} type="table">
        <List
          name={name}
          dataSource={dataSource}
          keyField={keyField}
          breadcrumb={breadcrumb}
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

export default SecurityTasks;
