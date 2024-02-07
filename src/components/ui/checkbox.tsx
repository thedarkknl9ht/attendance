import { Checkbox as Control } from "antd";

const Checkbox = ({ onValueChange, onChange, ...props }: any) => {
  const handleChange = (e: any) => {
    if (onChange) onChange(e);
    if (onValueChange) onValueChange(e);
  };

  return (
    <Control
      {...props}
      checked={props.checked || props.value}
      onChange={handleChange}
    />
  );
};

export { Checkbox };
