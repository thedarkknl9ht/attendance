import { InputNumber, Space } from "antd";

import i18n from "~/i18n";

import {
  Form,
  Button,
  Drawer,
  SelectFixed,
  Input,
  ColorPicker,
  Textarea,
} from "~/library/components";

import { useViews } from "~/hooks/useViews";

interface textCustomizationProps {
  name: string;
  type: "text" | "label";
  dataType?: "string" | "boolean" | "number" | "date";
  toggle: any;
}

const Personalize = ({ name, type, toggle }: textCustomizationProps) => {
  const [form] = Form.useForm();

  const { getItemOptions, handleViewChange } = useViews() || {};

  const handleFinish = () => {
    handleViewChange({
      viewItems: [
        {
          dataIndex: name,
          itemOptions: form.getFieldsValue(),
        },
      ],
    });
    toggle.close();
  };

  const afterOpenChange = (value: boolean) => {
    if (value) {
      const options = (getItemOptions && getItemOptions(name)) || {};
      form.setFieldsValue(options);
    }
  };

  return (
    <Drawer
      title={`Customize - ${name}`}
      toggle={toggle}
      afterOpenChange={afterOpenChange}
      size="large"
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
          <Form.Item name="label" hidden={type !== "label"}>
            <Input />
          </Form.Item>
          <Form.Divider orientation="left">{i18n.t("Colors")}</Form.Divider>
          <Form.Item name={["style", "color"]} initialValue={null}>
            <ColorPicker />
          </Form.Item>
          <Form.Item name={["style", "backgroundColor"]} initialValue={null}>
            <ColorPicker />
          </Form.Item>
          <Form.Item name={["style", "opacity"]}>
            <InputNumber max={1} min={0} />
          </Form.Item>
          <Form.Divider orientation="left">{i18n.t("Font")}</Form.Divider>
          <Form.Item name={["style", "fontFamily"]}>
            <Input />
          </Form.Item>
          <Form.Item name={["style", "fontWeight"]}>
            <SelectFixed dataSource="fontWeight" />
          </Form.Item>
          <Form.Item name={["style", "fontSize"]}>
            <SelectFixed dataSource="fontSize" />
          </Form.Item>
          <Form.Divider orientation="left">{i18n.t("Text")}</Form.Divider>
          <Form.Item name={["style", "padding"]}>
            <Input />
          </Form.Item>
          <Form.Item name={["style", "textAlign"]}>
            <SelectFixed dataSource="textAlign" />
          </Form.Item>
          <Form.Item name={["style", "textDecoration"]}>
            <SelectFixed dataSource="textDecoration" />
          </Form.Item>
          <Form.Item name="suffix" hidden={type !== "text"}>
            <Input />
          </Form.Item>
          <Form.Item name="prefix" hidden={type !== "text"}>
            <Input />
          </Form.Item>
          <Form.Divider />
          <Form.Item name="customCss">
            <Textarea style={{ direction: "ltr" }} />
          </Form.Item>
          <Form.Item>
            <Button type="text" onClick={() => form.resetFields()}>
              {i18n.t("Reset")}
            </Button>
          </Form.Item>
        </Form.Group>
      </Form>
    </Drawer>
  );
};

export default Personalize;