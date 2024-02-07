type _timeLimitType = "None" | "Hours" | "Days" | "Weeks" | "Months";
type _timeLimitExpireAction = "Approve" | "Reject";

export interface workflow {
  workflowID: string;
  workflowName: string;
  workflowCategory: string;
  workflowType: string;
  enityID: string;
  useFinalApprover: boolean;
  userID?: string;
  notifyWhenApproved: boolean;
  notifyWhenRejected: boolean;
  notifyWhenEscalated: boolean;
  notifyWhenRequestChange: boolean;
  allowApprove: boolean;
  allowReject: boolean;
  allowDelegate: boolean;
  allowRecal: boolean;
  allowRequestChange: boolean;
  timeLimitType: _timeLimitType;
  timeLimitAmount: number;
  timeLimitExpireAction: _timeLimitExpireAction;
  isDefault: boolean;
  description?: string;
  workflowSteps: workflowSteps[];
}

export interface workflowRoles {
  workflowRoleID: string;
  workflowRoleName: string;
  description?: string;
}

export interface workflowSteps {
  workflowID: string;
  stepID: string;
  stepIndex: number;
  workItemSubject?: string;
  workItemInstructions?: string;
  assignmentType: "Supervisor" | "User" | "User Group" | "User Role";
  useGroupID?: string;
  workflowRoleID?: string;
  timeLimitType: _timeLimitType;
  timeLimitAmount: number;
  timeLimitExpireAction: _timeLimitExpireAction;
  completionPolicy: "Single Approver" | "Majority Approvers" | "All Approvers";
  stepRequire: "Always Run" | "Condition Based";
  description?: string;
}

export interface workflowStepsUsers {
  workflowID: string;
  stepID: string;
  userID: string;
  description: string;
}
