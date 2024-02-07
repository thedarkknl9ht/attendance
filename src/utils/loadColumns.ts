import { isEmpty } from "./helpers";
////________________________________________________________________
import { inputSources } from "~/library/models";
////________________________________________________________________
export const loadColumns = (name: string, extraCols?: any[]) => {
  if (!isEmpty(name)) {
    const newColumns: any[] = [...inputSources[name].columns];
    if (extraCols !== undefined) {
      extraCols.forEach((element) => {
        const index = newColumns.findIndex(
          (e) => (e.dataIndex === element.dataIndex)
        );
        newColumns[index] = { ...newColumns[index], ...element };
      });
    }
    return newColumns;
  } else return [];
};
