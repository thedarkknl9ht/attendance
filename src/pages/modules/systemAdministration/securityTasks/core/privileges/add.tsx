import { Form, Drawer, Radio, Table, Button } from "~/library/components";

import { loadColumns } from "~/library/utils";

import { useTable } from "~/library/hooks";

import { privileges } from "~/project/data/privileges";

import i18n from "~/i18n";
/////////////////////////////////////////////////////////////////////////
const dataSource = "privileges";
/////////////////////////////////////////////////////////////////////////
const AddPrivilege = ({ master, resourceType, toggle }: any) => {
  const [form] = Form.useForm();
  /////////////////////////////////////////////////////////////////////////
  const columns = loadColumns(dataSource);
  /////////////////////////////////////////////////////////////////////////
  const { table, register } = useTable({
    name: dataSource,
    dataSource: privileges,
    keyField: "privilegeID",
    columns,
    allowFilter: false,
    allowSort: false,
    allowPagination: false,
    rowSelection: "multiple",
    customFilter: (ele: any) => ele.resourceType === resourceType,
  });
  /////////////////////////////////////////////////////////////////////////
  const handleFinish = () => {
    if (table.selectedRowKeys.length > 0) {
      let newData = [...master.data];
      table.selectedRowKeys.forEach((privilegeID) => {
        const index = newData.findIndex(
          (e: any) => e.privilegeID === privilegeID
        );
        if (index === -1) {
          const record = table.data.find(
            (e: any) => e.privilegeID === privilegeID
          );
          newData = [
            ...newData,
            { ...master.getNewRow(), ...record, ...form.getFieldsValue() },
          ];
        }
      });
      master.updateData(newData);
      toggle.close();
    }
  };
  /////////////////////////////////////////////////////////////////////////
  const setPremissionValue = (value: any) => {
    console.log(value);
  };

  /////////////////////////////////////////////////////////////////////////
  return (
    <Drawer
      toggle={toggle}
      width={500}
      extra={
        <Button type="primary" onClick={handleFinish}>
          {i18n.t("Confirm")}
        </Button>
      }
    >
      <Table {...register()} />
      <Form form={form} wrapperCol={{ span: 24 }}>
        <Form.Item name="permission" initialValue="Unset">
          <Radio.Group
            dataSource="privilegeStatus"
            onValueChange={(e: any) =>
              form.setFieldsValue({
                read: e.target.value,
                update: e.target.value,
                create: e.target.value,
                delete: e.target.value,
              })
            }
          />
        </Form.Item>
        <Form.Item name="read" initialValue="Unset">
          <Radio.Group
            dataSource="privilegeStatus"
            onValueChange={(value: any) => setPremissionValue(value)}
          />
        </Form.Item>
        <Form.Item name="update" initialValue="Unset">
          <Radio.Group
            dataSource="privilegeStatus"
            onValueChange={(value: any) => setPremissionValue(value)}
          />
        </Form.Item>
        <Form.Item name="create" initialValue="Unset">
          <Radio.Group
            dataSource="privilegeStatus"
            onValueChange={(value: any) => setPremissionValue(value)}
          />
        </Form.Item>
        <Form.Item name="delete" initialValue="Unset">
          <Radio.Group
            dataSource="privilegeStatus"
            onValueChange={(value: any) => setPremissionValue(value)}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
/////////////////////////////////////////////////////////////////////////
export default AddPrivilege;
