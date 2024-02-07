import { Space } from "antd";

import i18n from "~/i18n";

import { Form, Button, Drawer, Input, Switch } from "~/library/components";

import { useAuth, useDashboard, useForm } from "~/library/hooks";

interface textCustomizationProps {
  toggle: any;
}

const Create = ({ toggle }: textCustomizationProps) => {
  const userID = useAuth()?.auth?.userID;

  const { createDashboard } = useDashboard();

  const { form } = useForm({
    name: "dashboards",
    dataSource: "dashboards",
    keyField: "dashboardID",
  });

  const handleFinish = () => {
    createDashboard(form.getFieldsValue(true), () => toggle.close());
  };

  const afterOpenChange = (value: boolean) => {
    if (!value) form.resetFields();
  };

  return (
    <Drawer
      title={i18n.t("Create Dashboard")}
      toggle={toggle}
      afterOpenChange={afterOpenChange}
      extra={
        <Space>
          <Button type="text" onClick={toggle.close} key="s">
            {i18n.t("Cancel")}
          </Button>
          <Button onClick={handleFinish}>{i18n.t("Finish")}</Button>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ userID, isDefault: false }}
      >
        <Form.Group>
          <Form.Item name="dashboardID" required>
            <Input />
          </Form.Item>
          <Form.Item name="dashboardName" required>
            <Input />
          </Form.Item>
          <Form.Item name="isDefault">
            <Switch />
          </Form.Item>
        </Form.Group>
      </Form>
    </Drawer>
  );
};

export default Create;
