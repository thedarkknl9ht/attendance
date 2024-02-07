import { Content } from "~/library/content";

import { Form, Input, Tabs } from "~/library/components";

import { useAuth, useForm, useMessage } from "~/library/hooks";
/////////////////////////////////////////////////////////////////////////
import i18n from "~/i18n";
/////////////////////////////////////////////////////////////////////////
interface EntryProps {
  name: string;
  dataSource: string;
  keyField: string;
  breadcrumb?: any[];
}
/////////////////////////////////////////////////////////////////////////
const Entry = ({ name, dataSource, keyField }: EntryProps) => {
  const message = useMessage();

  const userID = useAuth()?.auth?.userID;

  const { form } = useForm({ name, dataSource, keyField, editingKey: userID });
  /////////////////////////////////////////////////////////////////////////
  const validateFields = () => {
    const fields = form.getFieldsValue(true);

    if (fields.userPassword !== fields.currentPassword)
      message.warning("Current password is incorrect");
    else if (fields.newPassword !== fields.newPasswordConfirm)
      message.warning("The new password that you entered do not match!");
    else return true;
  };

  const handleSubmit = () =>
    form.handleSubmit({
      fields: { userPassword: form.getFieldValue("newPassword") },
      validateFields,
      callBack: () =>
        form.setFieldsValue({
          userPassword: form.getFieldValue("newPassword"),
          currentPassword: "",
          newPassword: "",
          newPasswordConfirm: "",
        }),
    });

  const items = [
    {
      text: "Save Data",
      disabled: form.isNew,
      onClick: handleSubmit,
    },
  ];
  /////////////////////////////////////////////////////////////////////////
  return (
    form.isActive && (
      <Content title={name} menu={items}>
        <Form form={form}>
          <Tabs
            items={[
              {
                key: 1,
                label: i18n.t("Change Password"),
                children: <ChangePassword form={form} />,
              },
            ]}
          />
        </Form>
      </Content>
    )
  );
};

const ChangePassword = ({ form }: any) =>
  form.getFieldValue("changePassword") && (
    <Form.Group>
      <Form.Item name="currentPassword" required>
        <Input.Password autoFocus />
      </Form.Item>
      <Form.Item name="newPassword" required>
        <Input.Password />
      </Form.Item>
      <Form.Item name="newPasswordConfirm" required>
        <Input.Password />
      </Form.Item>
    </Form.Group>
  );
/////////////////////////////////////////////////////////////////////////
export default Entry;
