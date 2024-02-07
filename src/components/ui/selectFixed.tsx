import { Space, Select as Control } from "antd";

import i18n from "~/i18n";

import { inputSources } from "~/library/models";

const SelectFixed = (props: any) => {
  const { onSelect, onChange, dataSource, ...restProps } = props;
  const options = Array.isArray(dataSource)
    ? dataSource
    : inputSources[dataSource];
  ////______________________________________________________________
  return (
    <Control
      style={{ opacity: props.readOnly ? ".7" : null, ...props.style }}
      options={options}
      optionRender={(option) => (
        <Space>
          <div className="svg-icon">{option.data.icon}</div>
          {option.data.label ?? i18n.t(option.data.value)}
        </Space>
      )}
      dropdownStyle={{ paddingInlineEnd: 0 }}
      virtual={false}
      value={props.value}
      allowClear={props.allowClear}
      onSelect={onSelect}
      onChange={onChange}
      {...restProps}
    >
      {props.children}
    </Control>
  );
};

export { SelectFixed };
