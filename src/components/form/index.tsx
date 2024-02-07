import React from "react";

import { Form as Control, Spin, Divider } from "antd";

import { useConfig, useViews } from "~/library/hooks";

import { Section } from "./core/section";

import { Group } from "./core/group";

import { Item } from "./core/item";

import { FormRow } from "./core/row";

import { Button, Input } from "~/library/components";

import i18n from "~/i18n";

interface formProps {
  form?: any;
  initialValues?: any;
  layout?: "horizontal" | "inline" | "vertical";
  wrapperCol?: any;
  labelCol?: any;
  disabled?: boolean;
  children?: React.ReactNode;
}

const Form = (props: formProps) => {
  const { config } = useConfig();

  const getAllProps = () => {
    let extraProps = { ...config.formLayout };
    if (props.layout === "vertical") {
      extraProps = {
        ...extraProps,
        layout: props.layout,
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
      };
    }

    if (props.wrapperCol)
      extraProps = { ...extraProps, wrapperCol: props.wrapperCol };

    return extraProps;
  };

  return (
    <Control
      form={props.form}
      name={props.form.name}
      scrollToFirstError={true}
      initialValues={props.initialValues}
      {...getAllProps()}
      autoComplete="off"
      labelWrap={true}
      onValuesChange={props.form.handleValuesChange}
      disabled={props.disabled}
      variant="filled"
    >
      <Spin spinning={props.form.loading === true}>
        {props.children}
        <ShowMore />
      </Spin>
    </Control>
  );
};

const ShowMore = () => {
  const { activeViewOptions, handleViewChange } = useViews();

  const hidden =    activeViewOptions?.hiddenSections?.length === 0;

  const showMore = activeViewOptions?.showMore;

  const handleClick = () =>
    handleViewChange({ viewOptions: { showMore: !showMore } });

  return (
    activeViewOptions?.hiddenSections && !hidden && (
      <div style={{ textAlign: "start" }}>
        <Button.Link onClick={handleClick}>
          {i18n.t(showMore ? "Show Less" : "Show More")}
        </Button.Link>
      </div>
    )
  );
};

Form.Register = ({ name, initialValue }: any) => (
  <Item name={name} style={{ display: "none" }} initialValue={initialValue}>
    <Input />
  </Item>
);

Form.Item = Item;
Form.Group = Group;
Form.Section = Section;
Form.Row = FormRow;
Form.Divider = Divider;
Form.useForm = Control.useForm;
Form.useWatch = Control.useWatch;
Form.useFormInstance = Control.useFormInstance;
Form.List = Control.List;

export { Form };
