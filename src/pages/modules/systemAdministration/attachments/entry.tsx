import { useSearchParams } from "react-router-dom";

import { Content } from "~/components/content";

import {
  DatePicker,
  Form,
  Input,
  SelectFixed,
  Switch,
  Textarea,
  Upload,
} from "~/library/components";

import { useForm, useAuth } from "~/library/hooks";
/////////////////////////////////////////////////////////////////////////
import masterForm from "~/pages/common/menu/masterForm";
import DownloadLink from "~/pages/common/menu/download";
/////////////////////////////////////////////////////////////////////////
interface EntryProps {
  name: string;
  dataSource: string;
  keyField: string;
  breadcrumb?: any[];
}
/////////////////////////////////////////////////////////////////////////
const Entry = ({ name, dataSource, keyField, breadcrumb }: EntryProps) => {
  const userID = useAuth()?.auth?.userID;

  const [searchParams] = useSearchParams();

  const { form } = useForm({
    name,
    dataSource,
    keyField,
    dataType: "formData",
  });

  const attachmentType = Form.useWatch("attachmentType", form);
  /////////////////////////////////////////////////////////////////////////
  const onFileNameChange = (fileName: string) =>
    form.setFieldValue(
      "attachmentID",
      form.getFieldValue("pageID") +
        " " +
        form.getFieldValue("recordID") +
        " " +
        fileName
    );

  const onFileTypeChange = () =>
    form.setFieldsValue({
      file: "",
      fileAttach: "",
      fileName: "",
      fileType: "",
      originalFileName: "",
      attached: false,
    });

  const getFileValue = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }

    form.setFieldsValue({
      fileName: e.file.name.split(".")[0],
      fileType: e.file.type,
      originalFileName: e.file.name,
      attached: e?.fileList?.length > 0,
    });

    if (e?.fileList?.length === 0) return [];

    return [e?.fileList[0]];
  };
  /////////////////////////////////////////////////////////////////////////
  return (
    form.isActive && (
      <Content
        title={name}
        breadcrumb={breadcrumb}
        menu={masterForm(form)}
        onBack={form.handleCancel}
      >
        <Form
          form={form}
          initialValues={{
            createdBy: userID,
            pageID: searchParams.get("p"),
            recordID: searchParams.get("r"),
          }}
        >
          <Form.Section name="General Data">
            <Form.Group>
              <Form.Item name="attachmentName" required>
                <Input
                  autoFocus={true}
                  readOnly={form.isEdit}
                  onValueChange={(e: any) => onFileNameChange(e.target.value)}
                />
              </Form.Item>
              <Form.Item name="description">
                <Textarea />
              </Form.Item>
            </Form.Group>
            <Form.Group>
              <Form.Item name="attachmentType" initialValue="File" required>
                <SelectFixed
                  disabled={form.isEdit}
                  dataSource="attachmentType"
                  onChange={onFileTypeChange}
                />
              </Form.Item>
              <Form.Item name="attached" initialValue={false}>
                <Switch disabled />
              </Form.Item>
            </Form.Group>
          </Form.Section>
          <Form.Section name="Details">
            <Form.Group>
              <Form.Item name="notes">
                <Textarea />
              </Form.Item>
            </Form.Group>
            <Form.Group>
              <Form.Item name="createdBy">
                <Input readOnly />
              </Form.Item>
              <Form.Item name="createdOn">
                <DatePicker disabled />
              </Form.Item>
            </Form.Group>
          </Form.Section>
          {attachmentType === "File" && (
            <Form.Section name="File Data">
              <Form.Group>
                <Form.Item name="fileAttach" getValueFromEvent={getFileValue}>
                  <Upload />
                </Form.Item>
                <Form.Item name="fileName">
                  <Input readOnly />
                </Form.Item>
              </Form.Group>
              <Form.Group>
                <Form.Item name="fileType">
                  <Input readOnly />
                </Form.Item>
                <Form.Item name="originalFileName">
                  <Input readOnly />
                </Form.Item>
              </Form.Group>
              {form.isEdit && (
                <DownloadLink name={form.getFieldValue("attachmentName")} />
              )}
            </Form.Section>
          )}
        </Form>
      </Content>
    )
  );
};
/////////////////////////////////////////////////////////////////////////
export default Entry;
