import { createContext, ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import { useAuth } from "~/library/hooks";
////________________________________________________________________
const accessContext = createContext({});
////________________________________________________________________
const AccessProvider = ({ children }: { children: ReactNode }) => {
  const { auth, entity } = useAuth() || {};
  ////________________________________________________________________
  const { data: privileges } = useQuery({
    queryKey: ["USER_ACCESS", auth],
    queryFn: () => getPrivileges(),
  });

  const getPrivileges = async () => {
      const privileges: any[] = [];

      const securityRoles = auth?.usersSecurityRoles.filter(
        (e: any) =>
          e.allEntities ||
          e.usersSecurityRolesEntities.find(
            (e: any) => entity.entityID === e.entityID
          )
      );

      securityRoles.forEach((element: any) => {
        element.securityRole.securityRolesPrivileges.forEach((item: any) =>
          privileges.push(item)
        );

        element.securityRole.securityRolesTasks
          .filter(
            (task: any) => task.userID === null || task.userID === auth.userID
          )
          .forEach((roleTask: any) =>
            roleTask.securityTask.securityTasksPrivileges.forEach((item: any) =>
              privileges.push(item)
            )
          );
      });
      return privileges;
  };
  ////________________________________________________________________
  return (
    <accessContext.Provider value={{ admin: auth.admin, privileges }}>
      {children}
    </accessContext.Provider>
  );
};
////________________________________________________________________
export { AccessProvider, accessContext };
