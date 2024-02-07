import React from "react";

import { Page } from "components/page";

import { Form, Input, Switch } from "components";

import config from "features/config.json";

import { useForm } from "hooks/useForm";

import masterForm from "pages/common/menu/masterForm";

const Entry = ({ name, dataSource, keyField, breadcrumb }) => {
  const { form } = useForm({ name, dataSource, keyField });

  return (
    form.isActive && (
      <Page
        title={name}
        breadcrumb={breadcrumb}
        footer={masterForm(form)}
        onBack={form.handleCancel} 
        loading={form.loading}
      >
        <Form
          form={form}
          {...config.formLayout}
          onValuesChange={form.handleValuesChange}
        >
          <Form.Section>
            <Form.Group>
              <Form.Field name="unitID" required>
                <Input readOnly={form.isEdit} />
              </Form.Field>
              <Form.Field name="unitName" required>
                <Input />
              </Form.Field>
              <Form.Field name="unitClass">
                <Input />
              </Form.Field>
              <Form.Field name="baseUnit" initialValue={false}>
                <Switch />
              </Form.Field>
            </Form.Group>            
          </Form.Section>
        </Form>
      </Page>
    )
  );
};
export default Entry;
