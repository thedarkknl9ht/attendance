import { Routes, Route, useNavigate } from "react-router-dom";

import i18n from "~/i18n";

import { Authorization, IHome } from "~/library/components";

import SecurityTasks from "./securityTasks";
import SecurityRoles from "./securityRoles";
import Users from "./users";
import SecurityRolesAssignment from "./securityRolesAssignment";
import WorkflowRoles from "./workflowRoles";
import UsersGroups from "./usersGroups";
import Attachments from "./attachments";

const SystemAdministration = () => {
  const navigate = useNavigate();

  const breadcrumb = (name: string) => [
    { title: <IHome />, href: null, onClick: () => navigate("/") },
    {
      title: i18n.t("SystemAdministration"),
    },
    { title: i18n.t(name) },
  ];

  return (
    <Routes>
      <Route
        path="/securityTasksList"
        element={
          <Authorization name="securityTasksList">
            <SecurityTasks breadcrumb={breadcrumb("Security")} />
          </Authorization>
        }
      />
      <Route
        path="/securityRolesList"
        element={
          <Authorization name="securityRolesList">
            <SecurityRoles breadcrumb={breadcrumb("Security")} />
          </Authorization>
        }
      />
      <Route
        path="/usersList"
        element={
          <Authorization name="usersList">
            <Users breadcrumb={breadcrumb("Security")} />
          </Authorization>
        }
      />
      <Route
        path="/SecurityRolesAssignmentList"
        element={
          <Authorization name="SecurityRolesAssignmentList">
            <SecurityRolesAssignment breadcrumb={breadcrumb("Security")} />
          </Authorization>
        }
      />
      <Route
        path="/workflowRolesList"
        element={
          <Authorization name="workflowRolesList">
            <WorkflowRoles breadcrumb={breadcrumb("Security")} />
          </Authorization>
        }
      />
      <Route
        path="/usersGroupsList"
        element={
          <Authorization name="usersGroupsList">
            <UsersGroups breadcrumb={breadcrumb("Security")} />
          </Authorization>
        }
      />
      <Route
        path="/attachmentsList"
        element={
          <Authorization name="attachmentsList">
            <Attachments breadcrumb={breadcrumb("Cards")} />
          </Authorization>
        }
      />
    </Routes>
  );
};

export default SystemAdministration;
