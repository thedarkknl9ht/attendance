import { Space } from "antd";

import i18n from "~/i18n";

import {
  Form,
  SelectFixed,
  Input,
  Button,
  Textarea,
  Switch,
  Drawer,
} from "~/library/components";

import { useForm, useViews } from "~/library/hooks";

const Create = ({ toggle }: any) => {
  const { form } = useForm({
    name: "usersViews",
    dataSource: "usersViews",
    keyField: "viewID",
    allowFetch: false,
  });

  const { getActiveView, onCreate } = useViews() || {};

  const handleCreate = () => {
    const fields = {
      userID: getActiveView().userID,
      viewName: getActiveView().viewName,
      viewType: getActiveView().viewType,
      viewOptions: getActiveView().viewOptions,
      items: getActiveView().items,
    };

    form.handleSubmit({
      method: "Insert",
      fields,
      callBack: (data:any) => {
        onCreate(data);
        toggle.close();
      },
    });
  };

  return (
    <Drawer
      title="Create New View"
      toggle={toggle}
      afterOpenChange={(value) => {
        if (!value) form.resetFields();
      }}
      size="small"
      extra={
        <Space>
          <Button type="text" onClick={toggle.close} key="s">
            {i18n.t("Cancel")}
          </Button>
          <Button onClick={handleCreate}>{i18n.t("Create")}</Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Group span={24}>
          <Form.Item name="viewID" required>
            <Input />
          </Form.Item>
          <Form.Item name="viewStatus" required>
            <SelectFixed dataSource="viewStatus" />
          </Form.Item>
          <Form.Item name="description">
            <Textarea />
          </Form.Item>
          <Form.Item name="isDefault" initialValue={false}>
            <Switch />
          </Form.Item>
        </Form.Group>
      </Form>
    </Drawer>
  );
};
export default Create;
