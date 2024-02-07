import { array } from "~/library/utils";

export const buildColumns = (columns: any[], getItemOptions?: Function) => {
  if (!getItemOptions) return columns;
  const newColumns: any[] = [];
  columns.forEach((element) => {
    let newElement: any = {
      ...element,
    };

    let itemOptions = getItemOptions(newElement.dataIndex);
    newElement = { ...newElement, ...itemOptions, };

    newColumns.push(newElement);
  });

  return array.sort(newColumns, "columnIndex");
};
