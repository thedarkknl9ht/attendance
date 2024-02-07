const merge = (arr1: any[], arr2: any[], key: string, sortBy?: string) => {
  const arr: Array<any> = [];
  arr1?.forEach((ele) => {
    let fields = arr2?.find((e) => e[key] === ele[key]) ?? {};
    fields = { ...ele, ...fields };
    arr.push(fields);
  });
  if (sortBy !== undefined) return sort(arr, sortBy);
  return arr;
};

const contains = (arr: Array<any>, condition: Function) =>
  arr.findIndex((e) => condition(e)) > -1;

const splice = (cols: Array<any>, col1: any, col2: any, key: string) => {
  const column1Index = cols.findIndex((e) => e[key] === col1);
  const column2Index = cols.findIndex((e) => e[key] === col2);
  const values = cols[column1Index];
  const newColumns = cols.filter((e) => e[key] !== col1);
  newColumns.splice(column2Index, 0, values);
  return newColumns;
};

const sort = (arr?: any[], key?: string) => {
  if (!arr || !key) return [];
  return arr.sort((p1, p2) => {
    let comparison = 0;

    if (p1[key] > p2[key]) {
      comparison = 1;
    } else if (p1[key] < p2[key]) {
      comparison = -1;
    }
    return comparison;
  });
};

const sum = (
  arr: any[],
  key: string,
  defaultValue?: any,
  filter?: Function
) => {
  const sum = arr
    .filter((e) => !filter || filter(e))
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue[key];
    }, 0);

  return !isNaN(sum) ? sum : defaultValue;
};

const newKey = (arr: any[], key: string) => {
  arr = arr.sort((a, b) => b[key] - a[key]);
  return arr.length === 0 ? 1 : Number(arr[0][key]) + 1;
};

const array = { merge, contains, splice, sort, sum, newKey };

export { array };
