import { ViewsProvider } from "~/services/context/views";
import { EditingKeyProvider } from "~/services/context/editingKey";

import List from "./list";

const name = "productsCategoriesList";
const dataSource = "productsCategories";
const keyField = "productCategoryID";

const Template = () => {
  return (
    <EditingKeyProvider>      
      <ViewsProvider name={name} type="table">
        <List
          name={name}
          dataSource={dataSource}
          keyField={keyField}
        />
      </ViewsProvider>
    </EditingKeyProvider>
  );
};

export default Template;
