export interface user {
  userID: string;
  userName: string;
  userPassword: string;
  enabled: boolean;
  email?: string;
  language?: "Ar" | "En";
  workflowRoleID?: string;
  supervisorID?: string;
  entityID?: string;
}

export interface usersGroups {
  userGroupID: string;
  userGroupName: string;
  description?: string;
  usersGroupsDetails: usersGroupsDetails[];
}

export interface usersGroupsDetails {
  userGroupID: string;
  userID: string;
}
