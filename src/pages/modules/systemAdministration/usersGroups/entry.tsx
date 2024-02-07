import { Content } from "~/components/content";

import { Form, Input, Textarea } from "~/library/components";

import { useForm } from "~/hooks/useForm";
/////////////////////////////////////////////////////////////////////////
import masterForm from "~/pages/common/menu/masterForm";
/////////////////////////////////////////////////////////////////////////
import Details from "./core/details";
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
              <Form.Item name="userGroupID" required>
                <Input
                  autoFocus={true}
                  readOnly={
                    form.isEdit || form.hasDetails("usersGroupsDetails")
                  }
                />
              </Form.Item>
              <Form.Item name="userGroupName" required>
                <Input />
              </Form.Item>
              <Form.Item name="description">
                <Textarea />
              </Form.Item>
            </Form.Group>
          </Form.Section>
          <Form.Section name="usersGroupsDetails">
            <Details />
          </Form.Section>
        </Form>
      </Content>
    )
  );
};
/////////////////////////////////////////////////////////////////////////
export default Entry;
