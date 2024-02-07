import { createContext } from "react";

import { useQuery } from "@tanstack/react-query";

import { useAuth, useAxiosPrivate, useEditingKey, useToggle } from "~/library/hooks";

import { isEmpty, loadColumns } from "~/library/utils";

import { Selection } from "~/library/components";
////________________________________________________________________
const workflowContext = createContext({});
////________________________________________________________________
interface workflowProps {
  origin: string;
  keyField: string;
  children: React.ReactNode;
}

const WorkflowProvider = ({ origin, keyField, children }: workflowProps) => {
  const axios = useAxiosPrivate();

  const workflowSelectionToggle = useToggle();

  const userID = useAuth()?.auth?.userID;
  const entity = useAuth()?.entity;

  const workflowColumns = loadColumns("workflowSelection");

  const { editingKey } = useEditingKey();

  const reference = editingKey;

  const {
    data: workflowRequest,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["Workflow", editingKey],
    queryFn: () => fetchData(),
  });

  const fetchData = async () => {
    if (editingKey?.length > 0)
      return await axios
        .fetch("workflowRequest/activeRequest", {
          params: {
            origin,
            keyField,
            reference,
          },
        })
        .then((response) => (isEmpty(response) ? {} : response))
        .catch(() => {});

    return {};
  };
  ////________________________________________________________________
  const handleRequestApproval = () => {
    const filter = [
      { propertyName: "workflowType", operation: 0, value: origin },
    ];

    axios.post("workflow", { form: { filter } }).then((response) => {
      const data = response.data.records.filter(
        (e: any) => e.entityID === entity?.entityID || !e?.entityID
      );

      const defaultWorkflow = data.find((e: any) => e.isDefault);
      if (!defaultWorkflow) workflowSelectionToggle.show();
      else requestApproval(defaultWorkflow);
    });
  };

  const requestApproval = async (record: any) => {
    console.log(
      JSON.stringify({
        ...record,
        origin,
        keyField,
        reference,
        requestID: "",
        requestedBy: userID,
      })
    );

    await axios
      .post("workflowRequest/create", {
        form: {
          ...record,
          origin,
          keyField,
          reference,
          requestID: "",
          requestedBy: userID,
        },
      })
      .then((response) => {
        if (response.status) refetch();
        refreshPage();
        return response;
      });
  };
  const refreshPage = () =>
    (window.location.href = window.location.href + "?k=" + editingKey);
  ////________________________________________________________________
  return (
    <workflowContext.Provider
      value={{
        workflowRequest,
        workflowSelectionToggle,
        origin,
        keyField,
        reference,
        loading: isFetching,
        handleRequestApproval,
        requestApproval,
        refreshPage,
      }}
    >
      <Selection
        toggle={workflowSelectionToggle}
        dataSource="workflow"
        keyField="workflowID"
        columns={workflowColumns}
        onConfirm={requestApproval}
      />
      {children}
    </workflowContext.Provider>
  );
};
////________________________________________________________________
export { WorkflowProvider, workflowContext };
