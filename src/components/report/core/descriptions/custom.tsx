import { useState } from "react";

import { Space } from "antd";

import {
  Form,
  Table,
  Drawer,
  Button,
  IArrowUp,
  IArrowDown,
  Switch,
  SelectFixed,
  InputNumber,
} from "~/library/components";

import { array } from "~/utils/array";

import { useTable } from "~/hooks/useTable";

import { useViews } from "~/hooks/useViews";

import i18n from "~/i18n";

interface customProps {
  name: string;
  items: any[];
  initialValues?: any;
  toggle: any;
}

const DescriptionCustomization = (props: customProps) => {
  const [form] = Form.useForm();

  const { getItemOptions, handleViewChange } = useViews() || {};

  const options = getItemOptions(props.name);

  const columns = [
    { title: i18n.t("Key"), dataIndex: "key", editable: false, width: 100 },
    { title: i18n.t("Title"), dataIndex: "title", editable: false },
    {
      title: i18n.t("Visible"),
      dataIndex: "visible",
      inputType: "selectFixed",
      inputSource: "bool",
      required: true,
      render: i18n.t,
      width: 100,
    },
    { dataIndex: "dataIndex", hidden: true },
  ];

  const [dataSource, setDataSource] = useState<any[]>([]);

  const { table, register } = useTable({
    name: props.name,
    dataSource,
    keyField: "dataIndex",
    columns,
    allowEdit: true,
    allowSort: false,
    allowFilter: false,
    allowSearch: false,
    allowPagination: false,
    rowSelection: "single",
  });

  const afterOpenChange = () => {
    let newData: any[] = [];
    props.items.forEach((item, index: number) =>
      newData.push({
        key: index + 1,
        title: item.title ?? i18n.t(item.dataIndex),
        dataIndex: item.dataIndex,
        visible: item.visible,
      })
    );

    if (options?.items !== undefined)
      newData = array.merge(newData, options?.items, "dataIndex");

    setDataSource(newData);
    form.setFieldsValue(props.initialValues);
  };

  const moveItem = (type: string) => {
    if (table.selectedRowKeys[0]) {
      const index: any = table.data.findIndex(
        (e) => e.dataIndex === table.selectedRowKeys[0]
      );

      let data = table.data;

      if (type === "up" && index > 0) {
        data = array.splice(
          data,
          data[index].dataIndex,
          data[index - 1].dataIndex,
          "dataIndex"
        );
      } else if (type === "down" && index < table.data.length - 1) {
        data = array.splice(
          data,
          data[index].dataIndex,
          data[index + 1].dataIndex,
          "dataIndex"
        );
      }

      const newData: any[] = [];
      data.forEach((item, index: number) =>
        newData.push({ ...item, key: index + 1 })
      );

      table.handleRowEditCancel();
      setDataSource(newData);
    }
  };

  const handleFinish = () => {
    const viewItems = [
      {
        dataIndex: props.name,
        itemOptions: { ...form.getFieldsValue(), items: table.data },
      },
    ];
    handleViewChange({ viewItems });
    props.toggle.close();
  };

  return (
    <Drawer
      title={`Customize - ${props.name}`}
      toggle={props.toggle}
      afterOpenChange={afterOpenChange}
      size="large"
      extra={
        <Space>
          <Button type="text" onClick={props.toggle.close} key="s">
            {i18n.t("Cancel")}
          </Button>
          <Button onClick={handleFinish}>{i18n.t("Finish")}</Button>
        </Space>
      }
    >
      <Form form={form}>
        <Form.Group>
          <Form.Item name="bordered">
            <Switch />
          </Form.Item>
          <Form.Item name="colon">
            <Switch />
          </Form.Item>
          <Form.Item name="columns">
            <InputNumber integer={true} />
          </Form.Item>
          <Form.Item name="layout">
            <SelectFixed dataSource="layout" />
          </Form.Item>
        </Form.Group>
        <Form.Group>
          <Form.Divider orientation="left">{i18n.t("Content")}</Form.Divider>
          <Table {...register()} />
        </Form.Group>
        <Form.Group>
          <Space>
            <Button
              type="text"
              icon={<IArrowUp />}
              onClick={() => moveItem("up")}
            >
              {i18n.t("Move Up")}
            </Button>
            <Button
              type="text"
              icon={<IArrowDown />}
              onClick={() => moveItem("down")}
            >
              {i18n.t("Move Down")}
            </Button>
          </Space>
        </Form.Group>
      </Form>
    </Drawer>
  );
};

export default DescriptionCustomization;
