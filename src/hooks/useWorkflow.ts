import { useContext } from "react";

import { Form } from "~/library/components";

import { workflowContext } from "~/library/services";

import i18n from "~/i18n";

import { useAccess, useAuth, useAxiosPrivate, useMessage } from "../library/hooks";
//////////////////////////////////////////////////////////////////
const dataSource = "workflowRequest";
//////////////////////////////////////////////////////////////////
interface useWorkflowProps {
  form?: any;
}

export const useWorkflow = ({ form }: useWorkflowProps) => {
  const axios = useAxiosPrivate();

  const { hasAccess } = useAccess();

  const message = useMessage();

  const userID = useAuth()?.auth?.userID;

  const { workflowRequest, handleRequestApproval, loading, refreshPage } = <
    any
  >useContext(workflowContext);

  const isRequestAvailable = workflowRequest?.workflowRequestID !== undefined;

  const approvalStatus = Form.useWatch("approvalStatus", form);

  const activateChangeManagement = Form.useWatch(
    "activateChangeManagement",
    form
  );
  //////////////////////////////////////////////////////////////////
  const activeStep = workflowRequest?.workflowRequestSteps?.find(
    (e: any) => e.approvalStatus === "Under Review"
  );
  //////////////////////////////////////////////////////////////////
  // Workflow Methods
  const handleRequestChange = () =>
    message.inputBox("Enter request change comment", (comments: string) =>
      axios
        .post(`${dataSource}/RequestChange`, {
          form: workflowRequest,
          params: { userID, comments },
        })
        .then(() => refreshPage())
    );

  const handleRecall = () =>
    message.inputBox("Enter recall comment", (comments: string) =>
      axios
        .post(`${dataSource}/Recall`, {
          form: workflowRequest,
          params: { userID, comments },
        })
        .then(() => refreshPage())
    );

  const handleApprove = () =>
    message.confirm("Are you sure?", () =>
      axios
        .post(`${dataSource}/Approve`, {
          form: stepUser,
        })
        .then(() => refreshPage())
    );

  const handleReject = () =>
    message.inputBox("Enter reject comments", (comments: string) =>
      axios
        .post(`${dataSource}/RequestChange`, {
          form: { ...stepUser, comments },
        })
        .then(() => refreshPage())
    );
  //////////////////////////////////////////////////////////////////
  // Options
  const stepUser = activeStep?.workflowRequestStepsUsers?.find(
    (e: any) =>
      e.userID.toUpperCase() === userID.toUpperCase() && !e.approvalStatus
  );

  const allowApprove = workflowRequest?.workflow?.allowApprove && stepUser;

  const allowReject = workflowRequest?.workflow?.allowReject && stepUser;

  const allowDelegate = workflowRequest?.workflow?.allowDelegate && stepUser;

  const allowRecall =
    approvalStatus === "Under Review" && workflowRequest?.workflow?.allowRecall;

  const allowRequestChange =
    workflowRequest?.workflow?.allowRequestChange &&
    (stepUser ||
      approvalStatus === "Approved" ||
      approvalStatus === "Rejected");
  //////////////////////////////////////////////////////////////////
  const children = [
    {
      key: 1,
      label: i18n.t("Request Approval"),
      hidden: isRequestAvailable,
      onClick: handleRequestApproval,
    },
    {
      key: 2,
      label: i18n.t("Request Change"),
      hidden: !allowRequestChange,
      disabled: !hasAccess({
        name: "dailySalesList_requestChange",
        type: "read",
      }),
      onClick: handleRequestChange,
    },
    {
      key: 3,
      label: i18n.t("Approve"),
      hidden: !allowApprove,
      onClick: handleApprove,
    },
    {
      key: 4,
      label: i18n.t("Reject"),
      hidden: !allowReject,
      onClick: handleReject,
      danger: true,
    },
    {
      key: 5,
      label: i18n.t("Re Assign"),
      hidden: !allowDelegate,
      onClick: handleRequestApproval,
    },
    {
      type: allowRecall && stepUser && "divider",
      hidden: !stepUser || !allowRecall,
    },
    {
      key: 6,
      label: i18n.t("Recall"),
      hidden: !allowRecall,
      disabled: !hasAccess({ name: "dailySalesList_recall", type: "read" }),
      onClick: handleRecall,
      danger: true,
    },
  ];

  const workflowToolbar: any[] =
    activateChangeManagement && !form.hasChanges && !form.isNew
      ? [
          { separator: true },
          {
            text: i18n.t("Workflow"),
            children,
            disabled:
              children.filter((e: any) => !e.hidden && !e.disabled).length ===
              0,
          },
        ]
      : [];
  //////////////////////////////////////////////////////////////////
  return {
    workflowRequest,
    workflowToolbar,
    activeStep,
    loading,
  };
};
