export const mergedColumns = (columns: any[]) => {
  return columns
    .filter((e) => e.visible !== false)
    .map((col) => {
      return {
        ...col,
        onHeaderCell: () => ({
          title: col.title,
          dataIndex: col.dataIndex,
        }),
        onCell: (record: any) => ({
          record,
          dataIndex: col.dataIndex,
        }),
      };
    });
};
