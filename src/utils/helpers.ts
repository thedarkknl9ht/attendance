export const isEmpty = (text: undefined | null | number | string) =>
  text !== 0 && (text === null || text === undefined || text === "");

export const getRowValue = (
  row: any,
  dataIndex: string | string[],
  render?: Function,
  defaultValue: any | null = null
) => {
  let value: any = defaultValue;
  if (Array.isArray(dataIndex)) {
    value = row;
    dataIndex.forEach((item) => {
      value = isEmpty(value) ? null : value[item];
    });
  } else value = row[dataIndex];

  if (render) return render(value, row);
  else return value;
};

const getToday = () => {
  let d = new Date();
  d.setHours(12, 0, 0, 0);
  return d;
};

export const today = getToday();
