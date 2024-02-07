import { Space } from "antd";

import i18n from "~/i18n";

import { Form, Button, Drawer, Input } from "~/library/components";

import { useDashboard } from "~/library/hooks";

interface textCustomizationProps {
  group: any;
  toggle:any
}

const Options = ({ group, toggle }: textCustomizationProps) => {
  const [form] = Form.useForm();

  const { updateGroup } = useDashboard();

  const groupOptions = JSON.parse(group.groupOptions);

  const handleFinish = () => {
    const groupOptions = JSON.stringify({ ...form.getFieldsValue() });
    updateGroup({ ...group, groupOptions });
    toggle.close();
  };

  const afterOpenChange = (value: boolean) => {
    if (value) form.setFieldsValue(groupOptions);
  };

  return (
    <Drawer
      title={i18n.t("Customize Group")}
      toggle={toggle}
      afterOpenChange={afterOpenChange}
      extra={
        <Space>
          <Button type="text" onClick={toggle.close}>
            {i18n.t("Cancel")}
          </Button>
          <Button onClick={handleFinish}>{i18n.t("Finish")}</Button>
        </Space>
      }
    >
      <Form form={form}>
        <Form.Group>
          <Form.Item name="width">
            <Input />
          </Form.Item>
          <Form.Item name="title">
            <Input />
          </Form.Item>
        </Form.Group>
      </Form>
    </Drawer>
  );
};

export default Options;
