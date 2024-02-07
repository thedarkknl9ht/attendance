import { Space } from "antd";

import i18n from "~/i18n";

import { Form, Button, Drawer, Input, SelectFixed, Switch } from "~/library/components";

import { useDashboard } from "~/library/hooks";

import getOptions from "../../utils/getOptions";

interface textCustomizationProps {
  widget: any;
  toggle: any;
}

const Options = ({ widget, toggle }: textCustomizationProps) => {
  const [form] = Form.useForm();

  const { updateWidget } = useDashboard();

  const widgetOptions = getOptions(widget.widgetOptions);

  const handleFinish = () => {
    const widgetOptions = JSON.stringify({ ...form.getFieldsValue() });
    updateWidget({ ...widget, widgetOptions });
    toggle.close();
  };

  const afterOpenChange = (value: boolean) => {
    if (value) form.setFieldsValue(widgetOptions);
  };

  return (
    <Drawer
      title={i18n.t("Customize Widget")}
      toggle={toggle}
      afterOpenChange={afterOpenChange}
      width={500}
      extra={
        <Space>
          <Button type="text" onClick={toggle.close}>
            {i18n.t("Cancel")}
          </Button>
          <Button onClick={handleFinish}>{i18n.t("Finish")}</Button>
        </Space>
      }
    >
      <Form form={form}  wrapperCol={{ span: 24 }}>
        <Form.Group>
          <Form.Item name="height">
            <Input />
          </Form.Item>
          <Form.Item name="title">
            <Input />
          </Form.Item>
          <Form.Item name="titleAlign">
            <SelectFixed dataSource="textAlign" />
          </Form.Item>
          <Form.Divider />
          <Form.Item name="customLink">
            <Input />
          </Form.Item>
          <Form.Item name="customLinkNewTab">
            <Switch />
          </Form.Item>
          <Form.Divider />
          <Form.Item name="actionsLocation">
            <SelectFixed dataSource="actionsLocation" />
          </Form.Item>
        </Form.Group>
      </Form>
    </Drawer>
  );
};

export default Options;
