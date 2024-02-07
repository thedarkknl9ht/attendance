import dayjs from "dayjs";

import { DatePicker as Control } from "antd";

const DatePicker = (props: any) => {
  const handleChange = (e: any) => {
    let d = e.hour(12).minute(0).second(0).millisecond(0)
    if (props.onChange) props.onChange(d);
    if (props.onValueChange) props.onValueChange(d);
  };
  
  return (
    <Control
      {...props}
      value={props.value && dayjs(props.value)}
      style={{ width: "100%" }}
      allowClear={!props["aria-required"]}
      onChange={handleChange}
    />
  );
};

export { DatePicker };
