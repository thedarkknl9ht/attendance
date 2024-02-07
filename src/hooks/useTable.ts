/**
 * * Use Table Hook
 * ? Fetch Data - Master Details
 * ? Sorting - Pagination - Filter - Search
 */

import { useState } from "react";

import { Form } from "antd";

import { array } from "~/library/utils";

import {
  useMessage,
  useEditingKey,
  useAxiosPrivate,
  useViews,
} from "~/library/hooks";

import { useQuery } from "@tanstack/react-query";
////________________________________________________________________
import { sorter, pagination, changeParams } from "~/library/interfaces";
import { buildColumns } from "~/components/table/utils/build";

interface props {
  name: string;
  columns: any[];
  dataSource: string | any[];
  keyField: string;
  master?: any;
  autoKey?: boolean;
  initialFilter?: any[];
  customFilter?: Function;
  handleDataChange?: Function;
  newRowPosition?: string;
  initialValues?: any;
  allowFilter?: boolean;
  allowSort?: boolean;
  allowPagination?: boolean;
  allowEdit?: boolean;
  allowSearch?: boolean;
  rowSelection?: "multiple" | "single" | "none";
}

export const useTable = (props: props) => {
  const axios = useAxiosPrivate();

  const message = useMessage();
  ////______________________________________________________________
  // All Properties
  const {
    name,
    dataSource,
    keyField,
    master,
    autoKey,
    newRowPosition,
    customFilter,
    initialFilter,
  } = props;
  ////______________________________________________________________
  const {
    activeView,
    activeViewOptions,
    getItemOptions,
    viewsLoaded,
    handleViewChange,
  } = useViews() || {};
  ////______________________________________________________________
  const allowFilter =
    handleViewChange && (props.allowFilter ?? !master ? true : false);
  const allowCustomization = true;
  const allowSort = props.allowSort ?? !master ? true : false;
  const allowEdit = props.allowEdit ?? master ? true : false;
  const allowSearch = props.allowSearch ?? !master ? true : false;
  const allowPagination =
    props.allowPagination !== false && !master ? true : false;
  const rowSelection = props.rowSelection
    ? props.rowSelection
    : allowEdit
    ? "multiple"
    : "single";

  ////______________________________________________________________
  const [data, setData] = useState<any[]>([]);

  const updatedData = data?.filter((e: any) => e.status !== "edit");

  const [count, setCount] = useState(0);
  ////______________________________________________________________
  const [selectedRowKeys, setSelctedRowKeys] = useState<any[]>([]);

  const { editingKey, setEditingKey, isEditing } = useEditingKey() || {};

  const [editingRowKey, setEditingRowKey] = useState<any>(null);

  const [editingRow, setEditingRow] = useState<any>({});

  const [hasChanges, setHasChanges] = useState(false);

  const selectedRow =
    selectedRowKeys.length > 0
      ? data.find((e) => e[keyField] === selectedRowKeys[0])
      : undefined;
  ////______________________________________________________________
  const [pagination, setPagination] = useState<pagination>({
    pageSize: 20,
    pageNo: 1,
  });

  const [sorter, setSorter] = useState<sorter>({});

  const [search, setSearch] = useState("");
  ////______________________________________________________________
  const [columns, setColumns] = useState<any[]>(props.columns);
  ////______________________________________________________________
  const pageSize = !allowPagination
    ? 0
    : viewsLoaded !== undefined
    ? activeViewOptions?.pageSize ?? 20
    : pagination.pageSize;
  const sortField =
    viewsLoaded !== undefined ? activeViewOptions?.sortField : sorter.field;
  const sortOrder =
    viewsLoaded !== undefined ? activeViewOptions?.sortOrder : sorter.order;

  const filters = activeViewOptions?.filters ?? [];

  // Fetch Data
  const allParams = {
    dataSource,
    columns,
    filters,
    search,
    pageNo: pagination.pageNo,
    pageSize,
    sortField,
    sortOrder,
    viewsLoaded,
    activeView,
    editingKey,
    counter: master?.counter,
  };

  const {
    data: records,
    isFetching: loading,
    refetch,
  } = useQuery({
    queryKey: [name, "DATA", props.columns, allParams],
    queryFn: (key) => fetchData(key),
    refetchOnWindowFocus: false,
  });

  const fetchData = async ({ queryKey }: { queryKey: any }) => {
    if (queryKey && viewsLoaded !== false) {
      const cols = buildColumns(props.columns, getItemOptions);
      setColumns(cols);

      if (master !== undefined) {
        const newData = master.getFieldValue(dataSource) ?? [];
        setEditingRowKey(null);
        setEditingRow({});
        setData(newData);
        return newData;
      } else if (Array.isArray(dataSource)) {
        setData(dataSource);
        return dataSource;
      } else if (dataSource && !Array.isArray(dataSource))
        return axios
          .post(dataSource, {
            form: {
              ...allParams,
              filter: [...(initialFilter ?? []), ...filters],
            },
          })
          .then((response) => {
            setHasChanges(false);
            if (selectedRowKeys.length > 1) setSelctedRowKeys([]);
            setEditingRowKey(null);
            setEditingRow({});
            setData(response.data.records);
            setCount(response.data.count);
            return response.data.records;
          })
          .catch(() => []);
    }

    return [];
  };

  const resetData = () => {
    setData(records);
    setHasChanges(false);
    setSelctedRowKeys([]);
    setEditingRowKey(null);
  };
  ////______________________________________________________________
  const handleChange = (options: changeParams) => {
    const { search, pagination, sorter } = options;

    if (search !== undefined) setSearch(search);

    if (pagination !== undefined) {
      setPagination(pagination);
      if (handleViewChange)
        handleViewChange({
          name,
          viewOptions: { pageSize: pagination.pageSize },
        });
    }

    if (sorter !== undefined) {
      setSorter(sorter ?? {});
      if (handleViewChange)
        handleViewChange({
          name,
          viewOptions: {
            sortField: sorter?.field?.toString().replace(",", "."),
            sortOrder: sorter?.order,
          },
        });
    }
  };

  const handleFilter = (filters: any) => {
    if (handleViewChange)
      handleViewChange({
        viewOptions: { filters: filters.filter((e: any) => e.propertyName) },
      });
  };
  ////______________________________________________________________
  // Editable Table
  const [form] = Form.useForm();

  const updateData = (data: any[]) => {
    setHasChanges(true);
    setData(data);
    if (master !== undefined && !Array.isArray(dataSource))
      master.setFieldsValue({
        [dataSource]: data.filter((e) => e.status !== "edit"),
      });

    if (props.handleDataChange) props.handleDataChange(data);
  };

  const getNewKey = () => {
    let arr = [...data];
    arr = arr.sort((a, b) => b[keyField] - a[keyField]);
    return arr.length === 0 ? 1 : Number(arr[0][keyField]) + 1;
  };

  const getNewRow = (values: any) => {
    let newRow = {
      ...props.initialValues,
      ...values,
      status: "new",
    };

    columns.forEach((element) => {
      if (!values || !values[element.dataIndex]) {
        newRow = { ...newRow, [element.dataIndex]: element.defaultValue };
        if (element.inputFK)
          newRow = { ...newRow, [element.inputFK]: undefined };
      }
    });

    if (autoKey) {
      newRow = { ...newRow, [keyField]: getNewKey() };
    } else {
      newRow = { ...newRow, [keyField]: "" };
    }

    return newRow;
  };

  const handleRowAdd = (values: any) => {
    if (allowEdit)
      form.validateFields().then(
        () => {
          const newRow: any = getNewRow(values);
          const newData =
            newRowPosition === "top" ? [newRow, ...data] : [...data, newRow];
          updateData(newData);
          form.setFieldsValue(newRow);
          setEditingRowKey(newRow[keyField]);
        },
        (errors) => {
          message.error("Missing Required Fields");
          console.log(errors);
        }
      );
  };

  const handleRowEdit = (record: any) => {
    if (!allowEdit) setEditingRowKey(record[keyField]);
    else if (editingRowKey !== record[keyField]) {
      form.setFieldsValue(record);
      setEditingRowKey(record[keyField]);
      setEditingRow(record);
    }
  };

  const handleRowEditCancel = () => {
    setRowValues(editingRow);
    form.setFieldsValue({});
    setEditingRowKey(null);
  };

  const handleRowsDelete = () => {
    let newData = [...data];
    selectedRowKeys.forEach((key) => {
      const index = newData.findIndex((item) => item[keyField] === key);
      if (newData[index].status === "new")
        newData = newData.filter((item) => item[keyField] !== key);
      else {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          status: "deleted",
        });
      }
    });
    updateData(newData);
    setEditingRowKey(null);
    setEditingRow({});
    setSelctedRowKeys([]);
  };

  const setRowValues = (values: any) => {
    const newData = [...data];
    const index = newData.findIndex((ele) => ele[keyField] === editingRowKey);
    const newRow = { ...newData[index], ...values };
    newRow.status = newRow.status === "edit" ? "updated" : newRow.status;
    newData[index] = { ...newRow };
    form.setFieldsValue(newRow);
    setEditingRow({ ...newData[index], ...values });
    updateData(newData);
  };

  ////______________________________________________________________
  const handleColumnPosChange = (col1: any, col2: any) => {
    const viewItems = array.splice(columns, col1, col2, "dataIndex");
    setColumns(viewItems);
    if (handleViewChange) {
      for (let i = 0; i < viewItems.length; i++)
        viewItems[i] = {
          ...viewItems[i],
          columnIndex: i,
          itemOptions: { columnIndex: i },
        };

      handleViewChange({ name, viewItems });
    }
  };

  const handleColumnChange = (col: string | any[], itemOptions: any) => {
    if (Array.isArray(col) && !itemOptions) {
      let viewItems: any[] = [];
      col
        .filter((e) => e.status === "updated")
        .forEach((ele: any) =>
          viewItems.push({
            dataIndex: ele.dataIndex,
            itemOptions: { hidden: ele.hidden, title: ele.title },
          })
        );
      setColumns(col);
      if (handleViewChange) {
        handleViewChange({ name, viewItems });
      }
    } else {
      const newColumns = [...columns];
      const index = newColumns.findIndex((e) => e.dataIndex === col);
      newColumns[index] = { ...newColumns[index], ...itemOptions };
      setColumns(newColumns);

      if (handleViewChange) {
        handleViewChange({
          name,
          viewItems: [{ dataIndex: col, itemOptions }],
        });
      }
    }
  };

  const handleCellValueChange = (
    name: string,
    values: any,
    callBack?: Function
  ) => {
    const newData = [...data];
    const index = newData.findIndex((ele) => ele[keyField] === editingRowKey);
    if (values[name] !== newData[index][name]) {
      if (index > -1) {
        if (name === keyField && values[name] !== editingRowKey) {
          const exists = newData.find((ele) => ele[keyField] === values[name]);
          if (exists !== undefined) {
            message.warning("This Key Exists");
            return;
          }

          setEditingRowKey(values[name]);
        }

        let newRow = { ...newData[index], ...values };

        if (newRow.status === "edit") {
          newRow.status = "updated";
        }

        newData.splice(index, 1, newRow);
        if (callBack) {
          const newValues = callBack({
            value: newRow[name],
            record: newRow,
            data: newData,
          });
          if (newValues !== undefined) {
            newRow = { ...newRow, ...newValues };
            newData.splice(index, 1, newRow);
          }
        }

        form.setFieldsValue(newRow);
        setEditingRow(newRow);
        updateData(newData);
      }
    }
  };

  const handleRowClick = (record: any) => {
    if (rowSelection === "single") setSelctedRowKeys([record[keyField]]);

    if (allowEdit && record[keyField] !== editingRowKey)
      form.validateFields().then(
        () => handleRowEdit(record),
        (errors) => console.log(errors)
      );
  };

  // Row Selection Events
  const handleSelection = (record: any) => {
    if (rowSelection === "single") {
      setSelctedRowKeys([record[keyField]]);
    } else {
      const index = selectedRowKeys.findIndex(
        (ele) => ele === record[keyField]
      );
      if (index > -1) {
        setSelctedRowKeys(
          selectedRowKeys.filter((ele) => ele !== record[keyField])
        );
      } else {
        setSelctedRowKeys([...selectedRowKeys, record[keyField]]);
      }
    }
  };

  const handleSelectionAll = (value: any) => {
    const newSelectedKeys: any[] = [];
    const filteredData = data.filter((e: any) =>
      customFilter ? customFilter(e) : true
    );
    if (value)
      filteredData.forEach((element) => {
        newSelectedKeys.push(element[keyField]);
      });
    setSelctedRowKeys(newSelectedKeys);
  };
  ////______________________________________________________________
  const handleNewRecord = () => setEditingKey("");

  const handleEditRecord = (key?: string) =>
    setEditingKey(key ?? selectedRowKeys[0]);

  const handleDeleteRecord = () =>
    axios
      .post(dataSource + "/Delete/" + selectedRowKeys[0])
      .then(() => {
        message.success("Deleted Successfully");
        refetch();
      })
      .catch((error) => message.dbError("Delete Error", error));

  const handleSubmit = async (method = "Update") => {
    form.validateFields().then(
      () =>
        axios
          .post(dataSource + "/" + method, {
            form: updatedData,
          })
          .then(() => {
            message.success("Saved Successfully");
            refetch();
          })
          .catch((error) => message.dbError("Data Error", error)),
      (errors) => message.dbError("Missing Required Fields", errors)
    );
  };

  ////______________________________________________________________
  // Register
  const register = (props = {}) => {
    return {
      columns,
      data: data
        ?.filter((e: any) => e.status !== "deleted")
        ?.filter((e: any) => (customFilter ? customFilter(e) : true))
        ?.filter((e: any) =>
          customFilter && search
            ? JSON.stringify(e)
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            : true
        ),
      keyField,
      pagination: {
        pageSize: allParams.pageSize,
        pageNo: allParams.pageNo,
        count,
        hidden: !allowPagination,
      },
      sorter: {
        field: sortField,
        order: sortOrder,
      },
      search,
      filters,
      allowPagination,
      allowEdit,
      allowSearch,
      allowSort,
      allowFilter,
      allowCustomization,
      loading,
      form,
      hasChanges,
      editingKey: editingRowKey,
      rowSelection: rowSelection
        ? {
            selectedRowKeys,
            onSelect: handleSelection,
            onSelectAll: handleSelectionAll,
            hideSelectAll: rowSelection === "single",
          }
        : false,
      allowMultipleSelection: master,
      handleCellValueChange,
      handleRowClick,
      handleChange,
      handleColumnChange,
      handleColumnPosChange,
      handleFilter,
      ...props,
    };
  };
  ////______________________________________________________________
  const accessName = master ? `${master.name}_${name}` : name;
  const tableMaster = {
    name: accessName,
    getFieldValue: (name: string) => editingRow && editingRow[name],
    setFieldsValue: (values: any) => setRowValues(values),
    counter: editingRowKey,
  };
  ////______________________________________________________________
  // Table
  const table = {
    data,
    accessName,
    editingKey,
    editingRow,
    hasChanges,
    isEditing,
    selectedRowKeys,
    hasSelection: selectedRowKeys.length > 0,
    selectedRow,
    allowSave: isEditing,
    allowNew: !isEditing,
    allowEdit: !isEditing && selectedRowKeys.length > 0,
    allowDelete: selectedRowKeys.length > 0,
    allowCancel: isEditing,
    master: tableMaster,
    refetch,
    setData,
    setSelctedRowKeys,
    getNewRow,
    getNewKey,
    updateData,
    register,
    resetData,
    setRowValues,
    handleRowEdit,
    handleRowEditCancel,
    handleRowsDelete,
    handleRowAdd,
    handleNewRecord,
    handleEditRecord,
    handleDeleteRecord,
    handleSubmit,
  };

  return { table, register };
};
