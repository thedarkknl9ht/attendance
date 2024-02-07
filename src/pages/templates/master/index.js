import { ViewsProvider } from "~/services/context/views";
import { EditingKeyProvider } from "~/services/context/editingKey";

import List from "./list";
import Entry from "./entry";

const name = "unitsList";
const dataSource = "units";
const keyField = "unitID";

const Master = ({ breadcrumb }) => {
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

export default Master;
