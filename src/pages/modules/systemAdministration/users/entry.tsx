import { Content } from "~/components/content";

import { Form, Input, Select, SelectFixed, Switch } from "~/library/components";

import { useForm } from "~/hooks/useForm";
/////////////////////////////////////////////////////////////////////////
import masterForm from "~/pages/common/menu/masterForm";

import i18n from "~/i18n";
/////////////////////////////////////////////////////////////////////////
interface EntryProps {
  name: string;
  dataSource: string;
  keyField: string;
  breadcrumb?: any[];
}
/////////////////////////////////////////////////////////////////////////
const Entry = ({ name, dataSource, keyField, breadcrumb }: EntryProps) => {
  const { form } = useForm({ name, dataSource, keyField });
  /////////////////////////////////////////////////////////////////////////
  return (
    form.isActive && (
      <Content
        title={name}
        breadcrumb={breadcrumb}
        menu={masterForm(form)}
        onBack={form.handleCancel}
      >
        <Form form={form}>
          <Form.Section name="General Data" showTitle={false}>
            <Form.Group>
              <Form.Item name="userID" required>
                <Input autoFocus={true} readOnly={form.isEdit} />
              </Form.Item>
              <Form.Item name="userName" required>
                <Input />
              </Form.Item>
              <Form.Item name="userPassword" required>
                <Input.Password iconRender={() => null} />
              </Form.Item>
              <Form.Item name="changePassword" initialValue={true}>
                <Switch />
              </Form.Item>
              <Form.Item name="enabled" initialValue={true}>
                <Switch />
              </Form.Item>
            </Form.Group>
            <Form.Group>
              <Form.Item name="email" email>
                <Input />
              </Form.Item>
              <Form.Item name="userType" initialValue="Standard" required>
                <SelectFixed dataSource="userType" />
              </Form.Item>
              <Form.Item label={i18n.t("workflowRole")} name="workflowRoleID">
                <Select dataSource="workflowRoles" />
              </Form.Item>
              <Form.Item label={i18n.t("entity")} name="entityID">
                <Select dataSource="legalEntities" />
              </Form.Item>
              <Form.Item name="admin" initialValue={true}>
                <Switch />
              </Form.Item>
              <Form.Item name="allEntities" initialValue={true}>
                <Switch />
              </Form.Item>
            </Form.Group>
          </Form.Section>
        </Form>
      </Content>
    )
  );
};
/////////////////////////////////////////////////////////////////////////
export default Entry;
