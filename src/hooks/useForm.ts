import { Form } from "antd";

import { useSearchParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { useMessage } from "./useMessage";

import { useAuth, useAxiosPrivate, useEditingKey } from "../library/hooks";

import { useState } from "react";

interface props {
  name: string;
  dataSource: string;
  keyField: string;
  editingKey?: string | number;
  dataType?: "formData";
  allowFetch?: boolean;
  onInitiate?: Function;
  onEdit?: Function;
  fetch?: Function;
}

interface submitOptions {
  method?: string;
  fields?: any;
  validateFields?: Function;
  callBack?: Function;
}

export const useForm = (props: props) => {
  const axios = useAxiosPrivate();

  const [searchParams, setSearchParams] = useSearchParams();

  const message = useMessage();

  const { auth } = useAuth();

  const { editingKey, setEditingKey, isActive, isNew, isEdit } =
    useEditingKey() || {};

  const method = isNew ? "Insert" : "Update";

  const [form] = Form.useForm();

  const [hasChanges, setHasChange] = useState(false);

  const [counter, setCounter] = useState(0);
  ////______________________________________________________________
  const {
    data: record,
    isFetching: loading,
    refetch,
  } = useQuery({
    queryKey: [props.name, { editingKey }],
    queryFn: (key) => fetchData(key),
    refetchOnWindowFocus: false,
  });

  const fetchData = ({ queryKey }: { queryKey: any }) => {
    if (props.editingKey && editingKey !== props.editingKey)
      setEditingKey(props.editingKey);
    if (searchParams.get("k") !== null) {
      setEditingKey(searchParams.get("k"));
      setSearchParams([]);
    } else if (queryKey && isActive && props.allowFetch !== false)
      if (editingKey === "") {
        setHasChange(false);
        setCounter((pre: number) => pre + 1);
        form.resetFields();
        if (props.onInitiate) props.onInitiate(form);
      } else
        return axios
          .fetch(props.dataSource + "/" + editingKey)
          .then((record) => {
            setHasChange(false);
            setCounter((pre: number) => pre + 1);
            form.resetFields([]);
            form.setFieldsValue(record);
            if (props.onEdit) props.onEdit(form);
            return record;
          });

    return {};
  };

  ////______________________________________________________________
  const handleNewRecord = () => {
    if (hasChanges) message.confirm("Unsaved Changes", () => setEditingKey(""));
    else setEditingKey("");
  };

  const handleValuesChange = () => setHasChange(true);

  const setFieldsValue = (values: any) => {
    form.setFieldsValue(values);
    setHasChange(true);
  };

  const hasDetails = (name: string) =>  form.getFieldValue(name)?.length > 0;

  const revertChanges = () => {
    if (isNew) {
      form.resetFields();
    } else if (isEdit) {
      form.setFieldsValue(record);
    }
    setCounter((pre: number) => pre + 1);
    setHasChange(false);
  };

  const handleCancel = (forceConfirm?: boolean) => {
    if (hasChanges && forceConfirm !== true)
      message.confirm("Unsaved Changes", () => {
        setEditingKey(null);
        form.resetFields();
        setCounter((pre: number) => pre + 1);
        setHasChange(false);
      });
    else {
      setEditingKey(null);
      form.resetFields();
      setCounter((pre: number) => pre + 1);
      setHasChange(false);
    }
  };
  ////______________________________________________________________
  const validateDetails = () => {
    const elements: any = document
      .getElementById(props.name)
      ?.querySelectorAll("td.invalid-value");
    if (elements?.length > 0) {
      message.dbError("Missing Required Fields");
      return false;
    }
    return true;
  };

  const handleSubmit = async (options: submitOptions = { fields: {} }) => {
    const fields = { ...form.getFieldsValue(true), ...options.fields };

    if (validateDetails())
      return await form.validateFields().then(
        () =>
          options?.validateFields && !options?.validateFields(fields)
            ? null
            : axios
                .post(props.dataSource + "/" + (options.method ?? method), {
                  form: fields,
                  dataType: props.dataType,
                })
                .then((response) => {
                  if (options.callBack) {
                    options.callBack(fields, response.data);
                  } else if (editingKey === "") {
                    setEditingKey(fields[props.keyField]);
                  } else {
                    refetch();
                  }
                  message.success("Form Submitted");
                  return { status: true, data: response.data };
                })
                .catch((error) =>
                  message.dbError("Data Error, Duplication", error, fields)
                ),
        (errors) => message.dbError("Validation Error", errors)
      );
  };

  const handlePost = async (options?: any) =>
    axios
      .post(props.dataSource + "/Post", {
        params: { id: editingKey, userID: auth?.userID },
      })
      .then((response) => {
        refetch();
        message.success("Form Posted");
        if (options?.callBack) options.callBack(response.data);
        return { status: true, data: response.data };
      })
      .catch((error) => message.dbError(error.message, error));

  const hanldeDeleteRecord = (options?: submitOptions) =>
    axios
      .post(`${props.dataSource}/Delete/${editingKey}`)
      .then(() => {
        if (options?.callBack) options.callBack(form.getFieldsValue());
        else handleCancel();
        message.success("Form Deleted");
        return { status: true };
      })
      .catch((error) => message.dbError("Delete Error", error));

  ////______________________________________________________________
  const approvalStatus = Form.useWatch("approvalStatus", form);

  const posted = Form.useWatch("posted", form);

  const workflowRequestID = Form.useWatch("workflowRequestID", form);

  const allowCreate = !isNew;

  const allowSave = !posted && !workflowRequestID;

  const allowDelete = !posted && !workflowRequestID;

  const allowPost = !hasChanges && !posted && approvalStatus === "Approved";
  ////______________________________________________________________
  return {
    form: {
      ...form,
      name: props.name,
      accessName: props.name,
      isActive,
      isNew,
      isEdit,
      method,
      loading,
      counter,
      hasChanges,
      editingKey,
      setEditingKey,
      allowPost,
      allowCreate,
      allowSave,
      allowDelete,
      refetch,
      hasDetails,
      setFieldsValue,
      revertChanges,
      handleValuesChange,
      handleCancel,
      handleNewRecord,
      hanldeDeleteRecord,
      handleSubmit,
      handlePost,
    },
    handleSubmit,
    handlePost,
  };
};
