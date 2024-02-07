import React from "react";

import { useQuery } from "@tanstack/react-query";

import {
  Drawer,
  FloatButton,
  IAttachments,
  IFile,
  IFiles,
  List,
  Authorization,
} from "~/library/components";

import { useEditingKey, useAxiosPrivate, useToggle } from "~/library/hooks";
import i18n from "~/i18n";

const AttachmentsLink = ({ name }: any) => {
  const axios = useAxiosPrivate();

  const toggle = useToggle();

  const { editingKey } = useEditingKey();

  const {
    data: { records, count },
    isFetching,
  } = useQuery({
    queryKey: [name, "Attachments", "Count", editingKey],
    queryFn: () => fetchData(),
    initialData: 0,
  });

  const fetchData = () => {
    if (editingKey)
      return axios
        .post("Attachments", {
          form: {
            filter: [
              { propertyName: "pageID", operation: 0, value: name },
              { propertyName: "recordID", operation: 0, value: editingKey },
            ],
          },
        })
        .then((response) => response.data);

    return 0;
  };

  return (
    !isFetching && (
      <React.Fragment>
        <FloatButton.Group type="primary" shape="square">
          {records.some((e: any) => e.attachmentType === "File") && (
            <FloatButton
              type="primary"
              icon={<IFiles />}
              onClick={toggle.show}
            />
          )}
          <Authorization.Item id="attachmentsList">
            <FloatButton
              type="primary"
              icon={<IAttachments />}
              badge={{ count, color: "red" }}
              onClick={() =>
                window.open(
                  "/system/attachmentsList?p=" + name + "&r=" + editingKey,
                  "_blank"
                )
              }
            />
          </Authorization.Item>
        </FloatButton.Group>
        <FileList data={records} toggle={toggle} />
      </React.Fragment>
    )
  );
};

const FileList = ({ data, toggle }: any) => {
  const axios = useAxiosPrivate();

  const getIcon = () => <IFile />;

  const getFileType = (originalFileType: string) => {
    if (originalFileType === "application/x-ms-application")
      return "ms-application";
    else if (originalFileType.includes("officedocument.spreadsheetml.sheet"))
      return "Excel";
    else if (originalFileType.includes("application/vnd.ms-excel"))
      return "Excel";
    else if (originalFileType.includes("wordprocessingml.document"))
      return "Word";
    else if (originalFileType === "text/plain") return "Text";
    else if (originalFileType === "application/pdf") return "PDF";
    else if (originalFileType === "application/x-compressed")
      return "Compressed";
    else if (originalFileType === "application/x-zip-compressed")
      return "Compressed";

    console.log(originalFileType);
    return "Unknown";
  };

  const getItems = () => {
    const items: any = [];
    data
      ?.filter((e: any) => e.attached)
      .forEach((ele: any) =>
        items.push({
          key: ele.attachmentID,
          label: ele.attachmentName,
          icon: getIcon(),
          description: getFileType(ele.fileType),
        })
      );
    return items;
  };

  const download = (id: string, name: string) =>
    axios.download("attachments/download/" + id, { name });

  return (
    <Drawer toggle={toggle}>
      <List
        items={getItems()}
        actions={(item: any) => [
          <a onClick={() => download(item.key, item.label)}>
            {i18n.t("Download")}
          </a>,
        ]}
      />
    </Drawer>
  );
};

export default AttachmentsLink;
