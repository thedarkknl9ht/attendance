import { Upload as _Upload } from "antd";

import { IUpload, Button } from "../../library/components";

export const Upload = ({ value, ...props }: any) => {
  const beforeUpload = () => {
    return  false;
  };

  return (
    <_Upload {...props} fileList={value} beforeUpload={beforeUpload} maxCount={1}>
      <Button icon={<IUpload />}>Click to upload</Button>
    </_Upload>
  );
};
