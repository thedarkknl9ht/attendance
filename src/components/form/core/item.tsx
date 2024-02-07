import { Form, Dropdown, Space, Divider } from "antd";

import { Authorization, Checkbox, DropdownRender } from "~/library/components";

import { isEmpty } from "~/library/utils";

import { useViews, useMessage } from "~/library/hooks";

import i18n from "~/i18n";

export const Item = (props: any) => {
  const {
    name,
    rules,
    children,
    email,
    showInHeader: _showInHeader,
    ...restProps
  } = props;

  const form = Form.useFormInstance();

  const value = Form.useWatch(name, form);

  const { getItemOptions } = useViews() || {};

  const options = (getItemOptions && getItemOptions(name)) || {};

  const label = !isEmpty(options.label)
    ? options.label
    : props.label ?? i18n.t(name);
  const required = options?.required || props.required;
  const hidden = options.hidden ?? props.hidden;
  const showInHeader = options.showInHeader ?? _showInHeader;

  const getRules = () => {
    const newRules = rules ?? [];
    if (props.required)
      newRules.push({
        required: true,
        message: `${i18n.t("Please Enter")} ${label}`,
      });
    else if (required)
      newRules.push({
        required: true,
        message: "",
      });

    if (email)
      newRules.push({
        type: "email",
        message: i18n.t("Please provide a valid email address"),
      });

    return newRules;
  };

  const getClassName = () => {
    let className = "";
    if (showInHeader) {
      className += "show-in-header";
    }
    if (typeof value === "boolean") {
      className += " data-boolean";
    }
    return className;
  };

  const getValue = () => {
    if (typeof value === "boolean") {
      return value ? label : null;
    }
    return value;
  };

  return (
    <Form.Item
      {...restProps}
      name={name}
      label={
        <FormLabel
          name={name}
          label={label}
          required={props.required}
          isRequired={required}
          isHidden={hidden}
          showInHeader={showInHeader}
        />
      }
      rules={getRules()}
      hasFeedback={required}
      hidden={hidden}
      className={getClassName()}
      value={getValue()}
    >
      <Authorization.Field>{children}</Authorization.Field>
    </Form.Item>
  );
};

const FormLabel = ({
  name,
  label,
  required,
  isRequired,
  isHidden,
  showInHeader,
}: any) => {
  const message = useMessage();

  const { handleViewChange } = useViews() || {};

  const onOptionChange = (property: any, value: any) =>
    handleViewChange({
      viewItems: [{ dataIndex: name, itemOptions: { [property]: value } }],
    });

  const items = [
    {
      label: "Rename Label",
      onClick: () =>
        message.inputBox("Please Enter The New Title", (value: any) =>
          onOptionChange("label", value)
        ),
      key: "1",
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={["contextMenu"]}
      dropdownRender={(menu) => (
        <DropdownRender menu={menu}>
          <Space
            direction="vertical"
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          >
            <Checkbox
              disabled={required}
              checked={isRequired}
              onClick={() => onOptionChange("required", !isRequired)}
            >
              {i18n.t("Required")}
            </Checkbox>
            <Checkbox
              disabled={required}
              checked={isHidden}
              onClick={() => onOptionChange("hidden", !isHidden)}
            >
              {i18n.t("Hidden")}
            </Checkbox>
            <Checkbox
              checked={showInHeader}
              onClick={() => onOptionChange("showInHeader", !showInHeader)}
            >
              {i18n.t("Show In Header")}
            </Checkbox>
          </Space>
        </DropdownRender>
      )}
    >
      <div style={{ width: "100%" }}>
        <Divider
          orientation="left"
          orientationMargin={0}
          style={{ margin: 0 }}
          plain
        >
          {label}
        </Divider>
      </div>
    </Dropdown>
  );
};
