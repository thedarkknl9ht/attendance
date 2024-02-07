import { InputNumber as Control } from "antd";

const InputNumber = ({ integer, onValueChange, ...restProps }: any) => {
  const handleChange = (value: any) => {
    if (onValueChange) onValueChange(value);
    if (restProps.onChange) restProps.onChange(value);
  };



  return (
    <Control
      {...restProps}
      precision={integer ? 0 : undefined}
      style={{ width: "100%" }}
      onChange={handleChange}
    />
  );
};

export { InputNumber };
