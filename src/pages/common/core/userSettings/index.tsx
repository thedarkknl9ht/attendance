import {
  EditingKeyProvider,  
  WorkflowProvider,
  ViewsProvider,
} from "~/library/services";

import Entry from "./entry";

const name = "usersSettingsList";
const dataSource = "users";
const keyField = "userID";

const DailySales = ({ breadcrumb }: { breadcrumb?: any[] }) => {
  return (
    <EditingKeyProvider>
      <ViewsProvider name={name} type="form">
        <WorkflowProvider origin={dataSource} keyField={keyField}>
          <Entry
            name={name}
            dataSource={dataSource}
            keyField={keyField}
            breadcrumb={breadcrumb}
          />
        </WorkflowProvider>
      </ViewsProvider>
    </EditingKeyProvider>
  );
};

export default DailySales;
