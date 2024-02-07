import { Radio as _Radio } from "antd";

import { inputSources } from "~/library/models";

import i18n from "~/i18n";

export const Radio = (props: any) => (
  <_Radio value={props.value}>{i18n.t(props.label)}</_Radio>
);

const Button = (props: any) => (
  <_Radio.Button value={props.value}>{i18n.t(props.label)}</_Radio.Button>
);

Radio.Button = Button;

Radio.Group = ({ dataSource, value, onChange, onValueChange }: any) => {
  const handleChange = (value: any) => {
    if (onChange) onChange(value);
    if (onValueChange) onValueChange(value);
  };

  return (
    <_Radio.Group value={value} onChange={handleChange}>
      {inputSources[dataSource]?.map((item: any) => (
        <_Radio key={item.value} value={item.value}>
          {i18n.t(item.label)}
        </_Radio>
      ))}
    </_Radio.Group>
  );
};
