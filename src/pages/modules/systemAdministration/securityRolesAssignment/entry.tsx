import { Content } from "~/components/content";

import { Form, Input, Switch } from "~/library/components";

import { useForm } from "~/hooks/useForm";
/////////////////////////////////////////////////////////////////////////
import masterForm from "~/pages/common/menu/masterForm";
/////////////////////////////////////////////////////////////////////////
import Roles from "./core/roles";
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
          <Form.Section name="User Data">
            <Form.Group>
              <Form.Item name="userID">
                <Input autoFocus={true} readOnly />
              </Form.Item>
              <Form.Item name="userName">
                <Input readOnly />
              </Form.Item>
              <Form.Item name="enabled">
                <Switch readOnly />
              </Form.Item>
            </Form.Group>
          </Form.Section>
          <Form.Section name="securityRolesAssignment">
            <Roles />
          </Form.Section>
        </Form>
      </Content>
    )
  );
};
/////////////////////////////////////////////////////////////////////////
export default Entry;
