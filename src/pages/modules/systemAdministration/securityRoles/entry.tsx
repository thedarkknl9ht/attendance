import { Content } from "~/components/content";

import { Form, Input, Tabs, Textarea } from "~/library/components";

import { useForm } from "~/hooks/useForm";

import i18n from "~/i18n";
/////////////////////////////////////////////////////////////////////////
import masterForm from "~/pages/common/menu/masterForm";
/////////////////////////////////////////////////////////////////////////
import Privileges from "./core/privileges";
import Tasks from "./core/tasks";
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
          <Form.Section name="General Data">
            <Form.Group>
              <Form.Item name="securityRoleID" required>
                <Input
                  autoFocus={true}
                  readOnly={
                    form.isEdit ||
                    form.hasDetails("securityRolesPriviledges") ||
                    form.hasDetails("securityRolesTasks")
                  }
                />
              </Form.Item>
              <Form.Item name="securityRoleName" required>
                <Input />
              </Form.Item>
              <Form.Item name="description">
                <Textarea />
              </Form.Item>
            </Form.Group>
          </Form.Section>
          <Form.Section name="securityRolesDetails">
            <Tabs
              items={[
                {
                  key: "tasks",
                  label: i18n.t("securityTasks"),
                  children: <Tasks />,
                },
                {
                  key: "privileges",
                  label: i18n.t("securityPrivileges"),
                  children: <Privileges />,
                },
              ]}
            />
          </Form.Section>
        </Form>
      </Content>
    )
  );
};
/////////////////////////////////////////////////////////////////////////
export default Entry;
