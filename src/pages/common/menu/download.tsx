import { FloatButton, IDownload } from "~/library/components";

import { useEditingKey, useAxiosPrivate } from "~/library/hooks";

const DownloadLink = ({ name }: any) => {
  const axios = useAxiosPrivate();

  const { editingKey } = useEditingKey();

  const download = () => {
    if (editingKey)
      axios.download("Attachments/Download/" + editingKey, { name });
  };

  return <FloatButton type="primary" icon={<IDownload />} onClick={download} />;
};

export default DownloadLink;
