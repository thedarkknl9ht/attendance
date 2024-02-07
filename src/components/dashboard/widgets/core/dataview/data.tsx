import { Space } from "antd";

import i18n from "~/i18n";

import { Form, Button, Drawer, SelectFixed } from "~/library/components";

import { useDashboard } from "~/library/hooks";

import getOptions from "../../../utils/getOptions";

import { privileges } from "~/project/data/privileges";

interface textCustomizationProps {
  widget: any;
  setData?: Function;
  toggle: any;
}

const DataOptions = ({ widget, setData, toggle }: textCustomizationProps) => {
  const [form] = Form.useForm();

  const { updateWidget } = useDashboard() || {};

  const dataOptions = getOptions(widget.dataOptions);

  const handleFinish = () => {
    const dataOptions = JSON.stringify({
      name: form.getFieldValue("name"),
    });
    if (setData) setData([]);
    updateWidget({
      ...widget,
      dataOptions,
    });
    toggle.close();
  };

  const afterOpenChange = (value: boolean) => {
    if (value) form.setFieldsValue(dataOptions);
  };

  const dataViewSource = () => {
    let items: any = [];
    privileges
      .filter((ele: any) => ele.dataView !== undefined)
      .forEach((ele: any) =>
        items.push({
          label: ele.label,
          value: ele.dataView.name,
        })
      );
    return items;
  };

  return (
    <Drawer
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
      <Form form={form} layout="vertical">
        <Form.Group>
          <Form.Item name="name">
            <SelectFixed dataSource={dataViewSource()} />
          </Form.Item>
        </Form.Group>
      </Form>
    </Drawer>
  );
};

export default DataOptions;
