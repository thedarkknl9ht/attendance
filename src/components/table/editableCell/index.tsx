import { useEffect } from "react";

import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  SelectFixed,
  Checkbox,
} from "~/library/components";

import { isEmpty } from "~/library/utils";

export const EditableCell = (props: any) => {
  const {
    editing,
    dataIndex,
    title,
    inputType,
    inputSource,
    filter,
    inputFK,
    record,
    index,
    required,
    readOnly,
    autoFocus,
    children,
    onChange,
    handleCellValueChange,
    className,
    ...restProps
  } = props;

  useEffect(() => {
    if (editing && autoFocus) document.getElementById(dataIndex)?.focus();
  }, [dataIndex, editing, autoFocus, readOnly]);

  const getClassName = () => {
    if (editing && record && required && isEmpty(record[dataIndex]))
      return className + " invalid-value";
    else return className;
  };

  return (
    <td {...restProps} className={getClassName()} data-editing={editing}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          rules={[{ required, message: "" }]}
          autoFocus={true}
          noStyle
        >
          {inputNode(props)}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

interface inputNodeProps {
  dataIndex: string;
  inputType?: string;
  inputSource?: any;
  inputFK?: string;
  filter: any[];
  readOnly?: boolean;
  required?: boolean;
  onChange?: Function;
  handleCellValueChange: Function;
}

const inputNode = ({
  dataIndex,
  inputType,
  inputSource,
  inputFK,
  filter,
  readOnly,
  required,
  onChange,
  handleCellValueChange,
}: inputNodeProps) => {
  const handleInputChange = (e: any) =>
    handleCellValueChange(dataIndex, { [dataIndex]: e.target.value }, onChange);

  const hanldeSelectChange = (value: string, item: any) => {
    handleCellValueChange(
      dataIndex,
      {
        [dataIndex]: value,
        [inputFK ?? ""]: item?.element,
      },
      onChange
    );
  };

  const handleNumberChange = (e: any) => {
    if (!isNaN(e.target.value))
      handleCellValueChange(
        dataIndex,
        {
          [dataIndex]: e.target.value,
        },
        onChange
      );
  };

  const handleDateChange = (value: any) => {
    handleCellValueChange(dataIndex, { [dataIndex]: value }, onChange);
  };

  const handleCheckboxChange = (e: any) =>
    handleCellValueChange(dataIndex, {
      [dataIndex]: e.target.checked,
    });

  return inputType === "integer" ? (
    <InputNumber
      precision={0}
      readOnly={readOnly}
      onPressEnter={handleNumberChange}
      onBlur={handleNumberChange}
    />
  ) : inputType === "decimal" ? (
    <InputNumber
      precision={3}
      readOnly={readOnly}
      onPressEnter={handleNumberChange}
      onBlur={handleNumberChange}
    />
  ) : inputType === "date" ? (
    <DatePicker disabled={readOnly} onValueChange={handleDateChange} />
  ) : inputType === "checkbox" ? (
    <Checkbox disabled={readOnly} onValueChange={handleCheckboxChange} />
  ) : inputType === "select" ? (
    <Select
      dataSource={inputSource}
      filter={filter}
      disabled={readOnly}
      allowClear={!required}
      allowTextField={false}
      onSelect={hanldeSelectChange}
      onClear={hanldeSelectChange}
    />
  ) : inputType === "selectFixed" ? (
    <SelectFixed
      dataSource={inputSource}
      disabled={readOnly}
      allowClear={!required}
      onSelect={hanldeSelectChange}
      onClear={hanldeSelectChange}
    />
  ) : inputType === "autoComplete" ? (
    <Input.AutoComplete
      dataSource={inputSource}
      filter={filter}
      readOnly={readOnly}
      onBlur={handleInputChange}
    />
  ) : (
    <Input
      readOnly={readOnly}
      onPressEnter={handleInputChange}
      onBlur={handleInputChange}
      autoComplete="off"
    />
  );
};
