export const queryBuilder = (columns: any[], filter?: any[], getItemOptions?: Function) => {
  const cols: any = (columns ?? []).filter((e: any) => e.filtered);
  let query: any = filter ?? [];

  for (let i = 0; i < cols.length; i++) {
    let item = cols[i]
    if (getItemOptions) item = { ...item, ...getItemOptions(item.dataIndex) }
    query = [
      ...query,
      {
        propertyName: cols[i].dataIndex.toString(),
        operation: Number(cols[i].operation),
        value: cols[i].value,
      },
    ];
  }
  return query;
};
