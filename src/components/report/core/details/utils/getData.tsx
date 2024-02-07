import { getRowValue } from "~/library/utils";

const getData = (data: any[], columns: any[]) => {
  const groupByColumns = columns.filter((e) => e.groupBy);
  if (groupByColumns.length > 0)
    return data.filter((item: any, i: number, arr: any[]) => {
      for (let j = 0; j < groupByColumns.length; j++) {
        const dataIndex = groupByColumns[j].dataIndex;
        const index: number = arr.findIndex(
          (ele: any) =>
            getRowValue(ele, dataIndex) === getRowValue(item, dataIndex)
        );
        if (index !== i) return false;
      }
      return true;
    });

  return data;
};

export default getData;
