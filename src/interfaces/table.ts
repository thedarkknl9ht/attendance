export interface sorter {
  field?: string;
  order?: string;
}

export interface pagination {
  pageSize?: number;
  pageNo?: number;
  count?: number;
  hidden?: boolean;
}

export interface changeParams {
  search?: string;
  pagination?: pagination;
  sorter?: sorter;
}

export interface column {
  title?: string;
  dataIndex: string;
  onChange?: any;
}

export interface filter {
  key: number;
  propertyName: string | string[];
  operation: string | number;
  value: string;
  optional?: boolean;
}
